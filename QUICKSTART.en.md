# Quickstart

> The proper README is [here](README.en.md). This is the lightweight version for "I just want to run it."

---

## What does this do?

Two things.

1. **Let Claude clone (analyse) someone else's site** — Pass a URL and it reads colours, fonts, animations, etc. and turns them into a spec (`.md`).
2. **Turn a client's vague request into a spec** — You answer a quiz, and Claude writes the DESIGN.md for you.

For people who often hear "make it Apple-ish" or "give it more of a trustworthy feel" at work.

---

## Roughly how it works

```
[A] URL ─→ design-extractor ─→ VANILLA.md + INTERPRETED.md
                                  │            │
                              raw data    Claude's interpretation

[B] Request ─→ Quiz answers ─→ design-creator ─→ DESIGN.md
```

A and B work independently, but if you write "make it Apple-style" mid-quiz, B will quietly call A in the background.

---

## Get it running (5 steps)

### ① Install Claude Code

The CLI tool that lets you talk to Claude.

```bash
npm install -g @anthropic-ai/claude-code
claude --version
```

> **For people scared of `-g`**: It's a global install. Disk usage is a few tens of MB. If you want it gone, `npm uninstall -g @anthropic-ai/claude-code` removes it cleanly.

The first launch asks you to log in to your Anthropic account. You need a Pro / Max plan or an API key (pay-as-you-go).

### ② Clone this repo

```bash
git clone https://github.com/MaryCache/advanced-design-md.git ~/advanced-design-md
```

You can clone anywhere. The rest of this doc assumes `~/advanced-design-md`.

### ③ Tell Claude Code about the skills

```bash
mkdir -p ~/.claude/skills
ln -s ~/advanced-design-md/skills/design-extractor ~/.claude/skills/design-extractor
ln -s ~/advanced-design-md/skills/design-creator   ~/.claude/skills/design-creator
```

> **What's `ln -s`?** It's a shortcut. Inside `~/.claude/skills/` you place a label that says "the actual files are at `~/advanced-design-md/skills/...`." If something goes wrong, `rm ~/.claude/skills/design-extractor` just removes the label and the originals are safe.

### ④ Launch Claude and say something

```bash
cd ~/advanced-design-md
claude
```

Then talk to it casually:

```
extract this site for me https://www.apple.com
```

At this point Claude will:

- Say "I'll do the first-time setup" and run `npm install` + Playwright Chromium install (first time only, 3–5 min)
- Ask "There are too many `Do you want to proceed?` confirmations — shall I merge the settings?"

Both can be answered with `yes`. Don't worry, it's safe.

### ⑤ Answer the slug question

```
Claude: Please give me a folder name (slug). Example: apple-home
You:    apple-home
```

After about 3 minutes, the artefacts appear under `~/design-library/sites/apple-home/`.

---

## Your first run (2 scenarios)

### Scenario A: Clone the Apple site

```
You:    Please extract https://www.apple.com
Claude: What's the slug?
You:    apple-home
Claude: (wait ~3 min)
        ✓ apple-home/VANILLA.md generated
        ✓ apple-home/INTERPRETED.md generated
```

### Scenario B: Lift a client project from a quiz

```
You:    I want to make a corporate site for a cosmetics brand
Claude: Volume? quick (5 questions) / standard (10) / deep (20)
You:    standard
Claude: Open this in your browser to answer → http://localhost:8765/quiz-xxx.html
```

Click through the answers in the browser. When you're done, copy the **completion prompt** and paste it into Claude.

> **What to copy**: After you press "Done → Generate Prompt", a long block of text starting with `# Design Brief — 2026-...` appears at the bottom of the page. **Select everything from `# Design Brief` to the end** and paste it into Claude (the page also auto-copies to your clipboard, but you can verify visually).

```
Claude: (wait 1–2 min)
        ✓ ~/.claude/outbox/DESIGN-cosmetics.md generated
```

---

## Terms you probably don't recognise

| Term | Plain meaning |
|---|---|
| **VANILLA.md** | The **raw data** pulled from a site (colour values, CSS variables, keyframes — verbatim) |
| **INTERPRETED.md** | VANILLA after Claude **reads it and assigns meaning**. Comes with calls like "this blue is the accent" |
| **DESIGN.md** | A **fresh spec** generated from the quiz. Starts with Intent (purpose) |
| **lexicon** | The **dictionary of vocabulary the skill knows** (colours / fonts / animations / parts). Words outside it aren't invented on the fly |
| **patterns** | **Heuristic notes** like "for dark × LP, this combo shows up a lot" |
| **Intent / Use / Mood** | The opening section of the spec. What the site is for / what kind of mood |
| **`[pending review]`** | Where Claude **couldn't pick from the dictionary**. Not a bug. It means "let a human decide here" |

### Lots of `[pending review]` — should I be worried?

That's by design. Claude operates under a "no values outside the lexicon" rule so it doesn't lie. `[pending review]` doesn't mean "couldn't figure it out" — it means "deliberately did not decide."

For `quick`, around half is normal. For `standard`, expect under 30%.

### What happens if I write "Apple-style"?

If the free-form input contains a proper noun or a word outside the lexicon, Claude will say:

```
The nuance of "Apple-style" is hard to express with the lexicon alone.
If you have a reference URL, I can extract it. Want to proceed? (yes / no)
```

Saying `yes` triggers **Scenario A's extraction in the background**, then incorporates the result into the DESIGN.md.

---

## Where do files end up?

| Type | Location |
|---|---|
| Claude Code settings | `~/.claude/settings.json` |
| Skill registration (symlink) | `~/.claude/skills/design-extractor` `~/.claude/skills/design-creator` |
| Extraction output (URL → md) | `~/design-library/sites/{slug}/` (overridable via env var) |
| Quiz and DESIGN.md | `~/.claude/outbox/` (overridable via env var) |
| Skill source | `~/advanced-design-md/skills/` |

---

## When you get stuck

| Symptom | Fix |
|---|---|
| `claude` does nothing | Check `claude --version`. Nothing? → redo step ① |
| Claude isn't using the skills | `ls ~/.claude/skills/` — are both there? Quit with Ctrl+C and run `claude` again |
| `Do you want to proceed?` keeps appearing | Tell Claude "merge the settings", or apply README Step 5 by hand |
| Quiz fails with `ERR_FILE_NOT_FOUND` in the browser | The skill should run `python3 -m http.server`. Verify you're opening `http://localhost:8765/...` |
| Extraction takes more than 5 min | The site's JS is probably heavy. Ctrl+C and try a different URL |
| Adding env vars in zsh | Append to `~/.zshrc`, run `source ~/.zshrc` |
| Adding env vars in bash | Append to `~/.bashrc`, run `source ~/.bashrc` |
| Don't know which shell you use | `echo $SHELL` |

---

## To remove everything

```bash
# Unregister skills
rm ~/.claude/skills/design-extractor
rm ~/.claude/skills/design-creator

# Delete the repo
rm -rf ~/advanced-design-md

# Uninstall Claude Code itself
npm uninstall -g @anthropic-ai/claude-code
```

`~/design-library/` and `~/.claude/outbox/` are left alone (they may contain output you want to keep — auto-deleting is intentionally avoided).

---

## Do I need internet?

| Skill | Internet |
|---|---|
| design-extractor | **Required** (to fetch URLs) |
| design-creator | The quiz and answer parsing work offline. Claude itself needs API access, so internet is needed in the end |

> **Security note**: design-extractor lets Playwright run `fetch` inside the target page. **Do not aim it at authenticated business pages or internal tools.** Public sites only. See [README.en.md Security Notice](README.en.md#security-notice) for details.

---

## Roughly how long?

| Operation | Time |
|---|---|
| Initial setup (① – ③) | 5–10 min |
| First Playwright install | 3–5 min (1 second after caching) |
| Extracting one site | 1–3 min (5+ min if JS is heavy) |
| Filling out a `standard` quiz | 10–15 min |
| Generating DESIGN.md | 1–2 min |

API costs depend on your Claude Code plan and usage. See [Anthropic pricing](https://www.anthropic.com/pricing).

---

## Want more?

- The proper spec: [README.en.md](README.en.md)
- Japanese version: [README.md](README.md)
- The skills themselves: `skills/design-extractor/SKILL.md` / `skills/design-creator/SKILL.md`

If you're stuck, the fastest path is to ask Claude itself: "read the README and help me out."
