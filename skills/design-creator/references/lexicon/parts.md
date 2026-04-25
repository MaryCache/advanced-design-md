# lexicon: parts

design-creator のパーツ辞書。component.required-parts の各値を引いて、
ja 名・推奨アニメーション scope・初期 reason 雛形を取得する。

> **関連**: 各パーツ単体の定義はここ。**use × mood に応じてどのパーツをセットで使うか**（必須パーツ構成のテンプレ）は `../patterns/component-defaults.md` を参照。
> クイズで required-parts が空 / 不足の場合は patterns 側のデフォルト構成で埋める。
>
> **extractor との関係**: design-extractor は別途 `design-extractor/references/parts-naming.md` で部品名を管理しており、INTERPRETED.md の `good-for` / `avoid` はそちらを参照する。両ファイルは概ね一致するが完全同一ではないため、Step 9 経由で INTERPRETED.md 由来の部品名を DESIGN.md の Components に取り込む際は `../extractor-handoff.md` の「部品名（Components）の照合ルール」に従って本ファイルへ正規化する。

---

## パーツ一覧

### nav-header
- ja: ナビゲーションヘッダー
- 主要要素: ロゴ / メニューリンク / CTA ボタン / SP メニュートグル
- 推奨 scope: hover / nav-toggle (sticky 化されている場合)
- states: idle / hover / scrolled (sticky)
- 必須度: 高（ほぼ全 use で必要）

### nav-link
- ja: ナビゲーションリンク
- 主要要素: テキスト + （任意）下線・アイコン
- 推奨 scope: hover
- states: idle / hover / active
- 採用例: nav-header の中。footer link にも流用可

### sp-menu
- ja: スマホメニュー（drawer）
- 主要要素: full-screen / side-drawer overlay
- 推奨 scope: nav-toggle
- states: closed / open
- 採用条件: technical.device-priority に sp / both 含むとき

### kv-hero
- ja: メインビジュアル
- 主要要素: 画像 / 動画 / コピー / CTA
- 推奨 scope: hero-enter / hero-idle / scroll-indicator
- states: enter / idle / scroll
- 必須度: 高（lp / corporate / portfolio / game で必須）

### hero-title
- ja: ヒーロータイトル
- 主要要素: メインコピー大型表示
- 推奨 scope: hero-enter
- states: enter
- 採用例: kv-hero の中。char-split-flicker / rise-in 等の対象

### section-heading
- ja: セクション見出し
- 主要要素: h2 + 装飾線・装飾英字
- 推奨 scope: scroll-reveal
- states: enter (scroll-reveal)
- 必須度: 高

### card-item
- ja: カードアイテム
- 主要要素: 画像 + タイトル + 説明 + リンク
- 推奨 scope: scroll-reveal / hover
- states: idle / hover / enter
- 必須度: 中（ec / portfolio / corporate で頻出）

### cta-button
- ja: CTA ボタン
- 主要要素: テキスト + （任意）アイコン
- 推奨 scope: hover
- states: idle / hover / active
- 必須度: 高（lp / ec / corporate で必須）

### scroll-indicator
- ja: スクロール誘導インジケーター
- 主要要素: テキスト「Scroll」+ 線・矢印
- 推奨 scope: hero-idle (pulse) / scroll-fade
- states: idle (pulse) / hidden (scrolled)
- 採用条件: kv-hero がフルスクリーン高さのとき

### bg-decoration
- ja: 背景装飾
- 主要要素: 装飾オブジェクト（パーティクル・幾何）
- 推奨 scope: bg-decoration (常時アニメ) / hero-idle
- states: idle
- 採用条件: mood=dreamy/game/dark で世界観強化したいとき

### page-loader
- ja: ページローダー
- 主要要素: ロゴ・スピナー・進捗バー
- 推奨 scope: page-load
- states: loading / loaded (fade-out)
- 採用条件: 重い hero 演出があるとき / game サイト

### opening-sequence
- ja: 起動演出シーケンス
- 主要要素: 多段の演出（loader → logo → curtain → kv）
- 推奨 scope: complex-sequence
- states: step-1 → step-2 → ... → done
- 採用条件: game / 高演出 lp（**通常は採用しない**。reason に「演出強度を最大化」が必要）

### page-transition
- ja: ページ遷移演出
- 主要要素: 全画面オーバーレイ
- 推奨 scope: page-transition
- states: leave / enter
- 採用条件: SPA でない場合は限定的

### modal
- ja: モーダルウィンドウ
- 主要要素: コンテンツ + 閉じるボタン
- 推奨 scope: modal
- states: closed / open

### modal-overlay
- ja: モーダル背景オーバーレイ
- 主要要素: 全画面 dim
- 推奨 scope: modal
- states: hidden / visible

### form-input
- ja: フォーム入力欄
- 主要要素: input + label
- 推奨 scope: hover (focus-within)
- states: idle / focus / error / disabled

### footer
- ja: フッター
- 主要要素: コピーライト / リンク群 / SNS
- 推奨 scope: hover
- states: idle / hover (リンク部)

---

## use → デフォルト構成

クイズで component.required-parts を答えなかった場合のフォールバック。

| use | デフォルト required-parts |
|---|---|
| corporate | nav-header, nav-link, sp-menu, kv-hero, hero-title, section-heading, card-item, cta-button, footer |
| lp | nav-header, kv-hero, hero-title, section-heading, card-item, cta-button, scroll-indicator, footer |
| ec | nav-header, sp-menu, kv-hero, section-heading, card-item, modal, modal-overlay, cta-button, form-input, footer |
| portfolio | nav-header, kv-hero, hero-title, section-heading, card-item, page-transition, footer |
| game | page-loader, kv-hero, hero-title, section-heading, card-item, bg-decoration, nav-header, sp-menu, scroll-indicator |

---

## states → animation scope マッピング

DESIGN.md の Components の各 part に states を書くとき、scope の選択指針:

| state | scope（lexicon/animations.md と一致） |
|---|---|
| enter | hero-enter（kv-hero / hero-title）/ scroll-reveal（その他） |
| idle | hero-idle（kv-hero）/ bg-decoration（bg-decoration） |
| hover | hover |
| scroll | hero-idle / scroll-reveal |
| open / close | nav-toggle / modal |
| loading / loaded | page-load |

---

## reason 雛形

```
### kv-hero
- ja: メインビジュアル
- background: #09172c (palette)
- accent: #af6681
- states:
  - enter:
    animation: blur-reveal
    trigger: ロード完了
    reason: mood=dark/luxury に親和（霧が晴れる演出）
  - idle:
    animation: ken-burns-slow
    reason: 静止画奥行き維持。mood=luxury に適合
  - scroll:
    animation: scroll-fade
    trigger: scrollY > 80vh
    reason: 次セクションへの自然な引き継ぎ
```

---

## 禁止事項

- ❌ 辞書にないパーツ名（自由入力含む）を DESIGN.md に書く → `[要確認: 新規パーツ {name}]` で残す
- ❌ states を空欄にする（最低 1 つは書く）
- ❌ animation scope と異なる scope を持つアニメ名を書く（例: hover で blur-reveal）
