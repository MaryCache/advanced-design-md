# parts-naming — 部品名・アニメーション分類

design-extractor の INTERPRETED.md 生成時に `good-for` / `avoid` で参照する命名体系。
**この一覧にない部品名を `good-for` / `avoid` に入れない**（自由文には書いてよい）。

> **関連**: 本ファイルは extractor 管轄の部品名リスト。design-creator は別途 `design-creator/references/lexicon/parts.md` を持ち、ja 名・必須度・推奨 scope を管理している。両ファイルは概ね一致するが、片方にしかない名前も存在する。Step 9 の handoff 経路で INTERPRETED.md 由来の部品名を DESIGN.md に持ち込む際の照合ルールは、`design-creator/references/extractor-handoff.md` の「部品名（Components）の照合ルール」を参照。

---

## 基本ルール

- 人間が視覚的に識別できる
- AI が参照しやすい
- HTML / MD / 会話で共通利用できる
- 日本語名も併記する

---

## 部品名（確定済み）

### ページ骨格
- `page-loader`（ローディング画面）
- `opening-sequence`（オープニング演出）
- `page-transition`（ページ遷移幕）

### ナビゲーション
- `nav-header`（PC ヘッダーナビ）
- `nav-link`（ナビリンク）
- `sp-menu`（SP ドロワーメニュー）

### メインビジュアル
- `kv-hero`（メインビジュアルエリア）
- `hero-title`（ヒーロータイトル）

### コンテンツ
- `section-heading`（セクション見出し）
- `card-item`（カードアイテム）
- `cta-button`（CTA ボタン）

### インタラクション
- `modal`（モーダル全般）
- `modal-overlay`（モーダル背景）
- `form-input`（フォーム入力欄）

### 装飾
- `scroll-indicator`（スクロール促進）
- `bg-decoration`（背景装飾）

### 構造補助
- `footer`（フッター）

---

## アニメーション分類と命名規則

新しいアニメーションに名前を付けるときは、以下の形式に従う。

### 命名形式

`{動き}-{修飾}` の kebab-case。例:
- `fade-blur-in`
- `rise-in`
- `scale-up`
- `drawer-slide`

### 系統別の例

#### 入場系（enter）
- `fade-blur-in`（フェードブラーイン）
- `slide-up` / `rise-in`（スライドアップ）
- `flicker-in`（フリッカーイン）
- `kv-scale-in`（KV スケールイン）
- `char-split-flicker`（文字分割フリッカー）

#### 静止時・常時系（idle）
- `ken-burns-slow`（ケンバーンズスロー）
- `parallax-drift`（パララックスドリフト）
- `clockwise-orbit`（時計回り軌道）
- `hero-pulse`（ヒーローパルス）

#### スクロール反応系（scroll-reveal）
- `scroll-fade-up`（スクロールフェードアップ）
- `scroll-fade-in`（スクロールフェードイン）
- `scroll-zoom-in`（スクロールズームイン）

#### 状態変化系（hover / active）
- `opacity-dim`（オパシティディム）
- `brightness-lift`（ブライトネスリフト）
- `underline-slide`（アンダーラインスライド）
- `scale-up`（スケールアップ）
- `color-shift`（カラーシフト）
- `ghost-fade`（ゴーストフェード）
- `fill-sweep`（フィルスウィープ）

#### 遷移系（page-transition / modal）
- `page-fade`（ページフェード）
- `modal-rise`（モーダルライズ）
- `crossfade`（クロスフェード）
- `curtain-wipe`（カーテンワイプ）
- `drawer-slide`（ドロワースライド）

#### 装飾系（bg-decoration）
- `grid-drift`（グリッドドリフト）
- `geo-float`（ジオフロート）
- `scroll-line`（スクロールライン）
- `star-flicker`（星フリッカー）
- `gradient-shift`（グラデーションシフト）
- `particle-drift`（パーティクルドリフト）

---

## 既存にないアニメーションを抽出した場合

VANILLA.md から新規アニメーションを発見した場合、上の命名規則に従って kebab-case で命名する。
INTERPRETED.md には `name`（英）と `ja`（日本語）を必ず併記する。

```yaml
name: clip-environment-reveal
ja: クリップ環境リビール
```
