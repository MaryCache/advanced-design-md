# DESIGN — sample-portfolio-minimal

## Intent

- **Generated**: 2026-04-25
- **Source**: design-creator (quiz-driven)
- **Volume**: deep
- **Use**: 個人ポートフォリオサイト（フリーランス・デザイナー）
- **Mood**: minimal, calm, urban
- **第一印象軸**: 余白で語る引き算の美 — 補完方針: user-input
- **ターゲット**: 制作会社・スタートアップの採用担当 / アートディレクター
- **差別化軸**: 派手なアニメや装飾ではなく、editorial な情報設計で力量を示す

---

## Colors

### メインパレット: monochrome-urban

- **Background**: #1a1d25
  - role: 全体背景
  - reason: 第一印象軸「引き算の美」を支える深いグレー。urban に親和
- **Primary**: #262931
  - role: セクション境界
  - reason: bg と最小コントラストで段差をつける
- **Accent**: #c8d0d1
  - role: テキスト主役・装飾線
  - reason: minimal 系で文字色 = アクセントの構図

<!-- alternative: white-pearl - 反転（ライトテーマ）希望時 -->

---

## Typography

| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | Inter Variable | Google Fonts | 500 | minimal/urban に適合する sans。weight 微調整可能 |
| heading-ja | Noto Sans JP | Google Fonts | 500 | sans 統一で一貫性 |
| body-ja | Noto Sans JP | Google Fonts | 300 | 細身で editorial 感、本文の引き算 |
| mono | JetBrains Mono | Google Fonts | 400 | 作品メタデータ（年月・技術スタック）の表示 |

### 共通値

- **Base Size**: 16px
- **Scale**: h1=56px, h2=32px, h3=20px, body=16px, small=13px
- **Line Height**: 1.7
- **Tracking**: heading 標準 / body 0.02em / mono 0.05em

---

## Spacing

- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
- **Container Max Width**: 1100px
- **Grid**: 12 columns, gap=32px（minimal は gap を広めに）

---

## Components

### nav-header

- **ja**: ナビゲーションヘッダー
- **Background**: transparent
- **Accent**: #c8d0d1
- **States**:
  - **idle**:
    - animation: —
    - reason: minimal mood 由来、装飾なし transparent

### nav-link

- **ja**: ナビゲーションリンク
- **Background**: transparent
- **Accent**: #c8d0d1
- **States**:
  - **hover**:
    - animation: underline-slide
    - reason: editorial サイトで定番の控えめ反応

### kv-hero

- **ja**: メインビジュアル（テキスト主体）
- **Background**: #1a1d25
- **Accent**: #c8d0d1
- **States**:
  - **enter**:
    - animation: fade-up
    - trigger: ロード完了
    - reason: 派手な演出を避け、控えめな入場で minimal に徹する

### hero-title

- **ja**: 名前・肩書き
- **Background**: transparent
- **Accent**: #c8d0d1
- **States**:
  - **enter**:
    - animation: rise-in
    - trigger: ロード完了 + delay 0.2s
    - reason: 文字が静かに浮上、editorial の落ち着き

### section-heading

- **ja**: セクション見出し
- **Background**: —
- **Accent**: #c8d0d1
- **States**:
  - **enter**:
    - animation: scroll-fade-in
    - trigger: scroll-reveal (threshold 0.3)
    - reason: 最も控えめな reveal、minimal mood 維持

### card-item

- **ja**: 作品カード
- **Background**: #262931
- **Accent**: #c8d0d1
- **States**:
  - **enter**:
    - animation: section-slide-up
    - trigger: scroll-reveal (stagger 0.1s)
    - reason: 作品群を順次提示、editorial 感
  - **hover**:
    - animation: ghost-fade
    - reason: 派手な scale ではなく opacity + translate で控えめに

### page-transition

- **ja**: ページ遷移
- **Background**: #1a1d25
- **Accent**: #c8d0d1
- **States**:
  - **leave / enter**:
    - animation: crossfade
    - reason: 作品詳細ページへの遷移時、minimal を維持

### footer

- **ja**: フッター
- **Background**: #1a1d25
- **Accent**: #c8d0d1
- **States**:
  - **idle**:
    - animation: —

---

## Animations

### Libraries

| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | minimal で十分 |
| hover | CSS transition only | underline-slide / ghost-fade |
| keyframe | CSS @keyframes | hero-enter のみ |
| page-transition | CSS keyframe | crossfade のみ、SPA でない場合は overlay 制御 |
| complex-sequence | — | minimal 方針のため不採用 |

### Keyframes

- **fade-up**: translateY(8%)→0 + opacity 0→1, 0.8s ease
- **rise-in**: translateY(20%)→0 + opacity 0→1, 1.5s cubic-bezier(0.02,0.88,0.58,1)
- **scroll-fade-in**: opacity 0→1, 1.0s ease
- **section-slide-up**: translateY(60px)→0, 0.8s ease, stagger 0.1s
- **crossfade**: opacity 1→0 (current) + 0→1 (next), 0.5s ease

### Transitions

- **underline-slide**: width 0→100% の border-bottom, 0.3s ease
- **ghost-fade**: opacity 1→0.6 + translateY(-2px), 0.3s ease

### Scroll Behaviors

- **scroll-fade-in / section-slide-up**: data-scroll-reveal 要素を IntersectionObserver で `.is-in` 付与、threshold 0.3

### Hover / Interaction

- **nav-link**: underline-slide
- **card-item**: ghost-fade

---

## Color Roles

| role | value | source-palette | reason |
|---|---|---|---|
| text-primary | #c8d0d1 | monochrome-urban.accent | accent ＝ テキスト主役の minimal 構図 |
| text-secondary | rgba(200, 208, 209, 0.6) | accent + alpha | 補助テキスト・mono メタデータ用 |
| border | rgba(200, 208, 209, 0.15) | accent + alpha | section 区切り線 |

---

## Constraints

- アニメーション duration は 0.3s〜1.0s（mood=minimal/calm 由来）
- 使用色は 3 色以内（bg + primary + accent）
- PC ファースト（technical.device-priority=pc-first）。SP は collapsed nav 1 段
- 外部 CDN・外部画像 URL の使用禁止
- 装飾要素（bg-decoration / opening-sequence）は禁止（minimal 方針）

---

## 自由記述ログ

```
クイズ自由記述欄:
- ポートフォリオは「派手で目を引く」より「冷静で読ませる」方向に
- editorial サイト（雑誌の組版）にインスパイアされている
- 作品の年月・技術スタックは mono で表記したい
- 採用担当者がスマホで見ることもあるが、PC でじっくり読まれる前提
```
