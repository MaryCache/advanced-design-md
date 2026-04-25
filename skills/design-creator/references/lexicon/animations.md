# lexicon: animations

design-creator のアニメーション辞書。scope（適用範囲）× 系統 でアニメ名を決め打つ。
**この辞書にないアニメ名を DESIGN.md に書いてはならない**。

> **関連**: 単独 scope のアニメ名選定はここ。**複数 scope を同時にどう組ませるか**（mystic stack / minimal stack 等のレシピ）は `../patterns/animation-recipes.md` を参照。
> 単独 scope だけ流用しても効果が薄いケースがあるため、site 全体の質感を決めるときは patterns 側を必ず確認する。

---

## scope 定義

| scope | 説明 | 推奨 lib |
|---|---|---|
| page-load | ページ読み込み直後の演出 | CSS keyframe |
| hero-enter | ファーストビュー入場 | CSS keyframe |
| hero-idle | ファーストビュー静止時の動き | CSS keyframe (infinite) |
| scroll-reveal | スクロール入場 | CSS + IntersectionObserver |
| hover | ホバー反応 | CSS transition |
| nav-toggle | ナビ・メニュー開閉 | CSS transition |
| modal | モーダル開閉 | CSS keyframe |
| page-transition | ページ遷移 | CSS keyframe |
| bg-decoration | 背景装飾の常時アニメ | CSS keyframe (infinite) |
| complex-sequence | 多段制御の演出（例: opening-sequence） | [要確認: GSAP 候補] |

---

## アニメーション一覧

### page-load 系

| name | spec | mood 親和 | use 親和 |
|---|---|---|---|
| page-fade | opacity 0→1, 1.0s ease | 全般 | 全般 |
| page-reveal | opacity + scale 0.95→1, 1.2s ease-out | luxury, calm | corporate, lp |
| page-loader-sweep | bar が画面を横切ってから content fade in | game, dramatic | game, lp |

### hero-enter 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| blur-reveal | filter blur(15px)→0 + opacity 0→1, 1.5s ease | luxury, dreamy | mood=dark/dreamy |
| rise-in | translateY(20%)→0 + opacity 0→1, 1.5s cubic-bezier(0.02,0.88,0.58,1) | 全般 | 標準入場 |
| ken-burns | scale 1→1.1, 6s ease-out | luxury, cinematic | 静止画 hero |
| kv-scale-in | scale 1.2→1 + opacity 0→1, 1.0s ease | dramatic, game | game / lp |
| char-split-flicker | 文字単位で順番に opacity flicker, 各 0.05s 遅延 | edgy, sub-culture | hero-title 用 |
| fade-up | translateY(8%)→0 + opacity, 0.8s ease | calm, corporate | 控えめな入場 |

### hero-idle 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| ken-burns-slow | scale 1→1.05, 12s ease-in-out alternate | luxury, cinematic | 静止画奥行き |
| parallax-drift | translate X/Y ±2px, 8s ease infinite | dreamy | 微細浮遊 |
| clockwise-orbit | rotate 0→360deg, 30s linear infinite | game, fantasy | 周辺装飾 |
| counter-orbit | rotate 360→0deg, 30s linear infinite | game, fantasy | clockwise の対 |
| hero-pulse | opacity 1→0.85→1, 4s ease-in-out infinite | tech, calm | 微発光 |
| star-flicker | opacity 0.3→1→0.3, 3s ease-in-out infinite, 各要素遅延 | dreamy, night | 星・パーティクル |

### scroll-reveal 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| scroll-fade-up | translateY(40px)→0 + opacity, 0.8s cubic-bezier(.22,.61,.36,1) | 全般 | 標準 reveal |
| scroll-fade-in | opacity 0→1, 1.0s ease | calm, corporate | 最も控えめ |
| fade-blur-in | filter blur(10px)→0 + opacity, 1.2s ease, delay 0.2s | luxury, dreamy | mood=dark |
| scroll-zoom-in | scale 0.9→1 + opacity, 1.0s ease | playful, lp | スプリング感 |
| section-slide-up | translateY(60px)→0, 0.8s ease, with stagger 0.1s | editorial | section 内複数要素 |

### hover 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| brightness-lift | filter brightness(1)→(1.1), 0.2s ease | 全般 | 画像・ボタン |
| opacity-dim | opacity 1→0.8, 0.2s ease | luxury, calm | dark テーマ向け |
| underline-slide | width 0→100% の border-bottom, 0.3s ease | editorial, corporate | リンク |
| fill-sweep | background 0%→100% sweep, 0.4s ease | bold, lp | CTA ボタン |
| scale-up | transform scale 1→1.03, 0.2s ease | playful | カード |
| color-shift | color の hex 変化, 0.2s ease | 全般 | テキストリンク |
| ghost-fade | opacity 1→0.6 + transform translateY(-2px), 0.3s ease | dreamy, calm | 控えめなナビ |

### nav-toggle 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| drawer-slide | translateX(-100%)→0, 0.4s ease | 全般 | sp-menu |
| drawer-fade | opacity 0→1 + scale 0.95→1, 0.3s ease | calm, luxury | overlay menu |
| nav-blur-in | backdrop-filter blur(0)→(20px), 0.4s ease | tech, modern | sticky nav |

### modal 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| modal-fade | opacity 0→1 + scale 0.95→1, 0.3s ease | 全般 | 標準モーダル |
| modal-slide-up | translateY(40px)→0 + opacity, 0.4s ease | editorial | sheet 風 |
| overlay-fade | opacity 0→1, 0.2s ease | 全般 | 背景 dim |

### page-transition 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| crossfade | opacity 1→0 (current) + 0→1 (next), 0.5s ease | 全般 | SPA |
| curtain-wipe | overlay translateY(100%)→0→-100%, 1.0s ease | dramatic, game | 演出強め |
| blur-transition | filter blur(0)→(20px)→(0), 0.6s ease | luxury, dreamy | mood=dark |

### bg-decoration 系

| name | spec | mood 親和 | 使い所 |
|---|---|---|---|
| star-flicker | （hero-idle と同名・同 spec） | dreamy, night | bg 星 |
| orbit-decoration | rotate 0→360deg, 60s linear infinite | game, fantasy | bg 周辺装飾 |
| gradient-shift | background-position 0%→100%, 8s linear infinite | dreamy, vivid | bg グラデ流動 |
| particle-drift | translate Y -20px〜+20px, 10s ease-in-out infinite | dreamy, calm | パーティクル |

### scroll-indicator 系

| name | spec | 使い所 |
|---|---|---|
| scroll-indicator-pulse | opacity + translateY 0→8px, 2s ease-in-out infinite | hero 下端の誘導 |
| scroll-indicator-fade | opacity 1→0 on scroll | scrollY > 100 で消す |

---

## mood × tempo → アニメ傾向

| mood | tempo | duration 目安 | easing 推奨 |
|---|---|---|---|
| dark / luxury / gothic | slow | 0.8s〜2.0s | cubic-bezier(0.02, 0.88, 0.58, 1) / ease-out |
| dreamy / pastel | slow / medium | 0.6s〜1.5s | ease-in-out |
| corporate / business | medium / fast | 0.3s〜0.6s | ease-out / cubic-bezier(.22,.61,.36,1) |
| vivid / pop / sporty | fast | 0.2s〜0.5s | cubic-bezier(.68,-.55,.27,1.55) (overshoot) |
| natural / calm | medium | 0.4s〜0.8s | ease-in-out |
| edgy / sub-culture | fast / variable | 0.05s〜0.4s | linear / step-end |

---

## signal → 解決ルール

```
motion.tempo (slow/medium/fast) と motion.character (graceful/sharp/playful) を組み合わせて表を引く。

scope 別に第一候補を 1 つ採用:
- page-load → page-fade (default) / page-reveal (luxury) / page-loader-sweep (game)
- hero-enter → blur-reveal (dark) / rise-in (default) / kv-scale-in (game) / char-split-flicker (edgy)
- hero-idle → ken-burns-slow (luxury) / hero-pulse (tech) / clockwise-orbit (fantasy)
- scroll-reveal → fade-blur-in (dark) / scroll-fade-up (default) / scroll-zoom-in (playful)
- hover → opacity-dim (luxury) / brightness-lift (default) / scale-up (playful) / color-shift (corporate)
- nav-toggle → drawer-slide (default) / drawer-fade (luxury) / nav-blur-in (tech)
- modal → modal-fade (default) / modal-slide-up (editorial)
- page-transition → crossfade (default) / blur-transition (luxury) / curtain-wipe (game)
- bg-decoration → star-flicker (dreamy/night) / orbit-decoration (game) / particle-drift (calm)
```

### 例

```
mood = dark, romantic, calm
motion.tempo = slow
motion.character = graceful
component.required-parts = [kv-hero, hero-title, section-heading, card-item, cta-button, scroll-indicator]

→ hero-enter: blur-reveal (slow + luxury 親和)
→ hero-idle: ken-burns-slow (luxury 親和)
→ scroll-reveal: fade-blur-in (dark + slow)
→ hover: opacity-dim (luxury 適性)
→ scroll-indicator: scroll-indicator-pulse (固定)
```

---

## Library 表（DESIGN.md 用）

DESIGN.md の Animation Libraries テーブルは以下のフォーマットで埋める。

```
| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | 外部依存回避、scope 別 fade で十分 |
| hover | CSS transition only | 単純な state 変化で十分 |
| keyframe | CSS @keyframes | hero-enter / hero-idle / bg-decoration 全部 |
| page-transition | CSS keyframe | SPA でなければ独立ページ間遷移は CSS で可 |
| complex-sequence | [要確認: GSAP 候補] | opening-sequence の多段制御が必要なら |
```

**外部 lib（GSAP / Lenis / Barba.js）は基本採用しない**。
multi-step なオーケストレーションが必須なときだけ `complex-sequence` で `[要確認]` として残す。

---

## reason 雛形

```
states:
  enter:
    animation: blur-reveal
    trigger: ロード完了
    reason: mood=dark/luxury に親和（霧が晴れる演出）。tempo=slow を満たす 1.5s
  idle:
    animation: ken-burns-slow
    reason: 静止画に奥行き維持。mood=luxury に適合
```

---

## 禁止事項

- ❌ この辞書にないアニメ名を DESIGN.md に書く（例: 自分で命名した `magic-pop`）
- ❌ duration を曖昧に書く（「ゆっくり」「速め」→ 数値必須）
- ❌ 外部 CDN の lib を採用（CSS で実現可能なら CSS）
- ❌ scope=complex-sequence を「念のため」入れる（具体的な多段制御が必要なときだけ）
