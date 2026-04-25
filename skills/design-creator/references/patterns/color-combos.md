# patterns: color-combos

mood × use の組み合わせで**実務的に頻出するパレット選定の経験則**。
lexicon が「何が使えるか（個別パレットの定義）」だとすれば、ここは「何と何が一緒に使われがちか」を扱う。

design-creator の Step 8 で参照される。lexicon 第一候補が複数の mood に当てはまって決め切れないとき、ここの組み合わせ傾向で**第一候補を上書き**できる。

---

## ダーク × ファンタジー / 神秘性

bg は **#0e〜#22 の deep navy / deep purple / void black** が定番。
そこに accent として **淡ラベンダー (#b〜#d)** または **dusty pink (#a〜#d)** を載せて温度を加える構図が頻出。
sub-accent には **dusty gold / bronze (#a〜#d 系)** を差して luxury 感を底上げするのが定石。

→ lexicon 内では `night-sky-gradient` / `lavender-black` / `purple-gold` が該当。
→ 「神秘性」「特別感」「ファンタジーゲーム公式」のキーワードが来たらこの並びを優先。

---

## ダーク × エディトリアル / 高級

bg は **#19〜#21 の charcoal / warm black**、accent に **オフホワイト〜パール (#e〜#f)**、
ハイライトに **gold (#a〜#d)** または **wine red (#5〜#7)** を限定的に使う構図。
派手な彩度は避け、tracking の利いた serif 見出しと組ませる。

→ lexicon 内では `gorgeous-black-gold-red` / `monochrome-urban` / `blue-gold-luxury` が該当。
→ 「ブランド」「ラグジュアリー」「editorial」「ファッション EC」のキーワードで優先。

---

## ライト × ミニマル / コーポレート

bg は **#f〜#f5 のオフホワイト〜pearl**、primary に **gray-cool (#d〜#e)**、
accent は **deep navy / charcoal (#0〜#3)** か **single brand color** を限定的に。
彩度の高い色は使わず、コントラストとタイポでヒエラルキーを作る。

→ lexicon 内では `white-pearl` / `monochrome-urban`（反転運用）/ `elegant-silver-navy` が該当。
→ 「信頼感」「落ち着き」「BtoB」「ミニマル」のキーワードで優先。

---

## 中明度 × 神秘 / 多色

中明度 + 多色 + 神秘性は**完全一致するパレットが lexicon に少ない**領域。
妥協ルートとしては:
- bg を中明度寄りの **#7〜#a の muted blue / dusty purple** にする
- accent に **gold / pink / pale lavender** の 2 色を載せて多色感を作る
- ただし lexicon 内では完全カバー困難 → Step 9 で参照サイト抽出を提案する候補

→ lexicon の `luxury-dusty-blue` / `ash-gray-pink` / `pearl-pink` が近接候補だが、神秘性は弱い。
→ ここに該当した場合、design-creator は `[要確認]` か Step 9 オファーを検討する。

---

## ビビッド × エネルギー / スポーティ

bg は **#1〜#2 の deep navy / charcoal**、accent に **オレンジ (#d〜#f) / イエロー (#f) / マゼンタ (#e〜#f)** から 1 色。
コントラスト比 4.5 以上を取り、duration 0.2s〜0.5s の素早いアニメと組ませる。

→ lexicon 内では `orange-black` / `chrome-yellow-bluegray` / `vivid-pink-navy` が該当。
→ 「LP」「スポーツ」「イベント告知」「若年層」のキーワードで優先。

---

## ナチュラル × オーガニック

bg は **#e〜#f5 の warm white / off-cream**、primary に **柔らかな緑 (#5〜#7)**、accent に **earth tone (#a〜#c)**。
過剰な彩度は避け、自然光を感じさせる柔らかいグラデを背景に潜ませる構図。

→ lexicon 内では `botanical-green` / `natural-green` / `beige-khaki` が該当。
→ 「エコ」「コスメ」「ウェルネス」「カフェ」のキーワードで優先。

---

## 和風 / ジャパニーズ × ドラマ

bg は **#0〜#2 の墨 / 漆黒**、accent に **金 (#c〜#e)** と **朱 / 赤 (#a〜#c)** の 2 色。
色数を絞り、明朝の太さで重厚感を作る。

→ lexicon 内では `gorgeous-black-gold-red` / `red-white-contrast`（反転運用）/ `classic-green-beige` が該当。
→ 「和風」「アニメ」「ドラマ」「重厚」のキーワードで優先。

---

## 注意事項

- ここに書かれた組み合わせは**経験則**であり、lexicon の値（hex / slug）はそのまま流用すること
- 経験則と lexicon が衝突した場合は **lexicon 優先**（記載 hex の正確性が崩れるため）
- 経験則にない組み合わせを user が要求した場合 → そのまま `[要確認]` で残す。経験則を**捏造して埋めない**
