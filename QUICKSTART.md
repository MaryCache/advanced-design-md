# かんたんせつめいしょ

> しっかりした README は[こちら](README.md)。ここは「とりあえず動かしたい人」向けの軽量版です。

---

## これ、何ができるの？

ふたつあります。

1. **他社サイトを Claude にコピらせる(分析する)** — URL を渡すと、色・フォント・アニメ等を読み取って仕様書(`.md`)にしてくれる
2. **クライアントのふわっとした要望を仕様書にする** — クイズに答えるだけで、Claude が DESIGN.md を書いてくれる

仕事で「Apple っぽいやつで」「もっと信頼感ある感じで」って言われがちな人向け。

---

## ざっくり仕組み

```
[A] URL ─→ design-extractor ─→ VANILLA.md + INTERPRETED.md
                                  │            │
                                  生データ      Claude が意味を解釈

[B] 要望 ─→ クイズ回答 ─→ design-creator ─→ DESIGN.md
```

A と B は別々に使えるし、B の途中で「これ Apple 風で」と書いたら裏で A を呼んでくれたりもします。

---

## 動かすまで(5 ステップ)

### ① Claude Code を入れる

Claude を CLI から触れるようにするツールです。

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

> **`-g` 怖い人へ**: グローバル install です。容量は数十 MB 程度。消したくなったら `npm uninstall -g @anthropic-ai/claude-code` でクリーンに消せます。

初回起動で Anthropic アカウントログインを求められます。Pro / Max プランか API キー(従量課金)が必要です。

### ② このリポジトリを取ってくる

```bash
git clone <this-repo-url> ~/design-workflow
```

クローン先は好きな場所で OK。以降 `~/design-workflow` 前提で書きます。

### ③ Claude Code にスキルを教える

```bash
mkdir -p ~/.claude/skills
ln -s ~/design-workflow/skills/design-extractor ~/.claude/skills/design-extractor
ln -s ~/design-workflow/skills/design-creator   ~/.claude/skills/design-creator
```

> **`ln -s` ってなに**: ショートカット作成です。`~/.claude/skills/` の中に「本体は `~/design-workflow/skills/...` ですよ」というラベルだけ置く感じ。失敗したら `rm ~/.claude/skills/design-extractor` で消すだけ、本体は無事です。

### ④ Claude を起動して一言投げる

```bash
cd ~/design-workflow
claude
```

そして適当に話しかけます:

```
このサイト抽出して https://www.apple.com
```

このとき Claude が:

- 「初回セットアップしますね」と言って `npm install` + Playwright の chromium 入れ(初回のみ・3〜5 分)
- 「`Do you want to proceed?` 確認多すぎませんか? 設定マージしましょうか?」と聞いてくる

両方とも `yes` でいい。怖くない。

### ⑤ スラグを聞かれるので答える

```
Claude: 保存フォルダ名(スラグ)を教えてください。例: apple-home
ユーザー: apple-home
```

3 分くらい待つと `~/design-library/sites/apple-home/` に成果物が出てきます。

---

## 初めての一回(2 シナリオ)

### シナリオ A: Apple のサイトをコピってくる

```
ユーザー: https://www.apple.com を抽出してください
Claude:   スラグは?
ユーザー: apple-home
Claude:   (3 分くらい待つ)
          ✓ apple-home/VANILLA.md 生成
          ✓ apple-home/INTERPRETED.md 生成
```

### シナリオ B: クライアント案件をクイズで起こす

```
ユーザー: 化粧品ブランドのコーポレート作りたい
Claude:   ボリュームは? quick(5問) / standard(10問) / deep(20問)
ユーザー: standard
Claude:   ブラウザでこれ開いて回答してください → http://localhost:8765/quiz-xxx.html
```

ブラウザでぽちぽち答えて、終わったら **完了プロンプト** をコピーして Claude に貼り付けます。

> **コピー範囲**: 「完了 → プロンプト生成」を押すと、画面下部に `# Design Brief — 2026-...` から始まる長いテキストが表示されます。**この `# Design Brief` から末尾まで全部** を選択してコピー → Claude に貼り付けてください（クリップボードへの自動コピーも実行されますが、念のため目視確認できます）。

```
Claude:   (1〜2 分待つ)
          ✓ ~/.claude/outbox/DESIGN-cosmetics.md 生成
```

---

## 出てきた用語、たぶん意味わかんないやつ

| 用語 | ざっくり |
|---|---|
| **VANILLA.md** | サイトから取ってきた **生データ**(色値・CSS変数・keyframes をそのまま) |
| **INTERPRETED.md** | VANILLA を Claude が **読み解いて意味づけ** したもの。「この青はアクセント」みたいな解釈付き |
| **DESIGN.md** | クイズから生成された **新規仕様書**。Intent(意図)から始まる |
| **lexicon** | スキルが知ってる **語彙の辞書**(色・フォント・アニメ・パーツ)。ここに無い言葉は勝手に作らない |
| **patterns** | 「ダーク × LP ならこの組み合わせが多い」みたいな **経験則メモ** |
| **Intent / Use / Mood** | 仕様書の冒頭。何のサイトか / どんな雰囲気か |
| **`[要確認]`** | Claude が **辞書から選びきれなかったとこ**。バグじゃない。「ここは人間が判断してね」のマーカー |

### `[要確認]` が多くて不安なんだけど?

そういう仕様です。Claude は嘘をつかないように「lexicon に無い値は書かない」ルールで動いてます。`[要確認]` が出ているのは「分かりませんでした」じゃなくて「**勝手に決めなかった**」の意味。

ボリュームが quick だと半分くらい残るのが普通、standard なら 30% 以下が目安です。

### 「Apple 風」って書いたら何が起きるの?

クイズの自由入力に固有名詞や lexicon 外の語が混じると、Claude が:

```
「Apple 風」のニュアンスは lexicon だけだと表現が難しいです。
参考 URL あれば抽出できますがどうしますか? (yes / no)
```

と聞いてきます。`yes` なら裏で **シナリオ A の抽出が走って**、結果を踏まえて DESIGN.md を作ってくれます。

---

## ファイルどこに何が出るの?

| 種類 | 場所 |
|---|---|
| Claude Code 設定 | `~/.claude/settings.json` |
| スキル登録(symlink) | `~/.claude/skills/design-extractor` `~/.claude/skills/design-creator` |
| 抽出の出力(URL → md) | `~/design-library/sites/{スラグ}/`(環境変数で変更可) |
| クイズと DESIGN.md | `~/.claude/outbox/`(環境変数で変更可) |
| スキル本体 | `~/design-workflow/skills/` |

---

## つまったら

| なる | こうする |
|---|---|
| `claude` 打っても無反応 | `claude --version` で入ってるか確認。出ない → ① のインストールやり直し |
| Claude がスキル使ってくれない | `ls ~/.claude/skills/` で 2 つあるか確認。Claude を Ctrl+C で抜けて `claude` で再起動 |
| `Do you want to proceed?` がずっと出る | Claude に「設定マージして」と頼む。または README の Step 5 を手で |
| ブラウザでクイズが `ERR_FILE_NOT_FOUND` | スキルが `python3 -m http.server` 立てるはず。`http://localhost:8765/...` の URL で開いてるか確認 |
| 抽出が 5 分経っても終わらない | サイトの JS 重め可能性。Ctrl+C で止めて別 URL で試す |
| zsh で環境変数追記 | `~/.zshrc` に追記、`source ~/.zshrc` で反映 |
| bash で環境変数追記 | `~/.bashrc` に追記、`source ~/.bashrc` で反映 |
| どっち使ってるかわからない | `echo $SHELL` で確認 |

---

## 全部消したくなったら

```bash
# スキル登録解除
rm ~/.claude/skills/design-extractor
rm ~/.claude/skills/design-creator

# リポジトリ削除
rm -rf ~/design-workflow

# Claude Code 自体を消す
npm uninstall -g @anthropic-ai/claude-code
```

`~/design-library/` と `~/.claude/outbox/` の中身は手動で消してください(成果物が入ってるので残したい人もいる想定で自動削除はしない)。

---

## ネット要る?

| スキル | ネット |
|---|---|
| design-extractor | **必要**(URL を取得するため) |
| design-creator | クイズと回答パースだけならオフラインで動く。Claude 本体は API 通信するので結局必要 |

> **セキュリティ補足**: design-extractor は Playwright が対象ページ内で `fetch` を呼び出します。**業務環境の認証保護ページや社内ツールを抽出対象にしないでください**。公開サイト専用です。詳細は [README.md のセキュリティに関する注意](README.md#セキュリティに関する注意) 参照。

---

## だいたい何分かかる?

| 操作 | 時間 |
|---|---|
| 初回セットアップ全体(① 〜 ③) | 5〜10 分 |
| 初回の Playwright インストール | 3〜5 分(キャッシュ後は 1 秒) |
| 1 サイトの抽出 | 1〜3 分(JS 重いと 5 分超え) |
| クイズ standard を埋める | 10〜15 分 |
| DESIGN.md 生成 | 1〜2 分 |

API コストは Claude Code のプランや使用量によります。詳細は [Anthropic 公式](https://www.anthropic.com/pricing) を参照。

---

## もっと知りたくなったら

- きっちりした仕様: [README.md](README.md)
- 英語版: [README.en.md](README.en.md)
- スキルの中身: `skills/design-extractor/SKILL.md` / `skills/design-creator/SKILL.md`

困ったら、Claude 本人に「README を見て手伝って」と聞くのが一番早いです。
