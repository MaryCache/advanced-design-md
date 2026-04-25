# question-bank

design-creator が静的 HTML クイズを構成する設問プール。
各設問は **カテゴリ × 設問文 × 4選択肢 + その他 × 意味付け** の構造を持つ。
意味付け（signal）は「その選択肢が DESIGN.md のどのフィールドに、どの値を示唆するか」を記述する。

---

## 目次

設問 20 個 × 7 レイヤー。volume フィルタは各設問の `volume:` ブロックを参照。

| ID | layer | テーマ | quick | standard | deep |
|---|---|---|---|---|---|
| Q-intent-01 | intent | Use（用途） | ✓ | ✓ | ✓ |
| Q-intent-02 | intent | Target audience（ターゲット層） | — | ✓ | ✓ |
| Q-intent-03 | intent | First impression（第一印象軸） | ✓ | ✓ | ✓ |
| Q-intent-04 | intent | Differentiation（差別化軸） | — | ✓ | ✓ |
| Q-mood-01 | mood | Brightness baseline（明度ベース） | ✓ | ✓ | ✓ |
| Q-mood-02 | mood | Temperature（温度感） | — | — | ✓ |
| Q-mood-03 | mood | Energy（エネルギー） | — | — | ✓ |
| Q-mood-04 | mood | Formality（形式感） | — | — | ✓ |
| Q-visual-01 | visual | Color strategy（配色戦略） | ✓ | ✓ | ✓ |
| Q-visual-02 | visual | Accent strategy（アクセント戦略） | — | — | ✓ |
| Q-visual-03 | visual | Texture（質感） | — | — | ✓ |
| Q-type-01 | typography | Serif / Sans 優位 | — | ✓ | ✓ |
| Q-type-02 | typography | 日本語系統 | — | — | ✓ |
| Q-motion-01 | motion | Tempo（テンポ） | — | ✓ | ✓ |
| Q-motion-02 | motion | Character（キャラクター） | — | — | ✓ |
| Q-motion-03 | motion | Library reach（採用ライブラリ傾向） | — | — | ✓ |
| Q-component-01 | component | Layout type（レイアウト型） | ✓ | ✓ | ✓ |
| Q-component-02 | component | Required parts（必要パーツ群） | — | ✓ | ✓ |
| Q-tech-01 | technical | Device priority（デバイス優先度） | — | — | ✓ |
| Q-tech-02 | technical | External dependency tolerance（外部依存の許容度） | — | — | ✓ |

quick / standard / deep のチェックは目安（実際の出題は各設問の `volume:` ブロックを正とする）。
個別設問の YAML 仕様は下の「構造仕様」、各レイヤー本体は「Intent 層」以降を参照。

---

## 構造仕様

各設問は以下の YAML ブロックで定義する。

```yaml
id: Q-{layer}-{nn}             # 一意ID（例: Q-intent-01）
layer: intent                  # 所属カテゴリ（intent / mood / visual / typography / motion / component / technical）
order: 1                       # 同レイヤー内の推奨順
prompt:
  ja: 日本語の設問文
  en: English question text
options:
  - id: a
    label:
      ja: 選択肢A日本語
      en: Option A English
    signal:
      field: design.intent.use   # DESIGN.md のどこに反映するか
      value: コーポレート          # 反映する値
      hint: なぜそうなるかのメモ
  - id: b
    ...
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.intent.use
      value: __freetext__         # 自由入力をそのまま転記
multi-select: false              # 複数選択可かどうか
skip-when:                       # intake で既に確定してたらスキップ可能な条件
  - intake.use is set
volume:
  quick: true                    # Quick (5問) で出題するか
  standard: true                 # Standard (10問) で出題するか
  deep: true                     # Deep (20問) で出題するか
```

---

## 出題ボリューム規約

| volume | 出題数の目安 | 含む設問 |
|---|---|---|
| quick | 5問 | quick: true のみ |
| standard | 10問 | quick + standard: true |
| deep | 20問 | quick + standard + deep: true |

「quick: true の設問」= サイトを最低限特徴づける必須設問。intent 4問 + mood 1問あたりが標準的な構成。

---

## レイヤー一覧

| layer | 目的 | 想定設問数 |
|---|---|---|
| intent | 誰に・なぜ・何を | 4問前後 |
| mood | サイト全体のトーン | 3〜4問 |
| visual | 配色・質感 | 3〜4問 |
| typography | フォント傾向 | 2〜3問 |
| motion | アニメーション傾向 | 3問 |
| component | 必要パーツ・レイアウト | 2問 |
| technical | デバイス・依存・パフォーマンス | 2〜3問 |

合計 19〜23問のプールから volume に応じて出題。

---

## Intent 層（誰に・なぜ・何を）

### Q-intent-01: Use（用途）

```yaml
id: Q-intent-01
layer: intent
order: 1
prompt:
  ja: このサイトは何のためのもの？
  en: What is this site for?
options:
  - id: a
    label:
      ja: コーポレート（企業情報・ブランド発信）
      en: Corporate (company info, brand)
    signal:
      field: design.intent.use
      value: corporate
      hint: 信頼感・構造性が重視される
  - id: b
    label:
      ja: LP・プロモーション（製品/イベント告知）
      en: Landing page / promotion
    signal:
      field: design.intent.use
      value: lp
      hint: 第一印象勝負・スクロール誘導が肝
  - id: c
    label:
      ja: EC・販売
      en: E-commerce / shop
    signal:
      field: design.intent.use
      value: ec
      hint: カード一覧・ナビ・モーダルが必須化
  - id: d
    label:
      ja: ポートフォリオ・作品集
      en: Portfolio / works
    signal:
      field: design.intent.use
      value: portfolio
      hint: editorial・カード・モーション重視
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.intent.use
      value: __freetext__
multi-select: false
skip-when:
  - intake.use is set
volume:
  quick: true
  standard: true
  deep: true
```

### Q-intent-02: Target audience（ターゲット層）

```yaml
id: Q-intent-02
layer: intent
order: 2
prompt:
  ja: 主なターゲット層は？
  en: Who is the main audience?
options:
  - id: a
    label:
      ja: 10代〜20代前半（若年層）
      en: Teens to early 20s
    signal:
      field: design.intent.target
      value: young
      hint: vivid / pop / energetic に親和
  - id: b
    label:
      ja: 20代後半〜30代（中堅層）
      en: Late 20s to 30s
    signal:
      field: design.intent.target
      value: mid-adult
      hint: バランス型・editorial 親和
  - id: c
    label:
      ja: 40代以上（成熟層）
      en: 40s and above
    signal:
      field: design.intent.target
      value: mature
      hint: dark / luxury / 落ち着き親和
  - id: d
    label:
      ja: 業界プロ・専門家（年齢不問）
      en: Industry pros / specialists
    signal:
      field: design.intent.target
      value: professional
      hint: tech / SaaS / data-rich 親和
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.intent.target
      value: __freetext__
multi-select: false
skip-when:
  - intake.target is set
volume:
  quick: true
  standard: true
  deep: true
```

### Q-intent-03: First impression（第一印象軸）

```yaml
id: Q-intent-03
layer: intent
order: 3
prompt:
  ja: 訪問して3秒で受け取ってほしい第一印象は？
  en: What single impression do you want visitors to feel in 3 seconds?
options:
  - id: a
    label:
      ja: 信頼感・誠実
      en: Trust / sincerity
    signal:
      field: design.intent.first-impression
      value: trustworthy
      hint: corporate / business mood へ寄せる
  - id: b
    label:
      ja: 神秘性・特別感
      en: Mystique / special
    signal:
      field: design.intent.first-impression
      value: mystical
      hint: dark / luxury mood、blur-reveal 系へ寄せる
  - id: c
    label:
      ja: 楽しさ・遊び心
      en: Fun / playful
    signal:
      field: design.intent.first-impression
      value: playful
      hint: vivid / pop mood、scale系/弾む系へ寄せる
  - id: d
    label:
      ja: 静けさ・余白
      en: Calm / minimal
    signal:
      field: design.intent.first-impression
      value: calm
      hint: minimal / editorial mood、控えめモーションへ寄せる
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.intent.first-impression
      value: __freetext__
multi-select: false
skip-when:
  - intake.first-impression is set
volume:
  quick: true
  standard: true
  deep: true
```

### Q-intent-04: Differentiation（差別化軸）

```yaml
id: Q-intent-04
layer: intent
order: 4
prompt:
  ja: 同業・類似サイトでよく見る表現で「避けたい」ものはある？
  en: What common expression in similar sites do you want to avoid?
options:
  - id: a
    label:
      ja: ありきたりな透明感・明るさ
      en: Generic transparency / brightness
    signal:
      field: design.intent.differentiation
      value: avoid-bright-generic
      hint: 暗色寄り・深みで対抗
  - id: b
    label:
      ja: 過剰な装飾・エフェクト
      en: Excessive decoration / effects
    signal:
      field: design.intent.differentiation
      value: avoid-overdecoration
      hint: minimal 方向に抑える
  - id: c
    label:
      ja: 冷たすぎる無機質さ
      en: Too cold / sterile
    signal:
      field: design.intent.differentiation
      value: avoid-cold
      hint: warm accent / 手書き要素を入れる
  - id: d
    label:
      ja: 特に避けたい表現はない
      en: No specific avoidance
    signal:
      field: design.intent.differentiation
      value: none
      hint: 制約なし、mood 主導で進める
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.intent.differentiation
      value: __freetext__
multi-select: false
skip-when:
  - intake.differentiation is set
volume:
  quick: false
  standard: true
  deep: true
```

---

## Mood 層（サイト全体のトーン）

### Q-mood-01: Brightness baseline（明度ベース）

```yaml
id: Q-mood-01
layer: mood
order: 1
prompt:
  ja: サイト全体の明るさは？
  en: What's the overall brightness baseline?
options:
  - id: a
    label:
      ja: 暗色ベース（黒〜深い色を背景に）
      en: Dark base (black or deep color background)
    signal:
      field: design.mood.brightness
      value: dark
      hint: dark / luxury / mystical 親和、テキストは明色
  - id: b
    label:
      ja: 明色ベース（白〜淡い色を背景に）
      en: Light base (white or pale color background)
    signal:
      field: design.mood.brightness
      value: light
      hint: minimal / clean / fresh 親和
  - id: c
    label:
      ja: 中間（グレー・ベージュ等の中明度）
      en: Mid-tone (gray, beige, etc.)
    signal:
      field: design.mood.brightness
      value: mid
      hint: editorial / 落ち着き親和
  - id: d
    label:
      ja: グラデーション主体（明から暗へ流れる）
      en: Gradient-driven (flows from light to dark)
    signal:
      field: design.mood.brightness
      value: gradient
      hint: dramatic / cinematic 親和
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.mood.brightness
      value: __freetext__
multi-select: false
skip-when:
  - intake.brightness is set
volume:
  quick: true
  standard: true
  deep: true
```

### Q-mood-02: Temperature（温度感）

```yaml
id: Q-mood-02
layer: mood
order: 2
prompt:
  ja: 配色の温度感は？
  en: What's the color temperature?
options:
  - id: a
    label:
      ja: 暖色寄り（赤・オレンジ・ベージュ・ピンク）
      en: Warm (red, orange, beige, pink)
    signal:
      field: design.mood.temperature
      value: warm
      hint: 親しみ・体温感
  - id: b
    label:
      ja: 寒色寄り（青・緑・紫）
      en: Cool (blue, green, purple)
    signal:
      field: design.mood.temperature
      value: cool
      hint: 落ち着き・知的・tech 親和
  - id: c
    label:
      ja: 中性（モノクロ・グレー・無彩色）
      en: Neutral (monochrome, gray, achromatic)
    signal:
      field: design.mood.temperature
      value: neutral
      hint: editorial / minimal / 高級感
  - id: d
    label:
      ja: 暖寒の対比（両極を意図的に組む）
      en: Warm-cool contrast (intentionally combined)
    signal:
      field: design.mood.temperature
      value: contrast
      hint: dramatic / 視覚インパクト
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.mood.temperature
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

### Q-mood-03: Energy（エネルギー）

```yaml
id: Q-mood-03
layer: mood
order: 3
prompt:
  ja: サイトのエネルギー感は？
  en: What's the energy level?
options:
  - id: a
    label:
      ja: 静寂（calm・余白多め・動きを抑える）
      en: Calm (lots of whitespace, restrained motion)
    signal:
      field: design.mood.energy
      value: calm
      hint: minimal / editorial / luxury
  - id: b
    label:
      ja: 表現的（expressive・適度な動き・印象付け）
      en: Expressive (moderate motion, memorable)
    signal:
      field: design.mood.energy
      value: expressive
      hint: brand site / portfolio
  - id: c
    label:
      ja: 劇的（theatrical・大きな動き・没入感）
      en: Theatrical (big motion, immersive)
    signal:
      field: design.mood.energy
      value: theatrical
      hint: ゲーム / 映画 / イベント LP
  - id: d
    label:
      ja: 機能優先（energy控えめでもOK、情報伝達最優先）
      en: Function-first (energy minimal, info-priority)
    signal:
      field: design.mood.energy
      value: functional
      hint: SaaS / 業務系 / EC
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.mood.energy
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

### Q-mood-04: Formality（形式感）

```yaml
id: Q-mood-04
layer: mood
order: 4
prompt:
  ja: サイトの形式感は？
  en: What's the level of formality?
options:
  - id: a
    label:
      ja: フォーマル（堅実・きっちり・敬体）
      en: Formal (firm, structured, polite)
    signal:
      field: design.mood.formality
      value: formal
      hint: 余白・整列・直線的
  - id: b
    label:
      ja: カジュアル（親しみやすさ・ゆるさ）
      en: Casual (friendly, relaxed)
    signal:
      field: design.mood.formality
      value: casual
      hint: rounded font / 手書き要素 / 暖色
  - id: c
    label:
      ja: プレイフル（遊び心・ユーモア）
      en: Playful (humor, whimsy)
    signal:
      field: design.mood.formality
      value: playful
      hint: vivid / pop / 動きあり
  - id: d
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.mood.formality
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

---

## Visual 層（配色・質感）

### Q-visual-01: Color strategy（配色戦略）

```yaml
id: Q-visual-01
layer: visual
order: 1
prompt:
  ja: 配色の組み立て方は？
  en: How should colors be composed?
options:
  - id: a
    label:
      ja: モノクロ（無彩色のみ、ほぼ黒白グレー）
      en: Monochrome (achromatic only)
    signal:
      field: design.visual.color-strategy
      value: monochrome
      hint: editorial / minimal 極致
  - id: b
    label:
      ja: 2色構成（メイン + 差し色1色）
      en: Duotone (main + 1 accent)
    signal:
      field: design.visual.color-strategy
      value: duotone
      hint: ブランド強度高め
  - id: c
    label:
      ja: 多色（3色以上の意図的なパレット）
      en: Vivid palette (3+ colors)
    signal:
      field: design.visual.color-strategy
      value: vivid
      hint: pop / 個性強め
  - id: d
    label:
      ja: グラデーション主体（連続的色変化）
      en: Gradient-driven (continuous color flow)
    signal:
      field: design.visual.color-strategy
      value: gradient
      hint: dreamy / cinematic
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.visual.color-strategy
      value: __freetext__
multi-select: false
volume:
  quick: true
  standard: true
  deep: true
```

### Q-visual-02: Accent strategy（アクセント戦略）

```yaml
id: Q-visual-02
layer: visual
order: 2
prompt:
  ja: 差し色（アクセント）の使い方は？
  en: How should the accent color be used?
options:
  - id: a
    label:
      ja: 単一の差し色を強く効かせる
      en: One strong accent
    signal:
      field: design.visual.accent
      value: single-strong
      hint: CTA・focus要素を1色で統一
  - id: b
    label:
      ja: 2色のアクセント（主・副）を使い分け
      en: Two accents (primary + secondary)
    signal:
      field: design.visual.accent
      value: dual
      hint: 役割分離型（主=CTA、副=装飾）
  - id: c
    label:
      ja: 差し色なし（モノトーンで完結）
      en: No accent (monotone only)
    signal:
      field: design.visual.accent
      value: none
      hint: minimal 極致
  - id: d
    label:
      ja: グラデーションアクセント
      en: Gradient accent
    signal:
      field: design.visual.accent
      value: gradient
      hint: tech / brand / 流動感
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.visual.accent
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

### Q-visual-03: Texture（質感）

```yaml
id: Q-visual-03
layer: visual
order: 3
prompt:
  ja: 全体の質感は？
  en: What's the overall texture feel?
options:
  - id: a
    label:
      ja: マット（フラット・影なし・面で構成）
      en: Matte (flat, no shadow, surface-driven)
    signal:
      field: design.visual.texture
      value: matte
      hint: 現代的 / minimal / corporate
  - id: b
    label:
      ja: 光沢（gloss・グラデ・反射感）
      en: Glossy (gradient, reflective feel)
    signal:
      field: design.visual.texture
      value: glossy
      hint: luxury / cosmetic / premium
  - id: c
    label:
      ja: テクスチャあり（紙・布・ノイズ等の質感）
      en: Textured (paper, fabric, noise feel)
    signal:
      field: design.visual.texture
      value: textured
      hint: editorial / craft / natural
  - id: d
    label:
      ja: ガラス感（blur / backdrop-filter 多用）
      en: Glass (blur / backdrop-filter heavy)
    signal:
      field: design.visual.texture
      value: glass
      hint: tech / modern / dreamy
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.visual.texture
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

---

## Typography 層（フォント傾向）

### Q-type-01: Serif / Sans 優位

```yaml
id: Q-type-01
layer: typography
order: 1
prompt:
  ja: 文字組みの主軸は？
  en: What's the primary type style?
options:
  - id: a
    label:
      ja: serif / 明朝 主役（クラシック・editorial・luxury）
      en: Serif / mincho leading (classic, editorial, luxury)
    signal:
      field: design.typography.style
      value: serif-driven
      hint: dark / luxury / fashion / 文化系
  - id: b
    label:
      ja: sans / ゴシック 主役（モダン・clean・tech）
      en: Sans / gothic leading (modern, clean, tech)
    signal:
      field: design.typography.style
      value: sans-driven
      hint: corporate / SaaS / minimal
  - id: c
    label:
      ja: 混在（見出しserif + 本文sans 等）
      en: Mixed (serif heading + sans body)
    signal:
      field: design.typography.style
      value: mixed
      hint: editorial / バランス型
  - id: d
    label:
      ja: 装飾的（手書き・display・特殊フォント）
      en: Decorative (handwritten, display, specialty)
    signal:
      field: design.typography.style
      value: decorative
      hint: brand強度・個性重視
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.typography.style
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: true
  deep: true
```

### Q-type-02: 日本語系統

```yaml
id: Q-type-02
layer: typography
order: 2
prompt:
  ja: 日本語フォントの系統は？
  en: What style for Japanese fonts?
options:
  - id: a
    label:
      ja: 明朝（伝統・上品・editorial）
      en: Mincho (traditional, elegant, editorial)
    signal:
      field: design.typography.ja-style
      value: mincho
      hint: serif-driven と組合せ
  - id: b
    label:
      ja: ゴシック（現代・読みやすさ・実用）
      en: Gothic (modern, readable, practical)
    signal:
      field: design.typography.ja-style
      value: gothic
      hint: sans-driven と組合せ
  - id: c
    label:
      ja: 丸ゴシック（親しみやすい・rounded）
      en: Rounded gothic (friendly)
    signal:
      field: design.typography.ja-style
      value: rounded
      hint: casual / playful 親和
  - id: d
    label:
      ja: 日本語フォント不要（英字のみで完結）
      en: Japanese not needed (English only)
    signal:
      field: design.typography.ja-style
      value: en-only
      hint: 海外向け / 英字主役
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.typography.ja-style
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

---

## Motion 層（アニメーション傾向）

### Q-motion-01: Tempo（テンポ）

```yaml
id: Q-motion-01
layer: motion
order: 1
prompt:
  ja: アニメーションのテンポ感は？
  en: What's the animation tempo?
options:
  - id: a
    label:
      ja: 素早い（0.2s前後・反応早く軽快）
      en: Fast (~0.2s, responsive, snappy)
    signal:
      field: design.motion.tempo
      value: fast
      hint: tech / SaaS / pop
  - id: b
    label:
      ja: 中庸（0.4〜0.8s・標準的）
      en: Medium (0.4-0.8s, standard)
    signal:
      field: design.motion.tempo
      value: medium
      hint: 万能型・editorial / corporate
  - id: c
    label:
      ja: ゆったり（1.5〜2s・余裕・贅沢）
      en: Slow (1.5-2s, relaxed, luxurious)
    signal:
      field: design.motion.tempo
      value: slow
      hint: dark / luxury / cinematic
  - id: d
    label:
      ja: アニメ最小限（必要箇所のみ・無くてもOK）
      en: Minimal motion (only essentials)
    signal:
      field: design.motion.tempo
      value: minimal
      hint: 業務系 / コンテンツ優先
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.motion.tempo
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: true
  deep: true
```

### Q-motion-02: Character（キャラクター）

```yaml
id: Q-motion-02
layer: motion
order: 2
prompt:
  ja: アニメーションの性格は？
  en: What's the motion character?
options:
  - id: a
    label:
      ja: 控えめ（subtle・気付かれない程度のフィードバック）
      en: Subtle (barely-noticeable feedback)
    signal:
      field: design.motion.character
      value: subtle
      hint: opacity / 微小 transform 中心
  - id: b
    label:
      ja: 表現的（expressive・印象に残る動き）
      en: Expressive (memorable motion)
    signal:
      field: design.motion.character
      value: expressive
      hint: blur-reveal / rise-in 系
  - id: c
    label:
      ja: 劇的（theatrical・物語的・没入演出）
      en: Theatrical (cinematic, story-driven)
    signal:
      field: design.motion.character
      value: theatrical
      hint: opening-sequence / 多段連鎖
  - id: d
    label:
      ja: 機械的（precise・動きの形が明快）
      en: Mechanical (precise, clearly-shaped)
    signal:
      field: design.motion.character
      value: mechanical
      hint: linear easing / flicker 系
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.motion.character
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

### Q-motion-03: Library reach（採用ライブラリ傾向）

```yaml
id: Q-motion-03
layer: motion
order: 3
prompt:
  ja: アニメーション実装の手段はどこまで許容？
  en: How far can animation implementation reach?
options:
  - id: a
    label:
      ja: CSS + IntersectionObserver のみ（外部依存ゼロ）
      en: CSS + IntersectionObserver only (no external deps)
    signal:
      field: design.motion.library
      value: css-only
      hint: 軽量・配布容易
  - id: b
    label:
      ja: GSAP 系を許容（複雑なシーケンス・ScrollTrigger）
      en: GSAP allowed (complex sequences, ScrollTrigger)
    signal:
      field: design.motion.library
      value: gsap
      hint: theatrical / brand site
  - id: c
    label:
      ja: WebGL / Three.js も含めて自由
      en: WebGL / Three.js anything goes
    signal:
      field: design.motion.library
      value: webgl
      hint: immersive / experimental
  - id: d
    label:
      ja: 必要最小限（要件次第で都度判断）
      en: Minimum necessary (decide per requirement)
    signal:
      field: design.motion.library
      value: case-by-case
      hint: 標準回答
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.motion.library
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

---

## Component 層（必要パーツ・レイアウト）

### Q-component-01: Layout type（レイアウト型）

```yaml
id: Q-component-01
layer: component
order: 1
prompt:
  ja: レイアウトの基本型は？
  en: What's the base layout type?
options:
  - id: a
    label:
      ja: editorial（文字主役・余白多め・雑誌風）
      en: Editorial (text-driven, lots of whitespace, magazine-style)
    signal:
      field: design.component.layout
      value: editorial
      hint: portfolio / brand / fashion
  - id: b
    label:
      ja: card-grid（カード一覧主体・並列構造）
      en: Card-grid (card-list, parallel structure)
    signal:
      field: design.component.layout
      value: card-grid
      hint: EC / portfolio / news
  - id: c
    label:
      ja: full-bleed（画面いっぱいのKV・縦長サイト）
      en: Full-bleed (screen-wide KV, long scroll)
    signal:
      field: design.component.layout
      value: full-bleed
      hint: LP / promotion / brand
  - id: d
    label:
      ja: sectioned（セクション区切り明快・伝統的）
      en: Sectioned (clearly-separated sections, traditional)
    signal:
      field: design.component.layout
      value: sectioned
      hint: corporate / business
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.component.layout
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: true
  deep: true
```

### Q-component-02: Required parts（必要パーツ群）

```yaml
id: Q-component-02
layer: component
order: 2
prompt:
  ja: 必須となるパーツ群は？（複数選択可）
  en: Which parts are required? (multi-select)
options:
  - id: a
    label:
      ja: 入場演出系（page-loader / opening-sequence / page-transition）
      en: Entry effects (loader / opening / transition)
    signal:
      field: design.component.parts
      value: [page-loader, opening-sequence, page-transition]
      hint: brand strength 重視
  - id: b
    label:
      ja: ナビ系（nav-header / nav-link / sp-menu）
      en: Navigation (nav-header / nav-link / sp-menu)
    signal:
      field: design.component.parts
      value: [nav-header, nav-link, sp-menu]
      hint: ほぼ全サイト必須
  - id: c
    label:
      ja: KV系（kv-hero / hero-title / scroll-indicator）
      en: Key visual (kv-hero / hero-title / scroll-indicator)
    signal:
      field: design.component.parts
      value: [kv-hero, hero-title, scroll-indicator]
      hint: LP / brand / portfolio 必須
  - id: d
    label:
      ja: コンテンツ系（section-heading / card-item / cta-button）
      en: Content (section-heading / card-item / cta-button)
    signal:
      field: design.component.parts
      value: [section-heading, card-item, cta-button]
      hint: ほぼ全サイト必須
  - id: e
    label:
      ja: その他（自由入力で個別パーツ名を列挙）
      en: Other (list specific part names)
    signal:
      field: design.component.parts
      value: __freetext__
multi-select: true
volume:
  quick: false
  standard: false
  deep: true
```

---

## Technical 層（デバイス・依存・パフォーマンス）

### Q-tech-01: Device priority（デバイス優先度）

```yaml
id: Q-tech-01
layer: technical
order: 1
prompt:
  ja: 優先するデバイス環境は？
  en: Which device environment is the priority?
options:
  - id: a
    label:
      ja: モバイル優先（SP UX が最重要）
      en: Mobile-first (SP UX top priority)
    signal:
      field: design.technical.device
      value: mobile-first
      hint: タッチ操作 / 縦スクロール最適化
  - id: b
    label:
      ja: デスクトップ優先（PC UX が最重要）
      en: Desktop-first (PC UX top priority)
    signal:
      field: design.technical.device
      value: desktop-first
      hint: 大画面演出 / マウス操作前提
  - id: c
    label:
      ja: 両立（SP/PC 等しく作り込む）
      en: Both equally
    signal:
      field: design.technical.device
      value: both
      hint: レスポンシブ綿密設計
  - id: d
    label:
      ja: SP 専用（PC 表示は最低限）
      en: SP only (minimal PC support)
    signal:
      field: design.technical.device
      value: sp-only
      hint: モバイルアプリ的 LP
  - id: e
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.technical.device
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: true
  deep: true
```

### Q-tech-02: External dependency tolerance（外部依存の許容度）

```yaml
id: Q-tech-02
layer: technical
order: 2
prompt:
  ja: 外部ライブラリ・サービスの許容度は？
  en: How tolerant of external libraries / services?
options:
  - id: a
    label:
      ja: 依存ゼロ（CDN含めて外部リソース禁止）
      en: Zero deps (no CDN, no external resources)
    signal:
      field: design.technical.dependency
      value: none
      hint: 完全自己完結
  - id: b
    label:
      ja: 限定的（Google Fonts / 軽量CDNのみ可）
      en: Limited (Google Fonts / light CDN only)
    signal:
      field: design.technical.dependency
      value: limited
      hint: 標準的なweb開発
  - id: c
    label:
      ja: 自由（GSAP / Three.js 等含めて目的次第）
      en: Free (GSAP / Three.js etc. as needed)
    signal:
      field: design.technical.dependency
      value: free
      hint: brand site / experimental
  - id: d
    label:
      ja: その他（自由入力）
      en: Other (free input)
    signal:
      field: design.technical.dependency
      value: __freetext__
multi-select: false
volume:
  quick: false
  standard: false
  deep: true
```

---

## プロンプト出力仕様

quiz.html が生成する 2 種類のプロンプト（完了プロンプト / 個別相談プロンプト）の正式仕様は **`prompt-format.md` を参照**。

- 完了プロンプト: `# Design Brief — {timestamp}` を先頭に持つ構造化マークダウン形式（ja/en 両言語の見出し対応表あり）
- 個別相談プロンプト: 先頭マーカー `【相談】` (ja) / `[Consult]` (en) の構造化テキスト

選ばれなかった選択肢も完了プロンプトに保持されるため、Claude 側で「消去された方向性」も推論材料にできる。
