# アニメーションライブラリ パターン集

Claudeがminify済みJSからライブラリを特定・解釈するための参照ファイル。

---

## ライブラリ特定シグネチャ

| ライブラリ | minify後の特徴的な文字列 | 補足 |
|-----------|------------------------|------|
| GSAP | `gsap.to` `gsap.from` `gsap.timeline` `gsap.registerPlugin` | 最も普及。ScrollTriggerと併用が多い |
| ScrollTrigger | `ScrollTrigger.create` `ScrollTrigger.batch` `scrollTrigger:` | GSAPプラグイン。スクロール連動演出 |
| Lottie | `lottie.loadAnimation` `animationData` `lottie.play` | JSONアニメーション再生 |
| Anime.js | `anime({` `targets:` `anime.timeline` | 軽量JSアニメーション |
| Three.js | `THREE.Scene` `WebGLRenderer` `THREE.PerspectiveCamera` | 3D表現 |
| AOS | `AOS.init` `data-aos=` `aos-animate` | スクロール連動クラストグル |
| Swiper | `new Swiper` `SwiperSlide` `Swiper.init` | スライダー |
| Framer Motion | `motion.div` `useAnimation` `AnimatePresence` | React専用 |
| GSAP SplitText | `SplitText` `chars` `words` `lines` | テキスト分割アニメーション |
| Pixi.js | `PIXI.Application` `PIXI.Sprite` | 2DレンダリングエンジN |
| jQuery | `$.fn.` `$.easing` `fadeIn` `fadeOut` `animate({` | レガシーサイトで多用 |

---

## 呼び出しパターン詳細

### GSAP

```js
// 基本
gsap.to(".el", { duration: 1, y: 0, opacity: 1 })
gsap.from(".el", { duration: 0.8, y: 40, opacity: 0 })
gsap.fromTo(".el", { y: 40 }, { y: 0, duration: 0.6 })

// タイムライン（分割記述パターン）
const tl = gsap.timeline()
tl.to(".hero", { opacity: 1, duration: 1 })
tl.to(".text", { y: 0, duration: 0.8 }, "-=0.4")

// プラグイン登録
gsap.registerPlugin(ScrollTrigger, SplitText)
```

**DESIGN.mdへの書き方:**
```
### Keyframes
- hero-entrance: opacity 0→1, y 40→0, duration 0.8s, ease power2.out

### Scroll Behaviors
- ScrollTrigger: trigger ".section", start "top 80%", animation fade-up
```

---

### ScrollTrigger

```js
// 基本
gsap.to(".el", {
  scrollTrigger: { trigger: ".el", start: "top 80%" },
  opacity: 1, y: 0
})

// バッチ処理
ScrollTrigger.batch(".card", {
  onEnter: batch => gsap.to(batch, { opacity: 1, stagger: 0.1 })
})
```

**DESIGN.mdへの書き方:**
```
### Scroll Behaviors
- `.card`: ScrollTrigger batch, enter時にopacity 0→1, stagger 0.1s
- `.section`: trigger top 80%, fade-up演出
```

---

### Lottie

```js
lottie.loadAnimation({
  container: document.getElementById('animation'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: require('./animation.json')
})
```

**DESIGN.mdへの書き方:**
```
### Libraries
- Lottie（SVGアニメーション、JSONデータ駆動）

### Keyframes
- [動的: Lottie JSON制御] — 外部JSONファイルで定義
```

---

### Anime.js

```js
anime({
  targets: ".el",
  translateY: [-40, 0],
  opacity: [0, 1],
  duration: 800,
  easing: "easeOutExpo",
  delay: anime.stagger(100)
})
```

**DESIGN.mdへの書き方:**
```
### Keyframes
- slide-up: translateY -40→0, opacity 0→1, duration 800ms, easeOutExpo, stagger 100ms
```

---

### AOS（Animate On Scroll）

```js
AOS.init({ duration: 800, once: true, offset: 100 })
```

HTML側:
```html
<div data-aos="fade-up" data-aos-delay="200">...</div>
```

**DESIGN.mdへの書き方:**
```
### Libraries
- AOS（スクロールトリガー型クラストグル）

### Scroll Behaviors
- `[data-aos]`要素: スクロール時にAOSクラス付与, duration 800ms, offset 100px
```

---

### CSSアニメーション（ライブラリなし）

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
.el { animation: fadeUp 0.6s ease-out forwards; }
```

**DESIGN.mdへの書き方:**
```
### Libraries
- なし（Pure CSS）

### Keyframes
- `fadeUp`: opacity 0→1, translateY 40px→0, duration 0.6s, ease-out, fill forwards
```

---

## minify済みコードの読み方ヒント

- `a.to(` → `gsap.to(` の可能性（変数名が短縮されている）
- `t.timeline()` → `gsap.timeline()`
- `n.loadAnimation(` → `lottie.loadAnimation(`
- `i({targets:` → `anime({targets:`
- `new e(` → `new Swiper(` 等（クラス名が短縮）

**判定が難しい場合:** 周辺のコードとbehavior-log.jsonの`gsapPlugins`・`observers`を合わせて判断する。

---

### jQuery（実走で判明・レガシーサイト対応）

```js
// フェード
$("#modal").fadeIn();
$("#modal").fadeOut(1000);

// スクロール連動
$(window).scroll(function() {
  var scrollTop = $(this).scrollTop();
  if (scrollTop > 100) { $(".el").addClass("active"); }
});

// カスタムアニメーション
$(".el").animate({ opacity: 1, top: 0 }, 600, "easeOutExpo");

// スクロール位置保存・復元
pointY = $(window).scrollTop();
$("html, body").scrollTop(pointY);
```

**DESIGN.mdへの書き方:**
```
### Libraries
- jQuery 1.x（レガシー）
- jquery.easing（カスタムイージング）

### Transitions
- Modal: fadeIn/fadeOut, duration 1000ms
- Hover: all 0.3s ease

### Scroll Behaviors
- スクロール位置保存→モーダル開閉→位置復元パターン
- scrollTop監視でクラストグル（.active付与）

### Hover / Interaction
- キャラクターモーダル: クリックでfadeIn、閉じるボタンでfadeOut
- prev/nextでキャラ切り替え: fadeOut→fadeIn
```
