# prompt-format

design-creator が受け取る 2 種類の入力プロンプトのフォーマット定義。
quiz.html が生成するため、ここの仕様を変更したら quiz.html 側も同期させる必要がある。

---

## A. 個別設問の相談プロンプト（クイズ途中で届く）

quiz.html の各設問にある「AI に相談 / Consult AI」ボタンが生成する。クイズに戻る前提なので**短く返す**。

### ja 出力

```
【相談】
Q: {prompt(JA)}
選択肢:
  a) {label A}
  b) {label B}
  c) {label C}
  d) {label D}
  e) その他（自由入力）

自分で決められないから相談したい。
```

### en 出力

```
[Consult]
Q: {prompt(EN)}
Options:
  a) {label A}
  b) {label B}
  c) {label C}
  d) {label D}
  e) Other (free input)

I can't decide on this one — let's discuss.
```

### 判別マーカー

| 言語 | 先頭行 |
|---|---|
| ja | `【相談】` |
| en | `[Consult]` |

設問 ID は出力に含まれない。設問本文（`Q:` 行）と選択肢から内容を読み取る。

### 返し方

- 選択肢 a〜d のうち**推奨を 1 つだけ示す + 理由 1 行**
- 推奨が決められない場合 → 「e（自由入力）+ こう書くといい」を提示
- 末尾に「クイズに戻ってこの回答入れて、続きやって」と促す

---

## B. 完了プロンプト（クイズ完走後）

quiz.html 末尾の「完了」ボタンが生成。クリップボードにコピーされ、ユーザーが Claude に貼り付ける。
**先頭行は両言語共通で `# Design Brief — {timestamp}`**。これが種別 B の判別マーカー。

### ja 出力

```
# Design Brief — {timestamp}

## 設定
- Volume: {quick|standard|deep}
- Language: ja

## 回答ログ

### Q-intent-01: このサイトは何のためのもの？
- 提示された選択肢:
  - A. コーポレート（企業情報・ブランド発信）
  - B. LP・プロモーション（製品/イベント告知）
  - C. EC・販売
  - D. ポートフォリオ・作品集
  - E. その他（自由入力）
- 選択: A
- （E 選択時はここに自由入力）

### Q-intent-02: ターゲット層は？
- ...

(以下 volume 分繰り返し)

## ユーザー追記
{自由記述欄に書かれたもの}
```

### en 出力（構造は同じ、見出しが英語）

```
# Design Brief — {timestamp}

## Settings
- Volume: {quick|standard|deep}
- Language: en

## Answer log

### Q-intent-01: {prompt(EN)}
- Options shown:
  - A. {label A}
  - ...
- Selected: A

## User notes
{...}
```

### 言語別見出し対応表

パース時はこの対応で読み替える。

| 役割 | ja | en |
|---|---|---|
| 設定ブロック | `## 設定` | `## Settings` |
| 回答ログブロック | `## 回答ログ` | `## Answer log` |
| 提示選択肢ラベル | `提示された選択肢:` | `Options shown:` |
| 選択ラベル | `選択:` | `Selected:` |
| 末尾自由記述 | `## ユーザー追記` | `## User notes` |

設問 ID（`### Q-{layer}-{nn}`）は両言語共通。Volume / Language の値も両言語共通の英語キー。

### 設計意図

- **全選択肢を残す** — 選ばれなかった選択肢も AI の推論材料にする（「dark を選んでいるが light も提示されたうえで選んでいる」が読み取れる）
- **生の選択値（A/B/C/D/E）と自由入力を分離** — 解釈の混入を防ぐため
- **タイムスタンプ** — 同じ user の複数 brief を区別

### パース時の抽出フィールド

| フィールド | 出処（ja / en） |
|---|---|
| volume / language | `## 設定` / `## Settings` ブロック |
| 各設問の選択 | `### Q-{layer}-{nn}` 直下の `- 選択:` / `- Selected:` 行 |
| 設問ごとの自由入力 | `### Q-{layer}-{nn}` 内の選択行直下の追記 |
| 末尾自由記述 | `## ユーザー追記` / `## User notes` ブロック |

各選択を `references/question-bank.md` の `signal.{field, value}` でルックアップして、
DESIGN.md の各フィールドに**生の値**として一旦集約する。
