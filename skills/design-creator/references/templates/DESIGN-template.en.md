# DESIGN — {NAME}

## Intent

- **Generated**: {YYYY-MM-DD}
- **Source**: design-creator (quiz-driven)
- **Volume**: {quick | standard | deep}
- **Use**: {use label (Q-intent-01 selection or free input)}
- **Mood**: {mood layer selections joined by `, ` (e.g., dark, romantic, calm)}
- **First impression**: {Q-intent-03 selection or free input} — completion: {auto-complete | user-input | pending review}
- **Target audience**: {Q-intent-02 free input or `[pending review]`}
- **Differentiation**: {Q-intent-04 free input or `[pending review]`}

---

## Colors

### Main palette: {slug}

- **Background**: #{HEX}
  - role: {usage}
  - reason: {which Intent item this is tied to}
- **Primary**: #{HEX}
  - role: {usage}
  - reason: {...}
- **Accent**: #{HEX}
  - role: {usage}
  - reason: {...}
- **Sub Accent**: #{HEX} (when a sub palette exists)
  - role: {usage}
  - reason: {...}

<!-- alternative: {second-choice slug} - {one-line reason} -->

---

## Typography

| role | font | source | weight | reason |
|---|---|---|---|---|
| heading-en | {font} | {Google Fonts / system} | {weight} | {tie to Intent and mood} |
| heading-ja | {font} | {source} | {weight} | {...} |
| body-ja | {font} | {source} | {weight} | {...} |
| mono | {font or —} | {source or —} | {weight or —} | {adoption rationale or "not applicable"} |

### Common values

- **Base Size**: 16px
- **Scale**: h1=48px, h2=32px, h3=24px, body=16px, small=12px
- **Line Height**: 1.6
- **Tracking**: {default / 0.05em / 0.15em etc., depending on mood}

---

## Spacing

- **Base Unit**: 8px
- **Scale**: 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Container Max Width**: 1200px
- **Grid**: 12 columns, gap=24px

---

## Components

<!--
List every part included in required-parts in order.
Order follows the use-default composition (lexicon/parts.md).
For each part, ja / background / accent / states are required.
-->

### {part-name}

- **ja**: {Japanese label}
- **Background**: #{HEX}
- **Accent**: #{HEX}
- **States**:
  - **enter**:
    - animation: {animation-name from lexicon/animations.md}
    - trigger: {trigger condition}
    - reason: {tie to Intent and library choice}
  - **hover**:
    - animation: {animation-name}
    - reason: {...}
  - **idle**: (optional)
    - animation: {animation-name}
    - reason: {...}

<!-- Repeat as many parts as required -->

---

## Animations

### Libraries

| scope | lib | reason |
|---|---|---|
| scroll-reveal | CSS + IntersectionObserver | Avoids external deps; per-scope fade is sufficient |
| hover | CSS transition only | Simple state changes are enough |
| keyframe | CSS @keyframes | Used for hero-enter / hero-idle / bg-decoration |
| page-transition | CSS keyframe | Independent page transitions can be done in CSS unless SPA |
| complex-sequence | {— or [pending review: GSAP candidate]} | {reason for non-adoption or need for multi-step orchestration} |

### Keyframes

<!-- Transcribe every adopted animation name and spec. Acts as the primary source for downstream @keyframes generation -->

- **{animation-name}**: {spec in `from {...} to {...}` form + duration + easing}

Example:
- **rise-in**: translateY(20%)→0 + opacity 0→1, 1.5s cubic-bezier(0.02,0.88,0.58,1)
- **blur-reveal**: filter blur(15px)→0 + opacity 0→1, 1.5s ease

### Transitions

<!-- hover-related -->

- **{animation-name}**: {transition property + duration + easing}

### Scroll Behaviors

<!-- scroll-reveal-related -->

- **{animation-name}**: {IntersectionObserver threshold + animation applied}

### Hover / Interaction

<!-- hover-related details -->

- **{target part}**: {animation-name} on hover

---

## Color Roles (optional)

Only fill in when color roles span multiple Components in a complex way.

| role | value | source-palette | reason |
|---|---|---|---|

---

## Constraints

<!-- Bullet-listed constraints derived from mood and technical -->

- {e.g., Animation duration unified between 0.8s and 2.0s (mood=slow/luxury origin)}
- {e.g., No more than 3 colors used (mood=minimal/luxury origin)}
- {e.g., PC-first (technical.device-priority=pc-first). SP uses collapsed nav and full-screen KV}
- {e.g., No external CDN or external image URLs (technical.dependency-tolerance=css-only origin)}

---

## Free-form log

The "Other" free-form input from the quiz and the trailing free-form note are preserved here verbatim,
serving as the cross-reference source when DESIGN.md is parsed.

```
{Verbatim contents of the trailing free-form note from the quiz}
```
