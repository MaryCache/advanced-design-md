# patterns: animation-recipes

mood × scope で**実務的に頻出するアニメーション組み合わせ（レシピ）**。
lexicon が「個別アニメの定義」だとすれば、ここは「複数の scope を**同時にどう組ませるか**」を扱う。

design-creator の Step 8 で参照される。単独 scope の選定は lexicon で済むが、site 全体の質感を決めるのは scope 横断の組み合わせなので、ここのレシピが効く。

---

## ダーク × 神秘 / ファンタジー（mystic stack）

3 層を同時運用するのが定石:

1. **入場**: `fade-blur-in` (1.0s〜1.8s, cubic-bezier 緩やかな ease-out) — 霧から浮かぶ
2. **静止**: `ken-burns-slow` (10s〜15s, ease-in-out infinite alternate) — 動きすぎない奥行き
3. **背景常時**: `particle-drift` または `gradient-shift` (8s〜20s) — 神秘性の継続

scroll-reveal は `scroll-fade-up` を **stagger 0.15s〜0.2s** で。素早い fade-in は世界観を壊すので使わない。
hover は控えめに `brightness-lift` または `scale-up (1.0→1.04)` だけ。激しい動きは避ける。

---

## ダーク × エディトリアル / 高級

動きを最小限にして「静寂」を作るパターン:

1. **入場**: `rise-in` (1.5s, slow easing) — 単純な上昇のみ
2. **静止**: なし（または極めて微小な `gradient-shift`）
3. **背景常時**: なし

scroll-reveal は `scroll-fade-in` (opacity のみ) で 1.0s。stagger は 0.05s 以下に抑える。
hover は `underline-slide` か `opacity-dim` 単独。色変化は使わない（高級感を壊す）。

---

## ライト × ミニマル / コーポレート

動きを徹底的に削ぎ、scroll-reveal だけで構成:

1. **入場**: `fade-up` (0.6s〜0.8s ease) のみ。delay も最小
2. **静止**: なし
3. **背景常時**: なし

card-item / section-heading に `scroll-fade-up`（stagger 0.1s）を一律適用。それ以外のアニメは原則使わない。
hover は `underline-slide` のみ。コーポレート系で過剰アニメは信頼性を損なう。

---

## ビビッド × エネルギー / LP / スポーティ

短時間高エネルギーパターン:

1. **入場**: `scale-in` または `bounce-in` (0.3s〜0.5s, cubic-bezier overshoot 系)
2. **静止**: `hero-pulse` または微小 `scale loop` (2s〜4s)
3. **背景常時**: `gradient-shift` (高速 6s) または `geo-float`

duration は **0.2s〜0.5s** に統一。stagger は 0.05s で詰める（リズム感）。
hover は `scale-up (1.0→1.06)` + `color-shift` を同時発火。CTA ボタンには `fill-sweep` を仕込む。

---

## ナチュラル × カーム

ふわっとしたゆるい動き:

1. **入場**: `fade-up` (0.8s ease-out)
2. **静止**: `parallax-drift` を bg-decoration に
3. **背景常時**: 葉や粒子の `particle-drift`（速度遅め 12s〜）

scroll-reveal は `scroll-fade-in` のみ。stagger は 0.15s。
hover は `opacity-dim` 単独。彩度変化は避ける。

---

## 和風 × ドラマ

緊張感のある間で構成:

1. **入場**: `char-split-flicker` または `fade-blur-in` (1.5s〜2.0s) — 文字単位
2. **静止**: なし（または `ken-burns-slow` 静止画像のみ）
3. **背景常時**: なし or 極めて微小な `gradient-shift`

scroll-reveal は `scroll-fade-up` (1.0s, stagger 0.2s)。
page-transition には `curtain-wipe` または `crossfade` を採用。

---

## レシピ選定ガイド

ユーザー回答から mood を 2〜3 個抽出し、上記レシピのうち**最も近いもの 1 つを採用**。
複数レシピが重なる場合は:
- mood の優先度順 1 つを採用
- 第二候補は `[alternative-recipe: {mood}-stack]` でコメントに残す

---

## 注意事項

- ここに書かれた duration / stagger は**経験則の中央値**。具体値は lexicon の `animations.md` から引く
- レシピは「同時に組み合わせる」ことに価値がある。単独 scope だけ流用しても効果は薄い
- レシピにない mood × scope の組み合わせを要求された場合 → lexicon 単独に戻り、不足部分は `[要確認]`
