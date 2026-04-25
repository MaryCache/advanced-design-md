# トラブルシューティング

fetch.js実行時のエラー・取得失敗パターンと対処手順。

---

## ERROR: blocked (403/429)

**原因:** サイトのbot検知にブロックされた。

**対処:** fetch.jsにUser-Agent設定が入っているか確認する。

```bash
grep -n "userAgent" scripts/fetch.js
```

設定がない場合はfetch.jsの`browser.newContext()`に以下を追加:

```js
userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
```

それでもブロックされる場合はそのサイトはスコープ外。

---

## HTTP 200 だが本文が極端に短い / 「Just a moment...」と表示される

**原因:** Cloudflare Turnstile / hCaptcha 等のチャレンジページを 200 で返されている可能性。`firstResponse.status()` のチェックは通過するが、本体ページにたどり着いていない。

**確認:**

```bash
wc -c output/raw/dom.html
grep -i "just a moment\|cloudflare\|cf-mitigated\|turnstile" output/raw/dom.html | head
```

`dom.html` が極端に小さい（10KB 未満）かつチャレンジ系の文字列がヒットする場合、抽出はスコープ外として中断する。`BROWSER=firefox` で回避可能なケースもある。

---

## ERROR: timeout

**原因:** networkidleに到達しない（アナリティクス等の常時通信）か、接続が遅い。

**対処:** fetch.jsは自動的にloadイベントにフォールバックする。
それでもタイムアウトする場合はネットワーク環境を確認する。

---

## JSファイルが取れない / scripts/が空またはGTMのみ

**原因:** 本体JSのURLがシグネチャ判定をパスしなかった。

**手順1:** DOMから本体JSのURLを確認する。

```bash
grep -o 'src="[^"]*\.js[^"]*"' output/raw/dom.html
```

**手順2:** fetch.jsの補完取得ログを確認する。

```bash
node scripts/fetch.js <URL> 2>&1 | grep "supplemental"
```

`+ supplemental JS: ...`が出ていれば補完取得済み。

**手順3:** それでも取れない場合は手動で取得する。

```bash
curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36" \
  <JS_URL> -o output/raw/scripts/<filename>.js
```

---

## CSSが取れない / styles/が空

**原因:** CSSがネットワークインターセプト前に読み込まれた、またはインラインのみ。

**確認:**

```bash
cat output/raw/styles-manifest.json
```

manifestが空の場合はdom.htmlにインラインスタイルが含まれている可能性がある:

```bash
grep -c "<style" output/raw/dom.html
```

---

## behavior-log.jsonのmissingReasonsが空

**意味:** 初期DOM上で観測できる「未取得の気配」がなかった。
スクロールやhoverで発火するアニメーションは取り逃がしている可能性がある。

**対処:** CSSの`:hover`ルールとscripts/内の`scroll`関連処理を手動で確認する。

```bash
grep -i ":hover" output/raw/styles/*.css | head -20
grep -i "scroll\|IntersectionObserver" output/raw/scripts/*.js | head -20
```

---

## 既知のパターン（実走で判明）

| サイト種別 | 特徴 | 対処 |
|-----------|------|------|
| jQueryサイト | `fadeIn`/`fadeOut`/`animate`中心、GSAPなし | jQueryシグネチャで補完取得される |
| SPAサイト | 初期DOMが空、JS実行後にコンテンツ描画 | networkidle待機で対応 |
| GTM重サイト | scripts/がGTMファイルで埋まる | 除外リストで自動スキップ |
| 403サイト | User-Agent未設定で弾かれる | newContext設定で対応済み |
| TLSブロックサイト | Chromiumが`net::ERR_ABORTED`、curlは通る | `BROWSER=firefox node scripts/fetch.js` で回避。事前に `npx playwright install firefox` で Firefox バイナリを入れる |
