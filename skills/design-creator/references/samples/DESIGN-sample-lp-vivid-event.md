# DESIGN — sample-lp-vivid-event

## Intent

- **Generated**: 2026-04-25
- **Source**: design-creator (quiz-driven)
- **Volume**: quick
- **Use**: 架空音楽フェスのイベント告知 LP
- **Mood**: vivid, energetic, pop
- **第一印象軸**: 飛び込んでくる祝祭感 — 補完方針: user-input
- **ターゲット**: [要確認]
- **差別化軸**: [要確認]

---

## Colors

### メインパレット: orange-black

- **Background**: #242a3a
  - role: 全体背景
  - reason: vivid 系をビビッドに見せるための濃グレー bg
- **Primary**: #313849
  - role: セクション仕切り
  - reason: bg 同系統で奥行き
- **Accent**: #df762e
  - role: 主要 CTA・ハイライト
  - reason: 第一印象軸「飛び込む祝祭感」を体現するオレンジ

<!-- alternative: vivid-pink-navy - フェス女性層を意識する場合 -->

---

## Typography

| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | Oswald | Google Fonts | 700 | mood=sporty/vivid に適合する display sans。縦長で勢い |
| heading-ja | Noto Sans JP | Google Fonts | 700 | sans 主役型で heading-en と同方向 |
| body-ja | Noto Sans JP | Google Fonts | 400 | 統一 sans で軽量 |
| mono | — | — | — | 用途外 |

### 共通値

- **Base Size**: 16px
- **Scale**: h1=64px, h2=40px, h3=24px, body=16px, small=12px
- **Line Height**: 1.5
- **Tracking**: heading 0.05em uppercase / body 標準

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
- **Background**: rgba(36, 42, 58, 0.9)
- **Accent**: #df762e
- **States**:
  - **idle**:
    - animation: —
  - **scrolled**:
    - animation: nav-blur-in
    - trigger: scrollY > 80px

### kv-hero

- **ja**: メインビジュアル
- **Background**: #242a3a
- **Accent**: #df762e
- **States**:
  - **enter**:
    - animation: kv-scale-in
    - trigger: ロード完了
    - reason: 第一印象軸「飛び込む祝祭感」をスケールで表現
  - **idle**:
    - animation: hero-pulse
    - reason: 静止時にも生命感を維持

### hero-title

- **ja**: イベント名タイトル
- **Background**: transparent
- **Accent**: #df762e
- **States**:
  - **enter**:
    - animation: char-split-flicker
    - trigger: ロード完了 + delay 0.3s
    - reason: 各文字が次々現れることで「カウントダウン」的高揚感

### section-heading

- **ja**: セクション見出し
- **Background**: —
- **Accent**: #df762e
- **States**:
  - **enter**:
    - animation: scroll-zoom-in
    - trigger: scroll-reveal (threshold 0.2)
    - reason: スプリング感がフェスの「弾ける」テンポに親和

### card-item

- **ja**: アーティストカード / タイムテーブル
- **Background**: #313849
- **Accent**: #df762e
- **States**:
  - **enter**:
    - animation: scroll-fade-up
    - trigger: scroll-reveal
    - reason: 標準入場、stagger で群感を出す
  - **hover**:
    - animation: scale-up
    - reason: playful 反応、CTA への引きを強化

### cta-button

- **ja**: チケット購入ボタン
- **Background**: #df762e
- **Accent**: #242a3a (text)
- **States**:
  - **hover**:
    - animation: fill-sweep
    - reason: bold mood に適合、購買アクションの強調

### scroll-indicator

- **ja**: スクロール誘導
- **Background**: transparent
- **Accent**: #df762e
- **States**:
  - **idle**:
    - animation: scroll-indicator-pulse

### footer

- **ja**: フッター
- **Background**: #242a3a
- **Accent**: #df762e
- **States**:
  - **idle**:
    - animation: —

---

## Animations

### Libraries

| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | 標準実装 |
| hover | CSS transition only | scale-up / fill-sweep を transition で十分実現 |
| keyframe | CSS @keyframes | hero / scroll-indicator |
| page-transition | — | 単 page LP のため遷移演出なし |
| complex-sequence | — | 不採用 |

### Keyframes

- **kv-scale-in**: scale 1.2→1 + opacity 0→1, 1.0s ease
- **char-split-flicker**: 各文字 opacity 0→1, 0.05s ease, stagger 0.05s
- **hero-pulse**: opacity 1→0.85→1, 4s ease-in-out infinite
- **scroll-zoom-in**: scale 0.9→1 + opacity 0→1, 1.0s ease
- **scroll-fade-up**: translateY(40px)→0 + opacity 0→1, 0.8s cubic-bezier(.22,.61,.36,1)
- **scroll-indicator-pulse**: opacity + translateY 0→8px, 2s ease-in-out infinite

### Transitions

- **scale-up**: transform scale 1→1.03, 0.2s ease（card hover）
- **fill-sweep**: background-position 0→100%, 0.4s ease（cta hover）
- **nav-blur-in**: backdrop-filter blur(0)→(20px), 0.4s ease

### Scroll Behaviors

- **scroll-zoom-in / scroll-fade-up**: data-scroll-reveal 要素を IntersectionObserver で `.is-in` 付与、threshold 0.2

### Hover / Interaction

- **card-item**: scale-up
- **cta-button**: fill-sweep
- **nav-link**: color-shift（accent 色へ）

---

## Constraints

- アニメーション duration は 0.2s〜1.0s（mood=energetic/fast 由来）
- アクセント色は 1 色（オレンジ）に絞り、印象を集中
- SP ファースト（フェス LP の主流）
- 外部 CDN・外部画像 URL の使用禁止

---

## 自由記述ログ

```
クイズ自由記述欄:
- フェス用途として「スピード感」「祝祭感」を最優先
- ターゲットや差別化軸はクイック モードのため未確定 → standard 以上で詰めること
```
