# lexicon: typography

design-creator のフォント辞書。ユーザー mood と signal から role 別フォント組を 1 つに決め打つために使う。
**この辞書にないフォント名を DESIGN.md に書いてはならない**。自由入力でフォント名が来た場合は `[要確認]` で残す。

---

## role 定義

| role | 用途 |
|---|---|
| heading-en | 英字ディスプレイ（見出し・ナビ・装飾） |
| heading-ja | 日本語見出し |
| body-ja | 日本語本文 |
| mono | モノスペース（UI 補助・コード表現・データラベル） |

---

## 英字ディスプレイ（heading-en）

| font | source | 系統 | weight | mood 親和 | 備考 |
|---|---|---|---|---|---|
| Cinzel | Google Fonts | serif (display) | 400 / 700 | dark, luxury, gothic, fantasy | ローマ碑文風。世界観強め |
| Cormorant | Google Fonts | serif | 300 / 500 / 700 | luxury, elegant, editorial | 細身で繊細。ブライダル・コスメ |
| Playfair Display | Google Fonts | serif | 400 / 700 / 900 | editorial, fashion, luxury | high contrast 細stroke |
| EB Garamond | Google Fonts | serif | 400 / 700 | classic, traditional | クラシック書籍 |
| Inter Variable | Google Fonts | sans (variable) | 100〜900 | corporate, tech, SaaS | weight 微調整可能 |
| Oswald | Google Fonts | sans (display) | 400 / 700 | bold, sporty, vivid | 縦長 condensed |
| Bebas Neue | Google Fonts | sans (display) | 400 | sporty, vivid, urban | all-caps 推奨 |
| Rajdhani | Google Fonts | sans (geometric) | 300 / 500 | sub-culture, tech, edgy | 軽量 / sci-fi |
| Montserrat | Google Fonts | sans | 300 / 500 / 700 | corporate, modern | 汎用 |
| Poppins | Google Fonts | sans (geometric) | 300 / 500 / 700 | friendly, modern | 角丸 |
| DM Serif Display | Google Fonts | serif | 400 | editorial, magazine | 太め serif |

---

## 日本語（heading-ja / body-ja）

| font | source | 系統 | role 適性 | mood 親和 | 備考 |
|---|---|---|---|---|---|
| Noto Serif JP | Google Fonts | 明朝 | heading-ja / body-ja | dark, luxury, japanese, dreamy | 汎用明朝 |
| Zen Old Mincho | Google Fonts | 明朝 | heading-ja | japanese, traditional, dramatic | 太め骨太明朝 |
| Shippori Mincho | Google Fonts | 明朝 | heading-ja / body-ja | japanese, calm, editorial | 細身明朝 |
| Klee One | Google Fonts | 明朝風手書き | heading-ja | gentle, friendly, school | 教科書体風 |
| Noto Sans JP | Google Fonts | sans | body-ja / heading-ja | corporate, tech, minimal | 標準ゴシック |
| Zen Kaku Gothic Antique | Google Fonts | sans | body-ja | natural, calm, elegant | humanist sans |
| M PLUS Rounded 1c | Google Fonts | sans (rounded) | heading-ja / body-ja | cute, friendly, dreamy | 角丸ゴシック |
| Kosugi Maru | Google Fonts | sans (rounded) | body-ja | cute, casual | 軽量角丸 |
| BIZ UDPGothic | Google Fonts | sans (UD) | body-ja | corporate, accessible | UD 系で読みやすい |
| Sawarabi Mincho | Google Fonts | 明朝 | heading-ja | japanese, classic | 細身古風 |
| 游明朝 / YuMincho | システム | 明朝 | body-ja | dark, luxury, japanese | システム標準明朝 |
| ヒラギノ明朝 | システム (Mac/iOS) | 明朝 | body-ja | luxury, japanese | Mac 標準 |
| 游ゴシック / YuGothic | システム | sans | body-ja | corporate, neutral | システム標準 sans |
| ヒラギノ角ゴ | システム (Mac/iOS) | sans | body-ja | corporate, modern | Mac 標準 sans |

---

## モノスペース（mono）

| font | source | 用途 | 採用例 |
|---|---|---|---|
| JetBrains Mono | Google Fonts | UI 補助・データラベル | TRPG ステータス・technical サイト |
| Fira Code | Google Fonts | コード表現 | dev tool / docs |
| Roboto Mono | Google Fonts | 汎用 mono | 標準 |
| IBM Plex Mono | Google Fonts | エディトリアル mono | editorial / 技術ブログ |

---

## mood → 推薦組み合わせ

| mood | heading-en | heading-ja | body-ja | mono | パターン |
|---|---|---|---|---|---|
| dark / luxury / gothic | Cinzel (700) | Noto Serif JP (700) | 游明朝 / Noto Serif JP (400) | — | serif 主役型 |
| japanese / traditional | — | Zen Old Mincho (500) / Shippori Mincho | Noto Serif JP (400) | — | 明朝のみ |
| corporate / business | Inter Variable (500) | Noto Sans JP (700) | Noto Sans JP (400) | — | sans 主役型 |
| tech / SaaS | Inter Variable (500) | Noto Sans JP (500) | Noto Sans JP (400) | JetBrains Mono | 3 軸 |
| sub-culture / edgy | Rajdhani (300) | Noto Sans JP (300) | Noto Sans JP (300) | — | 低 weight 統一 |
| editorial / fashion | Playfair Display (400) / Cormorant | Shippori Mincho (400) | Noto Serif JP (400) | — | 高コントラスト serif |
| game / fantasy | Cinzel (700) | Noto Serif JP (700) | 游明朝 (400) | JetBrains Mono | 3 軸完備 |
| cute / friendly | Poppins (700) | M PLUS Rounded 1c (700) | M PLUS Rounded 1c (400) | — | rounded sans |
| natural / eco | Montserrat (500) | Zen Kaku Gothic Antique (500) | Zen Kaku Gothic Antique (400) | — | humanist sans |
| sporty / energetic | Oswald (700) / Bebas Neue | Noto Sans JP (700) | Noto Sans JP (400) | — | display sans |
| dreamy / pastel | Cormorant (300) | Klee One (400) | Shippori Mincho (300) | — | 細身明朝 + 手書き |
| minimal / urban | Inter Variable (400) | Noto Sans JP (400) | Noto Sans JP (300) | — | 統一 sans |
| ブライダル / コスメ | Cormorant (300) | Shippori Mincho (300) | Noto Serif JP (300) | — | 細身 serif |

---

## signal → 解決ルール

```
1. typography.serif-or-sans = serif → mood に応じて serif 主役型表を引く
2. typography.serif-or-sans = sans → sans 主役型表を引く
3. typography.jp-style = mincho → 明朝列を採用
4. typography.jp-style = gothic → sans 列を採用
5. typography.jp-style = rounded → rounded sans 列を採用
6. mono は use=portfolio かつ component に data-table or stats が含まれるときのみ採用
```

### 例

```
mood = dark, romantic, elegant
typography.serif-or-sans = serif
typography.jp-style = mincho

→ mood「dark/luxury/gothic」表を引く
→ heading-en: Cinzel (700)
→ heading-ja: Noto Serif JP (700)
→ body-ja: 游明朝 (400)
→ mono: 不要（component に data なし）
```

---

## reason 雛形

```
| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | Cinzel | Google Fonts | 700 | mood=dark/luxury に適合する serif 主役型代表 |
| heading-ja | Noto Serif JP | Google Fonts | 700 | heading-en の serif 系統に揃え、見出し強度を担保 |
| body-ja | 游明朝 | システム | 400 | 明朝主役・本文可読性。mood=japanese 親和 |
| mono | — | — | — | 用途外（data-table 系パーツなし） |
```

---

## weight・tracking ガイド

| 用途 | weight | tracking |
|---|---|---|
| 繊細・透明感 | 200〜300 | 標準〜0.05em |
| editorial・間 | 400 | 0.15em〜0.4em |
| 見出し強度 | 700〜900 | 標準 |
| プロダクト UI | 500（medium） | 標準 |
| all-caps utility | 500 / 700 | 0.1em〜0.2em |

---

## 配信方式

すべて Google Fonts またはシステムフォントから採用。**Typekit / Adobe Fonts / 自社配信フォントは辞書に含めない**（配布性のため）。
ユーザーが自社ブランドフォントを指定した場合は `[要確認: 自社配信フォント]` として DESIGN.md に残し、google-fonts 代替候補をコメントで併記する。

---

## 禁止事項

- ❌ この辞書にないフォント名（自由入力含む）を DESIGN.md に直接書く
- ❌ weight を「太め」「細め」のような曖昧な値で書く（必ず数値）
- ❌ 1 つの role に複数フォントを並べて書く（fallback のシステム明朝 / ゴシックは可）
