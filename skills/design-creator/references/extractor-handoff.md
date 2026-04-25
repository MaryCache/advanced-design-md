# extractor-handoff

design-creator が「lexicon 内で意図が満たせない」と判断したとき、design-extractor へ参照サイト抽出を引き渡すフローの詳細（SKILL.md Step 9 から参照される）。
SKILL.md 本体は判定条件と概略のみ。具体的なオファー文・URL 候補選定・暴走防止ルールはここに置く。

---

## オファー形式

発動条件（SKILL.md Step 9 参照）に該当したら、ユーザーに以下を提示する。

```
{検出された理由} に対して lexicon 内で完全一致する候補がない。
参考サイトを抽出して library を拡張する選択肢があるけど、どうする？

候補:
1. {候補 URL 1}
   - 抽出すると拾えそうな要素: {例: 紫青+ゴールドの神秘パレット、粒子装飾アニメ}
2. {候補 URL 2}
   - 抽出すると拾えそうな要素: {...}
3. このまま進める（lexicon 内の代替で生成、不足部分は [要確認] で残す）

（design-extractor 起動には Playwright 取得で 30 秒〜1 分かかる）
```

「検出された理由」は発動条件（固有名詞言及 / mood 衝突 / `[要確認]` 多発 / lexicon カバー外シグナル）のうち、該当した条件を 1 行で具体化する。
例: 「特定ゲームタイトル風と user が言及（固有名詞）」「中明度＋神秘＝lexicon の dark/mystic パレットと衝突」

---

## URL 候補の選び方

### 優先順位

1. **ユーザーの言及した固有名詞があれば、その公式サイトを最優先**
   - 例: ゲームタイトル名 → そのタイトルのキャラクターサイトや公式トップ
   - 例: SaaS プロダクト名 → そのプロダクトのトップページ
   - URL がはっきり分からないときは AI 記憶で推測せず、user に直接 URL を聞く

2. **言及なし（mood 衝突のみ）の場合**
   - lexicon に存在する近接パレットを採用したサイト 2-3 個を提案
   - 例: 「中明度+神秘」が満たせない → 中明度ベースで神秘性のあるサイト

3. **不確実な場合は捏造せず聞く**
   - 「URL 教えてもらえる？」と聞く
   - **AI の記憶ベースで URL を捏造しない**（404 や別サイトを引いて無駄足になる）

### 1 オファーあたり最大 2 候補 + 「進める」選択肢

候補が多すぎると user の判断負荷が増す。2 つに絞ってどちらかを選ばせる。

---

## ユーザーが OK した場合の挙動

1. design-extractor を呼び出し
   - URL とスラグをユーザーから受け取る
   - スラグは kebab-case で短く（例: `acme-game-character`、`nova-corp-top`）
2. 抽出完了を待つ
   - `<output base>/{slug}/INTERPRETED.md` の存在確認
   - ERROR が stderr に出たら user に通知して中断
3. design-creator の Step 7 に**復帰**
   - lexicon に加えて INTERPRETED.md を参照ソースに追加
   - 再度 lexicon 照合を実行
4. 抽出結果に存在する色値・フォント・アニメ名は DESIGN.md に**直接採用してよい**（コア原則 #2 の例外）
   - lexicon 外でも、抽出済みデータならソース付きで使える
   - DESIGN.md のコメントで `<!-- source: extracted from {slug}/INTERPRETED.md -->` を必ず残す
   - lexicon にも INTERPRETED.md にも該当値がない場合は通常通り `[要確認]` で残す

### 部品名（Components）の照合ルール

INTERPRETED.md は `parts-naming.md`（design-extractor 管轄）の確定部品名で `good-for` / `avoid` を構成します。一方、DESIGN.md の Components は `lexicon/parts.md`（design-creator 管轄）の部品名のみが許可されます。両者は概ね一致していますが、片方にしかない名前（例: design-extractor 側の `form-input` / `modal-overlay`）も存在します。

復帰後に INTERPRETED.md 由来の部品名を DESIGN.md の Components に持ち込む場合、以下の手順で必ず照合してください。

1. INTERPRETED.md の `good-for.concrete` に列挙された部品名を抽出
2. 各部品名を `lexicon/parts.md` のパーツ一覧と突き合わせ
3. **lexicon/parts.md に存在する** → そのまま採用。`<!-- source: extracted from ... -->` を添える
4. **lexicon/parts.md に存在しない** → `[要確認: 新規パーツ {name}]` として残す。Components セクションに追加する場合も `ja` 名・推奨 scope は INTERPRETED.md から引用しつつ `[要確認]` マーカーを併記
5. 命名衝突（同名で意味が異なる）が疑われる場合 → DESIGN.md コメントに `<!-- name-conflict: see {slug}/INTERPRETED.md -->` を残し、ユーザー確認待ちにする

これにより、design-extractor の `parts-naming.md` と design-creator の `lexicon/parts.md` が二重管理されている状態でも、DESIGN.md の出力名前空間は `lexicon/parts.md` 側に正規化されます。

---

## ユーザーが NO した場合の挙動

- そのまま Step 10 へ進む
- lexicon 内で最善を尽くし、満たせない部分は `[要確認]` で正直に残す
- 例: lavender-black は dark だが user は中明度を希望 → reason に「神秘性優先で lavender-black 採用、中明度希望は accent (#c4c1f1) で擬似補完。本格的な中明度+神秘は [要確認]」と書く

---

## 暴走防止ルール

### 抽出は 1 セッション 1 回まで

1 サイト抽出してまだ不足を感じても、design-creator から再オファーはしない。
ユーザーが自分から `/design-extract` を呼ぶ形に任せる。

### 抽出した結果でも満たされない場合

- mood が完全に満たされなくても、無理に lexicon を拡張しすぎない
- `[要確認]` で正直に残し、user に判断を委ねる

### 発動を抑制すべきケース

以下の場合は条件に該当しても発動しない:

- ユーザーが Quick (5問) を選び、自由入力が空 — 情報不足のまま勝手に拡張しない
- ユーザーが既に「lexicon 内で進めて」と明示した
- すでにこのセッションで 1 回抽出オファーを実施済み

---

## 設計意図

- design-creator は本来「lexicon 内で完結する」のが第一原則
- だが lexicon は有限で、固有ブランドや新規スタイルには対応できない
- そこで**例外的な救済路**として design-extractor を呼ぶ
- 「lexicon の妥協」と「抽出による拡張」のどちらを選ぶかは user の判断に委ねる
- AI が勝手にサイト選定して走らせると user の意図とズレる → 必ず提示・確認を挟む
