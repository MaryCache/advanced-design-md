# VANILLA.md / INTERPRETED.md フォーマット規約

design-extractor が生成する 2 つの成果物（`VANILLA.md` と `INTERPRETED.md`）のフォーマット仕様。
Claude がこれらを生成する前に必ず参照する。

両ファイルとも以下の 7 セクションを **同順** で持ちます。先頭セクションのみ目的別に異なります。

```
1. Meta
2. Colors
3. Typography
4. Spacing
5. Components
6. Animations
7. Constraints
```

---

## ファイルごとの責務

| ファイル | 入力 | 内容 | 補完・推測 |
|---|---|---|---|
| VANILLA.md | `raw/` 配下の DOM / CSS / JS | サイトから機械的に抽出した値（CSS変数・color hex・keyframes・font-family・transition等） | **一切禁止** |
| INTERPRETED.md | `VANILLA.md` のみ | 各要素への命名（en / ja）、tone / effect / strength / weakness、states、good-for / avoid | VANILLA に存在する範囲内でのみ可 |

INTERPRETED は VANILLA を **唯一の入力** とする。VANILLA に存在しない値（hex・フォント名・アニメ名）は INTERPRETED に書けません。

---

# Part A. VANILLA.md フォーマット

## A-1. セクション記述形式

### Meta

```markdown
## Meta
- **Site**: サイト名
- **URL**: https://...
- **Extracted**: YYYY-MM-DD HH:MM
```

### Colors

```markdown
## Colors
- **Primary**: #RRGGBB — CSS 変数名 / 用途 / 出現箇所
- **Secondary**: #RRGGBB — ...
- **Background**: #RRGGBB
- **Text**: #RRGGBB
```

カラー値は必ず `#RRGGBB` 形式。`rgb()`・`hsl()`・変数名のみの記述は禁止。
JS で動的に設定される場合は `[動的: JS制御]` と明記。

### Typography

```markdown
## Typography
- **Font Family**: フォント名（fallback含む）
- **Base Size**: NNpx または NNrem
- **Scale**: h1=NNpx, h2=NNpx, body=NNpx, small=NNpx
- **Weight**: regular=400, bold=700 など
- **Line Height**: N.N
```

VANILLA では「サイトに記述されている font-family の値」をそのまま転記する。
推測でフォント候補を補わない。

### Spacing

```markdown
## Spacing
- **Base Unit**: Npx
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px など
- **Container Max Width**: NNNNpx
- **Grid**: N columns, gap=NNpx
```

### Components

```markdown
## Components
### Button
- Background: #RRGGBB
- Text: #RRGGBB
- Border Radius: Npx
- Padding: NNpx NNpx

### Card
- Background: #RRGGBB
- Border: Npx solid #RRGGBB
- Border Radius: Npx
- Shadow: ...
```

主要コンポーネントのみ記述。存在しない場合は `[未取得]`。

### Animations（拡張セクション）

```markdown
## Animations

### Libraries
- GSAP 3.x（推定）
- ScrollTrigger（GSAPプラグイン）

### Keyframes
- `fade-in`: opacity 0→1, duration 0.6s, ease out
- `slide-up`: translateY 40px→0, duration 0.8s, ease out

### Transitions
- Hover: opacity 0.2s ease, transform 0.3s ease
- Page: fade 0.4s ease-in-out

### Scroll Behaviors
- `.section`: IntersectionObserver, threshold 0.3, class toggle `.is-visible`
- ScrollTrigger: trigger `.hero`, start "top center", animation fade-in

### Hover / Interaction
- `.card`: scale 1.02 on hover, duration 0.2s
- `.nav-link`: color change + underline on hover
```

**サブセクション 5 つのうち 2 つ以上** が空でないこと（成功条件）。
取れなかった項目は `[未取得]` または `[未取得: requires_scroll]` 等の理由付きで明記。

### Constraints

```markdown
## Constraints
- ドロップシャドウ禁止（代わりに 1px border）
- フォントは最大 2 種類まで
- アニメーション速度は 0.2s〜1.0s の範囲内
```

サイトから読み取れる制約の痕跡（CSS 設定の傾向・コメント・命名規則）を記述。
取得できない場合は `[未取得]`。

---

## A-2. 値の記述ルール（VANILLA 共通）

| 種別 | 形式 | 禁止 |
|------|------|------|
| カラー | `#RRGGBB` | `rgb()`, `hsl()`, 変数名のみ |
| サイズ | `px` または `rem` | `em` 単独, `%` 単独 |
| duration | `ms` または `s` | 単位なし |
| 不明な値 | `[未取得]` | 推測での補完、空欄 |
| JS 動的値 | `[動的: JS制御]` | 推測での補完 |

---

## A-3. VANILLA.md 出力前チェックリスト

- [ ] 必須見出し 7 つが全て存在するか（Meta / Colors / Typography / Spacing / Components / Animations / Constraints）
- [ ] Animations の 5 サブセクションのうち 2 つ以上が空でないか
- [ ] 空欄がないか（未取得は `[未取得]` または `[未取得: <理由>]` で明記）
- [ ] 推測補完していないか（ソースに存在しない値を書いていないか）
- [ ] カラー値が `#RRGGBB` 形式か
- [ ] duration が `ms` または `s` で統一されているか
- [ ] セクション順序が規約通りか（Meta → Colors → … → Constraints）

---

# Part B. INTERPRETED.md フォーマット

## B-1. INTERPRETED の追加要素

INTERPRETED.md は VANILLA に対して **以下のメタ情報のみ** を付与します。
これらはサイトから直接抽出できない「解釈」に該当するため、INTERPRETED に閉じ込められています。

| 追加要素 | 役割 | 必須？ |
|---|---|---|
| `name` | 英語識別子（kebab-case）。CSS クラス名と共通 | 必須 |
| `ja` | 日本語名（人間用補助） | 必須 |
| `source` | VANILLA からの引用（CSS セレクタ → クラス遷移など） | 必須 |
| `tone` | 印象・感覚（リスト形式） | 必須（アニメ・色） |
| `effect` | 機能（何をするか） | 必須（アニメ） |
| `strength` / `weakness` | 採用判断材料 | 推奨 |
| `good-for` / `avoid` | 推奨用途・回避用途（`parts-naming.md` 確定部品名のみ） | 推奨 |
| `states` | コンポーネントの状態別アニメ（enter / hover / open / close など） | 必須（コンポーネント） |
| `role` | 色やフォントの役割（Accent / Body 等） | 必須（色・フォント） |

---

## B-2. セクション記述形式

### Meta

VANILLA と同じ。`Site / URL / Extracted` を保持。
INTERPRETED は VANILLA から派生したものであることを明示するため、`- **Source**: VANILLA.md` を 1 行追加してもよい。

```markdown
## Meta
- **Site**: サイト名
- **URL**: https://...
- **Extracted**: YYYY-MM-DD HH:MM
- **Source**: VANILLA.md
```

### Colors

VANILLA の色値に意味のある名前を付与する。

```yaml
- name: cursed-blue
  ja: 呪力ブルー
  value: "#2da6e3"        # VANILLA の値をそのまま使う
  role: インタラクション全般のアクセント
  tone: [神秘的, 知的, 静謐]
  good-for:
    concrete: [cta-button, nav-link]   # parts-naming.md の確定部品名のみ
    abstract: []                        # 命名体系外の用途は abstract 側
  avoid:
    concrete: []
    abstract: []
```

### Typography

VANILLA のフォント名に role と tone を付与する。

```yaml
- name: serif-headline
  ja: 見出しセリフ
  font: "Cormorant"        # VANILLA の値をそのまま使う
  role: heading-en
  weight: 500
  tone: [editorial, 細身, luxury]
```

### Spacing

VANILLA の数値をそのまま流用しつつ、スケール意図を 1 行で添える。

```markdown
## Spacing
- **Base Unit**: 8px (= 8px グリッドの基準)
- **Scale**: 8 / 16 / 24 / 32 / 48 / 64 / 96px (倍数階段)
- **Container Max Width**: 1200px
- **Grid**: 12 columns, gap=24px
```

### Components

各コンポーネントには `states` を必ず付与する。

```yaml
- name: character-card
  ja: キャラクターカード
  source: ".character .card"
  tone: [静的な存在感, 並列的な提示]
  strength: グリッドでの一覧表示に向く
  weakness: 高さ固定のため縦長コンテンツには不向き
  states:
    enter:
      preferred: fade-blur-in       # 第一選択（VANILLA に存在する animation）
      trigger: scroll-reveal        # 発火トリガー（VANILLA から読める場合のみ）
      alternative: rise-in          # 代替（VANILLA に存在する場合のみ書く）
    hover:
      preferred: ghost-fade
```

**states のルール**

- 状態名の例: `enter` / `hover` / `hover-on` / `hover-off` / `open` / `close` / `active`
- `preferred` は必須。`alternative` と `trigger` は VANILLA に根拠がある場合のみ
- VANILLA に該当 animation が存在しない場合は当該 state を省略する（捏造禁止）

### Animations

VANILLA の各 keyframe / transition に解釈を付与する。

```yaml
- name: fade-blur-in
  ja: フェードブラーイン
  source: ".ani → .ani.active"            # VANILLA の source をそのまま引用
  spec: filter blur(15px)→0 + opacity 0→1, 1.5s ease  # VANILLA の値そのまま
  tone: [霧が晴れる, 静かな浮かび上がり]
  effect: スクロール入場時のコンテンツ出現演出
  strength: ファーストビューの印象形成に向く
  weakness: 繰り返し使うと間延びする
  good-for:
    concrete: [hero-title, section-heading]
    abstract: []
  avoid:
    concrete: [nav-link]
    abstract: []
```

**good-for / avoid のルール**

- `concrete` には `references/parts-naming.md` の確定済み部品名のみを記述
- 命名体系外の用語は `abstract` 側または `weakness` / `note` 等の自由文フィールドへ
- 該当なしの場合は `[]` と書く

### Constraints

VANILLA の Constraints をそのまま継承し、解釈側の補足のみ追記する。

```markdown
## Constraints
- アニメ duration は 0.8s〜2.0s（VANILLA の keyframes 観測値の中央値）
  - 解釈: mood=luxury / cinematic 親和の slow tempo
- 使用色は 4 色以内（VANILLA Colors の取得色数）
  - 解釈: minimal / 高級感の維持
```

---

## B-3. INTERPRETED.md 出力前チェックリスト

- [ ] 全ての値が VANILLA（`{SITE_DIR}/VANILLA.md`）に存在するか
- [ ] 新しい色値・数値・フォント名・アニメ名を追加していないか
- [ ] `name` は英語の kebab-case か
- [ ] `ja` は日本語で併記されているか
- [ ] VANILLA に記載のないアニメーションを追加していないか
- [ ] `good-for` / `avoid` の `concrete` が `references/parts-naming.md` の確定部品名で構成されているか
- [ ] `tone` がリスト形式になっているか
- [ ] アニメーションの `effect` フィールドが全項目に存在するか
- [ ] コンポーネントの `states` が最低 1 つ存在するか

---

# Part C. 共通ルール

## C-0. raw/ の読み込み順序

VANILLA.md 生成前に `raw/` 配下のソースを読み込む際、`styles-manifest.json` の `order` フィールドを **昇順** で参照してください。`order` は `fetch.js` が CSS の取得順（インライン → 後続のネットワーク取得順）を保持するために付与しています。

- インライン CSS は `order=1`、以降のリクエスト到着順に `order=2, 3, …` と振られます
- ファイル名は `001-inline.css` / `002-https___...css` のようにゼロパディングされており、`ls` 順と `order` 昇順は一致します
- カスケードの解釈に影響するため、通常はこの順序を尊重します（後勝ちで上書きされる宣言を見落とさないため）

JS は順序保証されません。`scripts/` 配下は内容を見て独立に解析します。

---

## C-1. セクション順序

7 セクションは Meta → Colors → Typography → Spacing → Components → Animations → Constraints の順に記述します。
省略不可。順序の入れ替えも禁止。

## C-2. design-creator との互換性

design-creator が生成する `DESIGN.md` も同じ 7 セクション構成です（先頭が `Intent` になる点のみ異なる）。
INTERPRETED.md の `name` / `ja` / `tone` / `states` 等は、design-creator Step 9 の補助抽出経路で `DESIGN.md` に直接採用される可能性があります。命名は確実に `parts-naming.md` の体系に揃えてください。

## C-3. 禁止事項（横断）

- VANILLA / INTERPRETED ともに、参照ソースに存在しない値を書かない
- セクション順序の変更
- 必須見出しの省略
- 値の記述形式の混在（hex・単位）
