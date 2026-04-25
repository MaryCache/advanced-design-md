# lexicon: colors

design-creator の配色辞書。ユーザー mood と signal から具体パレットを 1 つに決め打つために使う。
**この辞書にない色を新規創作してはならない**（lexicon に存在しない色は DESIGN.md に書けない）。

> **関連**: 単独パレットの選定はここ。**複数パレットが mood に当てはまって決め切れない / accent と sub-accent の組み合わせ**で迷う場合は `../patterns/color-combos.md`（経験則）を参照。
> どちらでも該当が見つからない場合のみ Step 9 の補助抽出オファーへ。

---

## 構造

各パレットは以下のフィールドを持つ。

| field | 説明 |
|---|---|
| slug | パレット識別子（kebab-case） |
| ja | 日本語名 |
| bg | 背景色 hex |
| primary | 主役色 hex（bg と同系統で深さを出す層） |
| accent | アクセント色 hex |
| sub-accent | 差し色 hex（任意） |
| mood | このパレットが満たす mood タグ群 |
| best-for | use との親和（lp / corporate / portfolio / ec / game） |

---

## ダーク・シック系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| gorgeous-black-gold-red | ゴージャス黒金赤 | #19171b | #2a2624 | #d29f22 | #b3261e | dark, luxury, gothic | game, corporate |
| deep-navy-blue | 深海濃紺 | #032c4f | #0f427e | #f0f4f8 | — | dark, cool, mysterious | corporate, portfolio |
| night-sky-gradient | 夜空グラデ | #09172c | #293355 | #af6681 | #c4a28b | dark, romantic, night | corporate, lp |
| midnight-blue-yellow | ミッドナイトブルー×イエロー | #111721 | #1d2435 | #fde235 | — | dark, contrast, sporty | lp, game |
| lavender-black | まどろみラベンダー黒 | #201f28 | #2c2b3a | #c4c1f1 | — | dark, dreamy, purple | portfolio, lp |
| purple-gold | パープルゴールド | #1f0035 | #350052 | #c7940e | — | dark, royal, gothic | game, lp |
| black-pink-neon | 漆黒ピンクネオン | #0f0f14 | #1a1a22 | #ea2864 | — | dark, vivid, edgy | lp, portfolio |
| adult-black-pink | 大人の黒ピンク | #190f1b | #2a1c2e | #f9a1a9 | — | dark, cute, feminine | corporate, lp |
| deep-wine-red | 深ワインレッド | #210207 | #380511 | #730c1e | — | dark, dramatic, red | corporate, lp |
| monochrome-urban | モノクロ都会 | #1a1d25 | #262931 | #c8d0d1 | — | minimal, urban | corporate, portfolio |
| blue-gold-luxury | ブルーゴールド | #1f4063 | #2d5781 | #a1905a | — | dark, luxury, classic | corporate |
| cool-intellectual-blue | 知的ブルー | #191e2b | #232a3d | #005dd3 | — | dark, intellectual, tech | corporate |
| void-cyan-gold | 虚空シアン金光 | #000000 | #1063af | #2da6e3 | #ece48b | dark, anime, mysterious, jp | lp, game, portfolio |
| abyss-crimson-fire | 深淵朱炎 | #000414 | #9a2f17 | #ffdb92 | #ff4b00 | dark, japanese, dramatic, fire | lp, game |
| void-indigo-pearl | ヴォイドインディゴパール | #08090a | #141516 | #7170ff | #f7f8f8 | dark, tech, modern, premium | corporate, portfolio |
| abyss-gold-mono | 深淵金単色 | #07161f | #07161f | #debb54 | — | dark, fantasy, occult, mysterious | game, lp |

---

## ビビッド・アクセント系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| orange-black | オレンジブラック | #242a3a | #313849 | #df762e | — | vivid, contrast, energetic | lp, game |
| vivid-pink-navy | ビビッドピンク濃紺 | #262363 | #322f78 | #e6527b | — | vivid, cute, pop | lp |
| chrome-yellow-bluegray | クロムイエロー | #29323b | #3a4450 | #ffda3a | — | vivid, industrial, bold | lp, portfolio |
| sporty-green-yellow | スポーティ緑黄 | #fdfdf9 | #f0f0e8 | #1ce03a | #f0d000 | vivid, sporty, fresh | lp, ec |
| vivid-pink-blue | ビビッドピンク青 | #0042a1 | #1a52b3 | #f0558b | — | vivid, contrast, bold | lp |
| red-white-contrast | 紅白 | #ffffff | #f5f5f5 | #d03249 | — | vivid, clean, japanese | corporate, lp |
| vitamin-gradient | ビタミングラデ | #fff39b | #ffeba0 | #b0f5d3 | #f59ec1 | vivid, dreamy, Y2K | lp, portfolio |

---

## ブルー系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| elegant-silver-navy | シルバーネイビー | #003672 | #114a87 | #f7fafd | — | elegant, formal, trust | corporate |
| premium-blue | プレミアム青 | #00033a | #1a1d50 | #d2ab17 | — | dark, premium, dramatic | corporate, lp |
| serene-blue | 清楚な青 | #d3dbec | #c4cee0 | #4a65a9 | — | cool, clean, elegant | corporate, portfolio |
| mint-mist-blue | ミントミスト | #8bc1ca | #a4d0d6 | #8addc2 | — | cool, fresh, calm | lp, portfolio |
| luxury-dusty-blue | くすみブルー高級 | #7d9aae | #93acbf | #d5ac3b | — | elegant, muted, luxury | corporate |
| soft-blue | ふんわり水色 | #c9e9f1 | #b8dee8 | #88a8c8 | — | light, soft, cute | lp, ec |
| clear-blue | 透き通った青 | #e5f4fb | #d3ecf6 | #048db7 | — | light, fresh, summer | lp, portfolio |
| sweet-blue-pink | 水色ピンクグラデ | #daedff | #ffd8eb | #ffc5e1 | #b6c8e0 | light, cute, dreamy | lp |
| frost-teal-rouge | フロストティールルージュ | #edf4f6 | #263940 | #1483a3 | #a44858 | light, cool, editorial, academic | corporate, portfolio |
| electric-blue-pale | エレクトリックブルー | #ffffff | #101c40 | #1942bf | #f0f4ff | light, tech, sci-fi, energetic | lp, portfolio |

---

## グリーン系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| classic-green-beige | クラシック緑ベージュ | #0e4833 | #1a5a44 | #d3c7b7 | — | natural, classic, elegant | corporate, portfolio |
| natural-green | ナチュラル緑 | #eef5f6 | #dde9eb | #619f67 | — | natural, fresh, organic | corporate, ec |
| botanical-green | ボタニカル緑 | #007658 | #008869 | #d6e9e4 | — | botanical, eco, modern | corporate, lp |
| forest-deep-green | 静かな森の深緑 | #022b22 | #053a2e | #569578 | — | dark, natural, mysterious | portfolio, game |
| fresh-green | 透明感グリーン | #e0e4e6 | #d0d6d8 | #77a49f | — | light, fresh, elegant | corporate, portfolio |

---

## ピンク・ラベンダー系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| ash-gray-pink | アッシュグレーピンク | #abc3cd | #b8cdd5 | #e36aa1 | — | cool, cute, balanced | lp, ec |
| dusty-pink | くすみピンク | #ffdde7 | #f5cdda | #de989e | — | soft, elegant, muted | corporate, ec |
| deep-pink | ふんわり濃いめピンク | #ffcfcc | #f5b8b3 | #e1426d | — | cute, vivid, girly | lp, ec |
| pink-green-pastel | ピンクグリーンパステル | #e1e3e5 | #d3d6d9 | #dfbcc2 | #b8d4be | soft, natural, calm | lp, portfolio |
| dreamy-pink | ゆめかわ淡ピンク | #e1d5e7 | #d3c5da | #eaabc3 | — | dreamy, pastel, magical | lp, ec |
| pearl-pink | パールピンク | #efeef9 | #e3e2ed | #a0a2b9 | — | elegant, pearl, sophisticated | corporate, ec |
| adult-pink | 大人ふんわりピンク | #ece7ed | #ddd5e0 | #d583a2 | — | elegant, mature, romantic | corporate, ec |
| pink-gold-refined | 品のあるピンクゴールド | #fff9ed | #f8efd5 | #efcbb6 | #d4a373 | elegant, warm, luxury | corporate, ec |

---

## ニュートラル・ナチュラル系

| slug | ja | bg | primary | accent | sub-accent | mood | best-for |
|---|---|---|---|---|---|---|---|
| beige-khaki | ベージュカーキ | #d7cbab | #c5b894 | #6f7247 | — | natural, earthy, vintage | corporate, portfolio |
| beige-brown | ベージュブラウン | #e9e0cf | #ddd0b8 | #cba990 | — | warm, natural, minimal | corporate, ec |
| cafe-au-lait | カフェオレブラウン | #f6efd3 | #ebe2c0 | #482404 | — | warm, cozy, cafe | ec, lp |
| white-pearl | 透明ホワイトパール | #f5f4f2 | #ebeae6 | #d7e0e5 | — | minimal, clean, pearl | corporate, ec |
| light-yellow | 軽やかイエロー | #f5f5f5 | #e8e8e8 | #edd269 | — | light, warm, cheerful | lp, portfolio |
| monochrome-red-accent | モノクロ朱差し | #ffffff | #000000 | #c00000 | — | minimal, editorial, fashion, monochrome | ec, portfolio |

---

## メタリック・ゴールド系

| slug | ja | description | mood | best-for |
|---|---|---|---|---|
| gold-gradient | 金色グラデ | #f9d976 → #f39f86 → #b06f3a の 3 段グラデ | gold, luxury, premium | corporate, game |
| metal-gradient | 金属グラデ | #b8c0c8 → #e8eef2 → #5b6470 の 3 段（シルバー） | metallic, silver, luxury | corporate, portfolio |

---

## mood → 推奨パレット（クイック検索）

| mood / シーン | 第一候補 | 第二候補 | 第三候補 |
|---|---|---|---|
| ゲームUI・ファンタジー | gorgeous-black-gold-red | purple-gold | abyss-gold-mono |
| 高級ブランド | premium-blue | blue-gold-luxury | gold-gradient |
| かわいい・ガーリー | deep-pink | dreamy-pink | sweet-blue-pink |
| コーポレート・ビジネス | elegant-silver-navy | monochrome-urban | cool-intellectual-blue |
| ナチュラル・エコ | botanical-green | natural-green | beige-khaki |
| 和風・日本 | gorgeous-black-gold-red | classic-green-beige | abyss-crimson-fire |
| コスメ・スキンケア | pearl-pink | white-pearl | pink-gold-refined |
| 夏・リゾート | clear-blue | mint-mist-blue | sweet-blue-pink |
| ブライダル | dusty-pink | adult-pink | white-pearl |
| K-POP・エッジ | black-pink-neon | adult-black-pink | vivid-pink-blue |
| アウトドア・スポーツ | sporty-green-yellow | orange-black | beige-khaki |
| ダーク・幻想 | night-sky-gradient | lavender-black | forest-deep-green |
| 都会・ミニマル | monochrome-urban | white-pearl | fresh-green |
| カフェ・暖かみ | cafe-au-lait | beige-brown | light-yellow |
| アニメ・ダーク神秘 | void-cyan-gold | lavender-black | abyss-gold-mono |
| 和風映画・ドラマ | abyss-crimson-fire | gorgeous-black-gold-red | deep-wine-red |
| tech・SaaS・モダン | void-indigo-pearl | cool-intellectual-blue | electric-blue-pale |
| 教育・編集（明るめ） | frost-teal-rouge | serene-blue | white-pearl |
| サブカル・サイバー | electric-blue-pale | black-pink-neon | chrome-yellow-bluegray |
| ラグジュアリーEC・ファッション | monochrome-red-accent | pearl-pink | metal-gradient |

---

## signal → パレット解決ルール

design-creator は以下の優先順でパレットを 1 つに決め打つ。

```
1. クイズ Q-visual-01 (color-strategy) で雰囲気タグを抽出
2. mood 層（brightness / temperature / energy / formality）と組み合わせる
3. use 層（intent.use）で best-for を絞り込む
4. 上の「mood → 推奨パレット」表で第一候補を採用
5. 第二候補は DESIGN.md コメントで `[alternative: {slug}]` として残す
```

### 例

```
intent.use = corporate
mood.brightness = dark
mood.temperature = cool
visual.color-strategy = monochrome-bg-with-accent
visual.accent = warm

→ mood「dark + cool」かつ accent=warm
→ 候補: night-sky-gradient (bg cool + accent warm pink) が第一候補
→ best-for に corporate 含む → 確定
```

---

## パレット適用時の reason 雛形

```
- Background: #09172c (night-sky-gradient.bg)
  reason: 第一印象軸「{user 入力}」を満たす深い紺。mood=dark に適合
- Primary: #293355 (night-sky-gradient.primary)
  reason: bg と同系統で奥行きの中間層を担う
- Accent: #af6681 (night-sky-gradient.accent)
  reason: 単色 dark に温度を加える女性的アクセント。target=「{user 入力}」を補強
- Sub Accent: #c4a28b (night-sky-gradient.sub-accent)
  reason: gold 系の差し色で luxury 感を底上げ
```

---

## 禁止事項

- ❌ この辞書にない hex 値を DESIGN.md に書く
- ❌ 同 mood で複数パレットを併記（「迷ったから両方書いとく」）
- ❌ ユーザーが自由入力で hex を直接指定 → `[要確認]` で残す（lexicon 外の独自色）
