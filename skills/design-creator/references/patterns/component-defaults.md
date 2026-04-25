# patterns: component-defaults

use × mood で**実務的に頻出するパーツ構成（デフォルトセット）**。
lexicon の `parts.md` が「各パーツ単体の定義」だとすれば、ここは「**どのパーツをセットで使うか**」を扱う。

design-creator の Step 8 で参照される。クイズ Q-component-02 で必須パーツが明示されなかった場合、ここから use × mood に応じたデフォルト構成を引いて埋める。

---

## use=corporate（企業情報・コーポレートサイト）

### × 信頼感 / minimal
```
nav-header, kv-hero, section-heading, card-item, cta-button, footer
```
過剰演出を避け、スクロール往復だけで完結する 1 画面構成。bg-decoration は使わない。

### × 高級 / luxury
```
nav-header, kv-hero, hero-title, section-heading, card-item, page-transition, footer
```
page-transition を入れて静かな遷移を作る。bg-decoration は微小なグラデのみ。

### × 神秘 / fantasy（ゲーム会社など）
```
page-loader, opening-sequence, nav-header, kv-hero, hero-title, section-heading, card-item, bg-decoration, page-transition, footer
```
opening-sequence + page-loader で世界観を**先に提示**。bg-decoration は particle / glow を常時。

---

## use=lp（LP・キャンペーン・イベント告知）

### × ビビッド / エネルギー
```
kv-hero, hero-title, section-heading, cta-button, scroll-indicator, footer
```
nav-header を省略し縦スクロール 1 画面集中。CTA に強い反応アニメ。

### × ファンタジー / 神秘
```
page-loader, kv-hero, hero-title, section-heading, card-item, bg-decoration, cta-button, scroll-indicator
```
page-loader でブランド世界に没入させてから本編。

### × LP・コスメ / ブライダル
```
nav-header, kv-hero, hero-title, section-heading, card-item, cta-button, footer
```
標準構成。modal は使わず、scroll narrative に徹する。

---

## use=ec（EC・販売）

### × 標準（デフォルト）
```
nav-header, sp-menu, kv-hero, section-heading, card-item, modal, cta-button, footer
```
modal は商品クイックビュー用に必須。card-item をグリッド配置。

### × ファッション / editorial
```
nav-header, sp-menu, kv-hero, section-heading, card-item, page-transition, cta-button, footer
```
page-transition で商品詳細への遷移を演出。

---

## use=portfolio（ポートフォリオ・作品集・個人ブログ）

### × ミニマル / editorial
```
nav-header, kv-hero, hero-title, section-heading, card-item, page-transition, footer
```
作品ページへの page-transition は必須。bg-decoration は使わない。

### × 神秘 / ファンタジー（イラストブログなど）
```
nav-header, kv-hero, hero-title, section-heading, card-item, bg-decoration, page-transition, footer
```
イラスト作品を主役にしつつ、bg-decoration で世界観を補強。

### × 技術 / tech
```
nav-header, kv-hero, hero-title, section-heading, card-item, footer
```
mono フォントを併用。bg-decoration / page-transition は不要。

---

## use=game（ゲーム公式・キャラクターサイト）

### × ファンタジー / アニメ
```
page-loader, opening-sequence, nav-header, sp-menu, kv-hero, hero-title, section-heading, card-item, bg-decoration, page-transition, modal, modal-overlay, footer
```
最大構成。**page-loader と opening-sequence は必須**（世界観提示の文脈で）。modal はキャラクター詳細用。

### × バトル / ダーク
```
page-loader, nav-header, sp-menu, kv-hero, hero-title, section-heading, card-item, bg-decoration, modal, footer
```
opening-sequence は省略可。bg-decoration を強めに。

---

## レイアウト型 → 必須パーツの追加ルール

`component.layout-type` の値で以下を上書きする:

| layout-type | 追加パーツ | 削除パーツ |
|---|---|---|
| `grid-gallery` | card-item を必須化、stagger 強化 | — |
| `scroll-narrative` | section-heading 複数、scroll-indicator | nav-header（省略可） |
| `single-page` | scroll-indicator | nav-header（省略可） |
| `multi-page` | nav-header、page-transition | scroll-indicator |
| `dashboard` | nav-header、card-item（widget 化） | bg-decoration、opening-sequence |

---

## 注意事項

- ここに書かれた構成は**経験則のテンプレート**。user が明示的に追加・削除を要求したらそちらを優先
- `[要確認]` パーツは無理に埋めない。user 追記がない場合は省略してよい
- 構成にない奇抜なパーツ（自由入力で出てきた）は lexicon の `parts.md` に存在するか確認 → なければ `[要確認]` で残す
