# DESIGN — {NAME}

## Intent

- **Generated**: {YYYY-MM-DD}
- **Source**: design-creator (quiz-driven)
- **Volume**: {quick | standard | deep}
- **Use**: {use ラベル（クイズ Q-intent-01 の選択 or 自由入力）}
- **Mood**: {mood 層の選択を `, ` 結合（例: dark, romantic, calm）}
- **第一印象軸**: {Q-intent-03 選択 or 自由入力} — 補完方針: {auto-complete | user-input | 要確認}
- **ターゲット**: {Q-intent-02 自由入力 or `[要確認]`}
- **差別化軸**: {Q-intent-04 自由入力 or `[要確認]`}

---

## Colors

### メインパレット: {slug}

- **Background**: #{HEX}
  - role: {用途}
  - reason: {Intent のどの項目に紐づくか}
- **Primary**: #{HEX}
  - role: {用途}
  - reason: {...}
- **Accent**: #{HEX}
  - role: {用途}
  - reason: {...}
- **Sub Accent**: #{HEX}（サブパレットがある場合）
  - role: {用途}
  - reason: {...}

<!-- alternative: {第二候補 slug} - {一行理由} -->

---

## Typography

| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | {font} | {Google Fonts / システム} | {weight} | {Intent と mood への紐付け} |
| heading-ja | {font} | {source} | {weight} | {...} |
| body-ja | {font} | {source} | {weight} | {...} |
| mono | {font or —} | {source or —} | {weight or —} | {採用 or 用途外の理由} |

### 共通値

- **Base Size**: 16px
- **Scale**: h1=48px, h2=32px, h3=24px, body=16px, small=12px
- **Line Height**: 1.6
- **Tracking**: {標準 / 0.05em / 0.15em 等。mood に応じる}

---

## Spacing

- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Container Max Width**: 1200px
- **Grid**: 12 columns, gap=24px

---

## Components

<!--
required-parts に含まれる全パーツを順番に書く。
順番は use のデフォルト構成（lexicon/parts.md）に従う。
各パーツに ja / background / accent / states を必須で書く。
-->

### {part-name}

- **ja**: {日本語名}
- **Background**: #{HEX}
- **Accent**: #{HEX}
- **States**:
  - **enter**:
    - animation: {animation-name from lexicon/animations.md}
    - trigger: {発火条件}
    - reason: {Intent と library 選定からの紐付け}
  - **hover**:
    - animation: {animation-name}
    - reason: {...}
  - **idle**:（任意）
    - animation: {animation-name}
    - reason: {...}

<!-- 必要なパーツ数だけ繰り返す -->

---

## Animations

### Libraries

| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | 外部依存回避、scope 別 fade で十分 |
| hover | CSS transition only | 単純な state 変化で十分 |
| keyframe | CSS @keyframes | hero-enter / hero-idle / bg-decoration で使用 |
| page-transition | CSS keyframe | SPA でなければ独立ページ間は CSS で可 |
| complex-sequence | {— or [要確認: GSAP 候補]} | {採用しない理由 or 多段制御の必要性} |

### Keyframes

<!-- 採用したアニメ名と spec を全部転記する。to-mock が @keyframes を生成するための一次情報 -->

- **{animation-name}**: {spec から `from {...} to {...}` 形式 + duration + easing}

例:
- **rise-in**: translateY(20%)→0 + opacity 0→1, 1.5s cubic-bezier(0.02,0.88,0.58,1)
- **blur-reveal**: filter blur(15px)→0 + opacity 0→1, 1.5s ease

### Transitions

<!-- hover 系 -->

- **{animation-name}**: {transition プロパティ + duration + easing}

### Scroll Behaviors

<!-- scroll-reveal 系 -->

- **{animation-name}**: {IntersectionObserver threshold + animation 適用}

### Hover / Interaction

<!-- hover 系の詳細 -->

- **{target part}**: {animation-name} on hover

---

## Color Roles（任意）

色の役割が Components を跨いで複雑な場合のみ記入。

| role | value | source-palette | reason |
|---|---|---|---|

---

## Constraints

<!-- mood と technical からの制約を箇条書き -->

- {例: アニメーション duration は 0.8s〜2.0s に統一（mood=slow/luxury 由来）}
- {例: 使用色は 3 色以内（mood=minimal/luxury 由来）}
- {例: PC ファースト（technical.device-priority=pc-first 由来）。SP は collapsed nav とフルスクリーン KV}
- {例: 外部 CDN・外部画像 URL の使用禁止（technical.dependency-tolerance=css-only 由来）}

---

## 自由記述ログ

クイズの「その他」自由入力と最終ブロックの追記をここに保存する。
DESIGN.md パース時の照合元として残しておく。

```
{quiz の最後の自由記述ブロック原文}
```
