# advanced-design-md

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-skill-D97757?logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![Playwright](https://img.shields.io/badge/Playwright-1.59-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)

[日本語版: README.md](README.md) ／ Casual quick-start (Japanese only): [QUICKSTART.md](QUICKSTART.md)

A toolkit consisting of two Claude Code skills, designed to semi-automatically generate design specifications (DESIGN.md).

- Extract design information from existing sites and produce specifications (design-extractor)
- Elicit unarticulated requirements via a quiz interface and produce specifications (design-creator)

The generated DESIGN.md is intended to serve both as a human-readable specification and as input to AI implementation tools.

---

## Requirements

- Node.js 18 or later (required by Playwright, used in design-extractor)
- Claude Code (CLI version is assumed; certain features may not function in other environments)
- macOS / Linux / WSL2
- `python3` (used to serve the quiz HTML over localhost)

---

## Security Notice

design-extractor launches a bundled Chromium / Firefox via Playwright and executes `fetch` inside the target page context to supplement `<script src>` and similar resources. Because that path issues same-origin requests against the target site, the browser may carry stored cookies or authentication state.

Please observe the following:

- Do not share your daily browser profile. Playwright creates an isolated profile by default; if you have configured custom profile sharing, take particular care
- Authenticated pages (admin panels, internal tools, etc.) are out of scope for this tool. Use it only against public sites
- The extraction artefacts (`raw/`) contain the target site's DOM / CSS / JS. If they include proprietary assets, exclude the output directory from version control

---

## Setup

### Step 1. Install Claude Code

If Claude Code is not yet installed, follow the official documentation at [claude.com/claude-code](https://claude.com/claude-code).

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

For authentication, follow the instructions displayed when starting `claude`.

### Step 2. Clone the repository

```bash
git clone <this-repo-url> ~/design-workflow
```

The clone destination is arbitrary. This document assumes `~/design-workflow`.

### Step 3. Register the skills with Claude Code

Place symbolic links under `~/.claude/skills/` so that Claude Code recognises the skills.

```bash
mkdir -p ~/.claude/skills
ln -s ~/design-workflow/skills/design-extractor ~/.claude/skills/design-extractor
ln -s ~/design-workflow/skills/design-creator   ~/.claude/skills/design-creator
```

Run `ls ~/.claude/skills/` and confirm that two links are listed.

### Step 4. Install Playwright (first run only)

This is required when design-extractor fetches a URL. The step may be omitted: Claude will execute it automatically the first time design-extractor is invoked.

To install manually:

```bash
cd ~/design-workflow/skills/design-extractor
npm install
npx playwright install chromium
```

### Step 5. Suppress confirmation prompts (recommended)

Both skills internally invoke commands such as `mkdir`, `cp`, `python3 -m http.server`, and `npm install`. Claude Code displays a `Do you want to proceed?` prompt for each such invocation, which interrupts the workflow if left unaddressed.

On first invocation, Claude will propose merging the recommended permissions. Responding `yes` applies the configuration automatically. To apply manually, merge the `permissions.allow` array from `~/design-workflow/settings.recommended.json` into the corresponding key in `~/.claude/settings.json`.

```jsonc
// Example: ~/.claude/settings.json
{
  "language": "en",
  "model": "opus",
  "permissions": {
    "allow": [
      "Bash(mkdir -p:*)",
      "Bash(cp:*)",
      "Bash(python3 -m http.server:*)",
      "Bash(npm install)",
      "Bash(npx playwright install:*)"
      // Add all entries from settings.recommended.json
    ]
  }
}
```

The permitted operations are limited to file creation, copying, launching known servers, and dependency installation. Operations such as `rm`, `git push`, outbound `curl`, arbitrary `kill` by PID, and arbitrary `pkill` are not included (those are left to per-use confirmation).

### Step 6. Fix the output destination (optional)

To avoid being prompted for an output path on every invocation, fix the destination via environment variables.

```bash
# Append to ~/.bashrc / ~/.zshrc
export DESIGN_LIBRARY_DIR="$HOME/my-design-library/sites"   # base for design-extractor output
export DESIGN_OUTBOX_DIR="$HOME/.claude/outbox"             # destination for design-creator output
```

When unset, the fallback resolution is as follows:

| Skill | Fallback order |
|---|---|
| design-extractor | `output=` argument → `$DESIGN_LIBRARY_DIR` → `~/design-library/sites/` → `./design-library/sites/` |
| design-creator | `output=` argument → `$DESIGN_OUTBOX_DIR` → `~/.claude/outbox/` → `./outbox/` |

---

## Usage Examples

### Scenario A: Extracting from an existing site

```
User:    Please extract this site: https://www.apple.com

Claude:  Please specify a slug (output folder name).
         Examples: apple-home / google-store / microsoft-corp

User:    apple-home

Claude:  → Fetch DOM / CSS / JS via fetch.js
         → Generate VANILLA.md (raw extraction, no inference)
         → Generate INTERPRETED.md (semantic interpretation of VANILLA)
         → Generate meta.yaml
         ✓ Saved to: ~/my-design-library/sites/apple-home/
```

The resulting artefacts are organised as follows:

```
<output-base>/apple-home/
├── raw/                  # Fetch results (dom.html, styles/, scripts/, behavior-log.json)
├── VANILLA.md            # Raw extraction (CSS variables, colour values, keyframes recorded verbatim)
├── INTERPRETED.md        # Semantic interpretation (tone / effect / states assigned by Claude)
└── meta.yaml             # Source URL, tags, notes
```

### Scenario B: Generating a specification through interview

```
User:    I would like to design a corporate website.

Claude:  Please select the volume.
         - quick (5 questions, 5 min)      → expect ~50% [pending review]
         - standard (10 questions, 10 min) → [pending review] under 30%
         - deep (20 questions, 20 min)     → [pending review] under 20%

User:    standard

Claude:  → Serve quiz-corporate-modern.html via localhost
         → Open it in a browser and answer the questions
         → Paste the output prompt back here on completion

(The user answers in the browser, copies the generated prompt, and pastes it to Claude.)

Claude:  → Parse the response prompt
         → Match against the lexicon (colors / typography / animations / parts)
         → Reference patterns (mood × use heuristics)
         → Generate DESIGN.md
         ✓ Saved to: ~/.claude/outbox/DESIGN-corporate-modern.md
```

The resulting artefacts are as follows:

```
<outbox>/
├── quiz-corporate-modern.html    # Answered quiz (preserved for history and re-editing)
└── DESIGN-corporate-modern.md    # The specification document
```

#### Quiz operation

- **Language toggle**: Switch between Japanese and English from the top-right dropdown. Answers are preserved across switches
- **Consult AI**: Use the consult button on each question to obtain interactive guidance from Claude
- **Free-form input**: When none of the presented options apply, describe the requirement in natural language. The entry is preserved as `[pending review]` on the Claude side

#### Auxiliary extraction offer (design-creator → design-extractor)

When the free-form input contains proper nouns or terms outside the lexicon (for example, "in the style of Google" or "Apple-like"), Claude offers the following:

```
The nuance of "Apple-like" is difficult to express using the lexicon alone.
If a reference URL is available, extraction can be performed. Would you like to proceed? (yes / no)
```

If the user responds `yes`, design-extractor runs in the background. The extraction result is added to the library and reflected in the subsequent DESIGN.md generation.

---

## Inspecting Output Samples

Several DESIGN.md samples are placed under `skills/design-creator/references/samples/`. Refer to this directory to preview the format of the final output.

---

## Recommended Layout for Library Accumulation

Continued use produces a personal design library with the following structure:

```
~/my-design-library/
├── sites/                          ← design-extractor output
│   ├── apple-home/
│   ├── google-store/
│   └── microsoft-corp/
└── briefs/                         ← design-creator output (organised at the user's discretion)
    ├── DESIGN-corporate-modern.md
    └── DESIGN-portfolio-minimal.md
```

The organisation policy is left to the user. Files may be moved manually from `~/.claude/outbox/`, managed under git, or otherwise as preferred.

---

## Handing DESIGN.md to the Implementation Phase

Several pathways exist for implementing the specification:

| Method | Overview |
|---|---|
| Manual implementation | Refer to DESIGN.md as a specification and implement directly in HTML / CSS / Tailwind |
| Custom skill | Build a Claude Code skill that reads DESIGN.md and produces an HTML mock |
| Other AI tools | Submit DESIGN.md to v0 / Lovable / Cursor etc. to obtain an initial draft |

DESIGN.md and INTERPRETED.md share a common section structure (Colors / Typography / Spacing / Components / Animations / Constraints), allowing implementation tooling to handle both uniformly. Only the leading section differs by purpose.

| Skill | Output file | Leading section |
|---|---|---|
| design-extractor | VANILLA.md / INTERPRETED.md | `## Meta` (source URL, extraction date) |
| design-creator | DESIGN.md | `## Intent` (Use / Mood / first-impression axis / Target / differentiation axis) |

---

## Troubleshooting

| Symptom | Resolution |
|---|---|
| `node: command not found` | Install Node.js 18 or later |
| `playwright not found` | Run `cd ~/design-workflow/skills/design-extractor && npm install && npx playwright install chromium` |
| Frequent confirmation prompts | Apply the permission merge described in Step 5 |
| Quiz fails to open with `ERR_FILE_NOT_FOUND` | The skill should launch `python3 -m http.server` automatically. If not, run `cd ~/.claude/outbox && python3 -m http.server 8765` manually |
| Claude does not recognise the skills | Verify the symlinks via `ls ~/.claude/skills/` and restart Claude Code |
| Extraction is excessively slow or times out | The target site may rely on heavyweight JavaScript. Refer to `skills/design-extractor/references/troubleshooting.md` |
| Extraction fails on Chromium (bot detection or rendering inconsistency on specific sites) | Re-run with the `BROWSER=firefox` environment variable. Example: `BROWSER=firefox node scripts/fetch.js <URL> <output-dir>`. Install the Firefox browser binary via `npx playwright install firefox` |

---

## Design Principles

### 1. Separate extraction from authoring, while permitting connection

- The extraction skill (design-extractor) handles the structured collection of reference material
- The authoring skill (design-creator) provides the process by which the user articulates their own intent
- Both adopt a common section structure. design-creator includes a path that invokes the extractor when the lexicon alone cannot satisfy the intent

### 2. Do not record values absent from the lexicon

design-creator constructs DESIGN.md exclusively from the vocabulary present in `references/lexicon/` (colors / typography / animations / parts). Free-form input from the user is preserved verbatim as `[pending review]`. This policy serves two purposes:

- Visually distinguishing "selections from the lexicon" from "user-specific requirements"
- Marking the locations where additional instructions will be required during implementation

In addition, `references/patterns/` stores heuristics on frequent mood × use combinations. Whereas the lexicon defines what is available, patterns describe what tends to be used together.

### 3. Preserve the entire quiz in the prompt

The completion prompt records every option, including those not selected. This allows Claude to incorporate the "directions that were eliminated" into its reasoning (for example, recognising that selecting dark followed an explicit comparison with light).

### 4. Avoid external dependencies

- The lexicon is composed of Google Fonts and system fonts only (Adobe Fonts and self-hosted fonts are excluded)
- Animations are based on CSS and IntersectionObserver by default (libraries such as GSAP are used only on explicit request)
- The generated DESIGN.md is designed not to reference external CDNs or image URLs

---

## Directory Structure

```
design-workflow/
├── README.md                          ← Japanese version
├── README.en.md                       ← This document
├── settings.recommended.json          ← Recommended permissions (for manual merge)
└── skills/
    ├── design-extractor/              ← URL → VANILLA.md / INTERPRETED.md
    │   ├── SKILL.md
    │   ├── package.json
    │   ├── scripts/fetch.js
    │   └── references/
    └── design-creator/                ← Quiz → DESIGN.md
        ├── SKILL.md
        ├── references/
        │   ├── question-bank.md       ← Question pool (20 items, 7 layers)
        │   ├── prompt-format.md       ← Quiz completion prompt specification
        │   ├── extractor-handoff.md   ← Auxiliary extraction offer details
        │   ├── lexicon/               ← Dictionaries: colors / typography / animations / parts
        │   ├── patterns/              ← mood × use combination heuristics
        │   ├── templates/             ← Empty DESIGN.md template
        │   └── samples/               ← Use-case samples
        └── assets/
            └── quiz.html              ← Static HTML quiz (EN / JA)
```

---

## License

MIT
