# DESIGN — sample-corporate-cosmetics-dark

## Intent

- **Generated**: 2026-04-25
- **Source**: design-creator (quiz-driven)
- **Volume**: standard
- **Use**: 架空コスメブランドのコーポレートトップ
- **Mood**: dark, romantic, elegant, night
- **第一印象軸**: 夜空に浮かぶ神秘的な美しさ — 補完方針: user-input
- **ターゲット**: 20代後半〜30代女性・高価格帯志向
- **差別化軸**: 競合に多い「透明感・清潔」ではなく「深み・物語性」

---

## Colors

### メインパレット: night-sky-gradient

- **Background**: #09172c
  - role: 全体背景
  - reason: 第一印象軸「夜空の神秘性」を満たす深い紺。mood=dark/night に適合
- **Primary**: #293355
  - role: セクション境界・カード背景
  - reason: bg と同系統で奥行きの中間層を担う
- **Accent**: #af6681
  - role: CTA・ハイライト
  - reason: 単色 dark に温度を加える女性的アクセント。target=20代女性を補強
- **Sub Accent**: #c4a28b
  - role: gold 系装飾・引用線
  - reason: luxury 感を底上げし、差別化軸「深み」を支える

<!-- alternative: lavender-black - mood=dreamy 寄せたい場合 -->

---

## Typography

| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | Cinzel | Google Fonts | 700 | mood=dark/luxury に適合する serif 主役型代表。コスメ高級感に親和 |
| heading-ja | Noto Serif JP | Google Fonts | 700 | heading-en の serif 系統に揃え、見出し強度を担保 |
| body-ja | 游明朝 | システム | 400 | 明朝主役・本文可読性。第一印象軸「神秘性」を本文側でも維持 |
| mono | — | — | — | 用途外（data-table 系パーツなし） |

### 共通値

- **Base Size**: 16px
- **Scale**: h1=48px, h2=32px, h3=24px, body=16px, small=12px
- **Line Height**: 1.7
- **Tracking**: heading 0.15em / body 標準

---

## Spacing

- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Container Max Width**: 1200px
- **Grid**: 12 columns, gap=24px

---

## Components

### nav-header

- **ja**: ナビゲーションヘッダー
- **Background**: rgba(9, 23, 44, 0.85) (bg + alpha)
- **Accent**: #af6681
- **States**:
  - **idle**:
    - animation: —
    - reason: 静止時は透過 sticky で背景に溶け込む
  - **scrolled**:
    - animation: nav-blur-in
    - trigger: scrollY > 80px
    - reason: スクロール時に backdrop-filter で固定化、視認性を担保

### nav-link

- **ja**: ナビゲーションリンク
- **Background**: transparent
- **Accent**: #af6681
- **States**:
  - **idle**:
    - animation: —
    - reason: 装飾なし、テキストのみ
  - **hover**:
    - animation: opacity-dim
    - reason: mood=luxury に適合する控えめ反応

### sp-menu

- **ja**: スマホメニュー
- **Background**: #09172c
- **Accent**: #af6681
- **States**:
  - **closed → open**:
    - animation: drawer-slide
    - trigger: ハンバーガータップ
    - reason: 標準パターン、mood に左右されない

### kv-hero

- **ja**: メインビジュアル
- **Background**: #09172c
- **Accent**: #af6681
- **States**:
  - **enter**:
    - animation: blur-reveal
    - trigger: ロード完了
    - reason: 第一印象軸「夜空の神秘性」を体現する霧晴れ演出
  - **idle**:
    - animation: ken-burns-slow
    - reason: 静止画奥行き維持。mood=luxury に適合
  - **scroll**:
    - animation: scroll-fade
    - trigger: scrollY > 80vh
    - reason: 次セクションへの自然な引き継ぎ

### hero-title

- **ja**: ヒーロータイトル
- **Background**: transparent
- **Accent**: #c4a28b
- **States**:
  - **enter**:
    - animation: rise-in
    - trigger: ロード完了 + delay 0.4s
    - reason: blur-reveal の後に文字が浮上、二段階の「現れ」を演出

### section-heading

- **ja**: セクション見出し
- **Background**: —
- **Accent**: #c4a28b
- **States**:
  - **enter**:
    - animation: fade-blur-in
    - trigger: scroll-reveal (threshold 0.2)
    - reason: hero-enter と同系統の演出を section にも適用、世界観統一

### card-item

- **ja**: 製品カード
- **Background**: #293355
- **Accent**: #af6681
- **States**:
  - **enter**:
    - animation: scroll-fade-up
    - trigger: scroll-reveal
    - reason: mood=elegant の控えめ入場
  - **hover**:
    - animation: opacity-dim
    - reason: nav-link と同方針、ダークテーマ向け

### cta-button

- **ja**: CTA ボタン
- **Background**: #af6681
- **Accent**: #09172c (text)
- **States**:
  - **idle**:
    - animation: —
    - reason: 静止時は accent 色で目立たせる
  - **hover**:
    - animation: opacity-dim
    - reason: mood=luxury のため filter brightness ではなく opacity 変化

### scroll-indicator

- **ja**: スクロール誘導
- **Background**: transparent
- **Accent**: #c4a28b
- **States**:
  - **idle**:
    - animation: scroll-indicator-pulse
    - reason: kv-hero フルスクリーン高さの誘導必須

### footer

- **ja**: フッター
- **Background**: #09172c
- **Accent**: #c4a28b
- **States**:
  - **idle**:
    - animation: —

---

## Animations

### Libraries

| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | 外部依存回避、threshold 0.2 で十分 |
| hover | CSS transition only | opacity-dim のみで mood に合致 |
| keyframe | CSS @keyframes | hero-enter / hero-idle / scroll-indicator |
| page-transition | — | corporate top のため遷移演出は最小 |
| complex-sequence | — | opening-sequence 不採用、シンプル構成優先 |

### Keyframes

- **blur-reveal**: filter blur(15px)→0 + opacity 0→1, 1.5s ease
- **rise-in**: translateY(20%)→0 + opacity 0→1, 1.5s cubic-bezier(0.02,0.88,0.58,1)
- **ken-burns-slow**: scale 1→1.05, 12s ease-in-out alternate infinite
- **fade-blur-in**: filter blur(10px)→0 + opacity 0→1, 1.2s ease, delay 0.2s
- **scroll-fade-up**: translateY(40px)→0 + opacity 0→1, 0.8s cubic-bezier(.22,.61,.36,1)
- **scroll-indicator-pulse**: opacity + translateY 0→8px, 2s ease-in-out infinite
- **drawer-slide**: translateX(-100%)→0, 0.4s ease

### Transitions

- **opacity-dim**: opacity 1→0.8, 0.2s ease（hover 共通）
- **nav-blur-in**: backdrop-filter blur(0)→(20px), 0.4s ease

### Scroll Behaviors

- **fade-blur-in**: data-scroll-reveal 要素に IntersectionObserver で `.is-in` 付与、threshold 0.2
- **scroll-fade-up**: 同上、threshold 0.15

### Hover / Interaction

- **nav-link / cta-button / card-item**: opacity-dim 共通

---

## Constraints

- アニメーション duration は 0.8s〜2.0s に統一（mood=slow/luxury 由来）
- 使用色は 4 色以内（bg + primary + accent + sub-accent）
- PC ファースト（technical.device-priority=pc-first）。SP は drawer-slide でフル sp-menu
- 外部 CDN・外部画像 URL の使用禁止（technical.dependency-tolerance=css-only）
- hover は brightness ではなく opacity 変化で統一（mood=luxury）

---

## 自由記述ログ

```
クイズ自由記述欄:
- 化粧品ブランドだが「清潔・透明」の方向に行きたくない。「夜の神秘」を主軸に据える
- 競合との差別化軸として「ストーリーテリング」を意識
- スクロール先のセクションでも世界観を維持したい
```
