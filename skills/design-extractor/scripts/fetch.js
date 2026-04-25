const { chromium, firefox } = require('playwright');
const BROWSER_TYPE = process.env.BROWSER || 'chromium';
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
if (!url) {
  process.stderr.write('ERROR: URL argument required\nUsage: node scripts/fetch.js <URL> [output-dir]\n');
  process.exit(1);
}
const customOutDir = process.argv[3];

// JSシグネチャ判定リスト
const JS_SIGNATURES = [
  // API呼び出し系
  'gsap.to', 'gsap.from',
  'lottie.loadAnimation', 'animationData',
  'anime({', 'targets:',
  'THREE.Scene', 'WebGLRenderer',
  'AOS.init', 'data-aos',
  'new Swiper',
  'IntersectionObserver', 'requestAnimationFrame',
  // 初期化・設定系
  'gsap.timeline', 'gsap.registerPlugin',
  'ScrollTrigger.create', 'ScrollTrigger.batch',
  'gsap.context', 'gsap.matchMedia',
  // jQuery系（実走で判明）
  '$.fn.', '$.ajax', '$.easing',
  'fadeIn', 'fadeOut', 'slideDown', 'slideUp',
  'scrollTop', 'animate({',
];

// JS除外URLパターン（analytics/tracking系 + 動画プレイヤー系）
const JS_EXCLUDE_PATTERNS = [
  // Analytics / Tracking
  'googletagmanager.com',
  'google-analytics.com',
  'analytics.google.com',
  'doubleclick.net',
  'facebook.net',
  'connect.facebook',
  'twitter.com/widgets',
  // A/B Testing
  'optimizely.com',
  'vwo.com',
  // Chat / Support
  'intercom.io',
  'zendesk.com',
  'hubspot.com',
  'hotjar.com',
  // Video players（CSS/JSともに不要）
  'vimeocdn.com',
  'ytimg.com',
  'youtube.com/s/',
  'dailymotion.com',
  'jwpcdn.com',
];

// CSS除外URLパターン（サードパーティUIに無関係なもの）
const CSS_EXCLUDE_PATTERNS = [
  // 動画プレイヤー
  'vimeocdn.com',
  'ytimg.com',
  'youtube.com',
  'dailymotion.com',
  'jwpcdn.com',
  // フォントCDN（@font-face宣言のみ。デザイン情報なし）
  'fonts.googleapis.com',
  'fonts.gstatic.com',
  // チャット / サポート
  'intercom.io',
  'zendesk.com',
  'hubspot.com',
  'hotjar.com',
  // A/B Testing
  'optimizely.com',
  'vwo.com',
];

// URLをファイル名に変換
function urlToFilename(url) {
  return url.replace(/https?:\/\//, 'https___').replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 100);
}

// テキストを先頭100KB + 末尾100KB + ヒット周辺に切り詰める
function truncate(text, url) {
  const MAX = 200 * 1024;
  if (Buffer.byteLength(text) <= MAX) return text;

  const HEAD = 100 * 1024;
  const TAIL = 100 * 1024;
  const AROUND = 5 * 1024;

  const head = text.slice(0, HEAD);
  const tail = text.slice(-TAIL);
  const skipped = Buffer.byteLength(text) - HEAD - TAIL;

  // シグネチャヒット周辺の抜粋
  const hitChunks = [];
  for (const sig of JS_SIGNATURES) {
    const idx = text.indexOf(sig);
    if (idx !== -1 && idx > HEAD && idx < text.length - TAIL) {
      const start = Math.max(HEAD, idx - AROUND);
      const end = Math.min(text.length - TAIL, idx + AROUND);
      hitChunks.push(text.slice(start, end));
    }
  }

  const hitSection = hitChunks.length > 0
    ? `\n// [signature hit excerpts]\n${hitChunks.join('\n// ---\n')}\n`
    : '';

  return `${head}\n// [truncated: ${skipped}bytes]\n${hitSection}${tail}`;
}

async function main() {
  const outDir = customOutDir ? path.resolve(customOutDir) : path.resolve('output/raw');
  const stylesDir = path.join(outDir, 'styles');
  const scriptsDir = path.join(outDir, 'scripts');

  fs.mkdirSync(stylesDir, { recursive: true });
  fs.mkdirSync(scriptsDir, { recursive: true });

  const browserEngine = BROWSER_TYPE === 'firefox' ? firefox : chromium;
  const browser = await browserEngine.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    extraHTTPHeaders: {
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    },
    locale: 'ja-JP',
  });
  const page = await context.newPage();

  const cssFiles = [];   // { order, source, content, hasMediaQuery }
  const jsFiles = [];    // { url, content }
  let cssOrder = 1;

  // HTTPステータスチェック用（bot検知）
  let firstResponse = null;
  page.on('response', response => {
    if (response.url() === url && !firstResponse) firstResponse = response;
  });

  // ネットワークインターセプト
  page.on('response', async (response) => {
    try {
      const resUrl = response.url();
      const contentType = response.headers()['content-type'] || '';
      const status = response.status();

      // CSS取得（サードパーティCDN除外）
      const isCssExcluded = CSS_EXCLUDE_PATTERNS.some(p => resUrl.includes(p));
      if (!isCssExcluded && contentType.includes('text/css') && status === 200) {
        const text = await response.text().catch(() => '');
        if (text) {
          cssFiles.push({
            order: cssOrder++,
            source: resUrl,
            content: text,
            hasMediaQuery: /@media\s/.test(text),
          });
        }
      }

      // JS取得（シグネチャ判定・GTM系除外）
      const isExcluded = JS_EXCLUDE_PATTERNS.some(p => resUrl.includes(p));
      if (!isExcluded && (contentType.includes('javascript') || resUrl.endsWith('.js')) && status === 200) {
        const text = await response.text().catch(() => '');
        const hasSignature = JS_SIGNATURES.some(sig => text.includes(sig));
        if (hasSignature) {
          jsFiles.push({ url: resUrl, content: text });
        }
      }
    } catch (_) {}
  });

  // ページ読み込み（networkidle → load フォールバック）
  let loadError = null;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
  } catch (e) {
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    } catch (e2) {
      loadError = e2;
    }
  }

  if (loadError) {
    const msg = loadError.message || '';
    if (msg.includes('net::ERR')) {
      process.stderr.write(`ERROR: connection failed - ${url}\n`);
    } else {
      process.stderr.write(`ERROR: timeout - could not load ${url}\n`);
    }
    await browser.close();
    process.exit(1);
  }

  // ステータスチェック（bot検知）
  if (firstResponse && (firstResponse.status() === 403 || firstResponse.status() === 429)) {
    process.stderr.write(`ERROR: blocked (${firstResponse.status()}) - ${url}\n`);
    await browser.close();
    process.exit(1);
  }

  // HTML取得
  const html = await page.content();
  fs.writeFileSync(path.join(outDir, 'dom.html'), html);

  // インラインCSS取得（<style>タグ）
  const inlineStyles = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('style'))
      .map(s => s.textContent)
      .join('\n');
  });
  if (inlineStyles.trim()) {
    cssFiles.unshift({
      order: 0,
      source: 'inline',
      content: inlineStyles,
      hasMediaQuery: /@media\s/.test(inlineStyles),
    });
    // orderを振り直す
    cssFiles.forEach((f, i) => f.order = i + 1);
  }

  // CSS保存
  const manifest = [];
  for (const f of cssFiles) {
    const filename = f.source === 'inline'
      ? `${String(f.order).padStart(3, '0')}-inline.css`
      : `${String(f.order).padStart(3, '0')}-${urlToFilename(f.source)}.css`;
    fs.writeFileSync(path.join(stylesDir, filename), f.content);
    manifest.push({
      order: f.order,
      source: f.source,
      file: `styles/${filename}`,
      hasMediaQuery: f.hasMediaQuery,
    });
  }
  fs.writeFileSync(path.join(outDir, 'styles-manifest.json'), JSON.stringify(manifest, null, 2));

  // JS保存
  for (const f of jsFiles) {
    const filename = urlToFilename(f.url) + '.js';
    const content = truncate(f.content, f.url);
    fs.writeFileSync(path.join(scriptsDir, filename), content);
  }

  // DOMから<script src>を読んでシグネチャにヒットしなかった本体JSを補完取得
  const scriptSrcs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('script[src]'))
      .map(s => s.src)
      .filter(src => src && !src.includes('googletagmanager') && !src.includes('google-analytics'));
  });

  const alreadyFetched = new Set(jsFiles.map(f => f.url));
  const baseUrl = new URL(url);

  for (const src of scriptSrcs) {
    try {
      const absoluteSrc = src.startsWith('http') ? src : new URL(src, baseUrl).href;
      if (alreadyFetched.has(absoluteSrc)) continue;
      // http(s) スキーム以外（javascript: / data: / blob: 等）は補完取得しない
      if (!/^https?:\/\//.test(absoluteSrc)) continue;
      const isExcluded = JS_EXCLUDE_PATTERNS.some(p => absoluteSrc.includes(p));
      if (isExcluded) continue;

      const res = await page.evaluate(async (u) => {
        const r = await fetch(u);
        return r.ok ? await r.text() : null;
      }, absoluteSrc);

      if (res) {
        const hasSignature = JS_SIGNATURES.some(sig => res.includes(sig));
        if (hasSignature) {
          const filename = urlToFilename(absoluteSrc) + '.js';
          fs.writeFileSync(path.join(scriptsDir, filename), truncate(res, absoluteSrc));
          console.log(`  + supplemental JS: ${absoluteSrc}`);
        }
      }
    } catch (_) {}
  }

  // behavior-log収集
  const behaviorLog = await page.evaluate((signatures) => {
    const log = {
      version: 1,
      eventListeners: [],
      observers: [],
      classSamples: [],
      gsapPlugins: [],
      missingReasons: [],
    };

    // class一覧（上位50件）
    const classes = new Set();
    document.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(c => classes.add('.' + c));
    });
    log.classSamples = Array.from(classes).slice(0, 50);

    // IntersectionObserver痕跡
    if (typeof IntersectionObserver !== 'undefined') {
      log.observers.push({ type: 'IntersectionObserver', targetHint: '[unknown - runtime]' });
    }

    // gsapPlugins（window.gsapがあれば）
    if (window.gsap && window.gsap.plugins) {
      log.gsapPlugins = Object.keys(window.gsap.plugins);
    }

    // missingReasons の推定
    const reasons = [];
    if (document.querySelectorAll('[data-scroll], [data-aos]').length > 0) {
      reasons.push('requires_scroll');
    }
    if (document.querySelectorAll('[data-hover], .hover-trigger').length > 0) {
      reasons.push('requires_hover');
    }
    if (document.querySelectorAll('[loading="lazy"], [data-src]').length > 0) {
      reasons.push('lazy_loaded');
    }
    log.missingReasons = reasons;

    return log;
  }, JS_SIGNATURES).catch(() => ({ version: 1, error: 'evaluate failed' }));

  // eventListeners（JSファイルから静的解析）
  for (const f of jsFiles) {
    const matches = f.content.matchAll(/addEventListener\(['"](\w+)['"]/g);
    for (const m of matches) {
      behaviorLog.eventListeners.push({ type: m[1], targetHint: '[static analysis]' });
    }
  }
  // 重複排除
  behaviorLog.eventListeners = [...new Map(
    behaviorLog.eventListeners.map(e => [e.type, e])
  ).values()];

  fs.writeFileSync(path.join(outDir, 'behavior-log.json'), JSON.stringify(behaviorLog, null, 2));

  await browser.close();
  console.log(`Done. Files saved to output/raw/`);
}

main().catch(e => {
  process.stderr.write(`ERROR: unexpected - ${e.message}\n`);
  process.exit(1);
});
