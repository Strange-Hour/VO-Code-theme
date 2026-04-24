# Claude Code CLI Theme Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Void Odyssey Claude Code CLI custom theme to the repo, generated from `palette.json` via the existing build pipeline, and install it locally.

**Architecture:** Add `extras/claude-code-theme.tmpl` to the build pipeline alongside the Windows Terminal and Ghostty extras. Output is `extras/claude-code-theme.json` (valid JSON, so `validate: true`). Install step copies the generated file to `~/.claude/themes/void-odyssey.json` and sets `"theme": "custom:void-odyssey"` in `~/.claude/settings.json`.

**Tech Stack:** Node.js ESM (`build.mjs`), Claude Code custom theme JSON format, existing `palette.json` token system.

---

### Task 1: Add claude-code-theme to build pipeline and create template

**Files:**
- Modify: `tools/build.mjs` (targets array)
- Create: `extras/claude-code-theme.tmpl`
- Generated: `extras/claude-code-theme.json`

**Step 1: Add target to build.mjs**

Open `tools/build.mjs`. In the `targets` array, add a new entry after the Ghostty target:

```js
{
    template: "extras/claude-code-theme.tmpl",
    output: "extras/claude-code-theme.json",
    validate: true,
},
```

The full targets array should now have 4 entries: VS Code theme, Windows Terminal, Ghostty, and Claude Code.

**Step 2: Create the template file**

Create `extras/claude-code-theme.tmpl` with this exact content:

```json
{
    "name": "Void Odyssey",
    "base": "dark",
    "overrides": {
        "claude": "{{cyan-bright}}",
        "claudeShimmer": "{{cyan-mid}}",
        "text": "{{vo-text-primary}}",
        "inverseText": "{{void-deep}}",
        "subtle": "{{vo-text-muted}}",
        "inactive": "{{vo-text-muted}}",
        "suggestion": "{{vo-text-secondary}}",
        "background": "{{void-deep}}",
        "border": "{{void-surface-2}}",
        "promptBorder": "{{cyan-bright}}",
        "bashBorder": "{{void-surface-2}}",
        "header": "{{cyan-bright}}",
        "error": "{{health-low}}",
        "success": "{{health-full}}",
        "warning": "{{tac-primary}}",
        "info": "{{shield-full}}",
        "permission": "{{purple-glow}}",
        "permissionShimmer": "{{purple-bright}}",
        "planMode": "{{purple-mid}}",
        "autoAccept": "{{health-full}}",
        "remember": "{{comment}}",
        "diffAdded": "{{health-full}}",
        "diffRemoved": "{{health-low}}",
        "diffAddedWord": "{{health-bright}}",
        "diffRemovedWord": "{{dps-bright}}",
        "diffAddedDimmed": "{{health-mid}}",
        "diffRemovedDimmed": "{{vo-text-muted}}",
        "userMessageBackground": "{{void-surface}}",
        "bashMessageBackgroundColor": "{{void-surface}}",
        "memoryBackgroundColor": "{{void-surface-2}}"
    }
}
```

**Step 3: Run the build**

Run: `npm run build`

Expected output:
```
void-odyssey-theme · build
  themes/void-odyssey-color-theme.json
  extras/windows-terminal-scheme.json
  extras/ghostty-theme.conf
  extras/claude-code-theme.json
done. 4 files generated from 25 tokens.
```

**Step 4: Verify the generated file**

Run: `grep '{{' extras/claude-code-theme.json`

Expected: no output (zero unresolved tokens).

Run: `cat extras/claude-code-theme.json | python3 -m json.tool > /dev/null && echo "valid JSON"`

Expected: `valid JSON`

Spot-check a few values:
- `"claude": "#00D4E6"` (cyan-bright)
- `"error": "#F04040"` (health-low)
- `"remember": "#7ABFA8"` (comment)

**Step 5: Commit**

```bash
git add tools/build.mjs extras/claude-code-theme.tmpl extras/claude-code-theme.json
git commit -m "feat: add Claude Code CLI theme to extras/"
```

Do NOT include Co-Authored-By lines.

---

### Task 2: Update README with Claude Code install instructions

**Files:**
- Modify: `README.md`

**Step 1: Add Claude Code install section**

In `README.md`, find the `### Ghostty` install section. Insert a new `### Claude Code` section directly AFTER the Ghostty section (and before `## Palette`).

Add this exact content:

```markdown
### Claude Code

1. From the repo root, copy the generated theme file to Claude Code's themes directory:
   ```sh
   cp extras/claude-code-theme.json ~/.claude/themes/void-odyssey.json
   ```
2. Add or update the `theme` key in `~/.claude/settings.json`:
   ```json
   {
     "theme": "custom:void-odyssey"
   }
   ```
3. The theme is applied immediately — no restart required.
```

**Step 2: Update the "What's inside" file tree**

Find the `extras/` block in the `What's inside` section and add two new lines:

```
extras/
  windows-terminal-scheme.tmpl          ─ template
  windows-terminal-scheme.json          ─ generated ANSI palette for Windows Terminal
  ghostty-theme.tmpl                    ─ template
  ghostty-theme.conf                    ─ generated color + appearance theme for Ghostty
  claude-code-theme.tmpl                ─ template
  claude-code-theme.json                ─ generated custom theme for Claude Code CLI
```

**Step 3: Update the tagline (line 3)**

The current tagline includes VS Code, Cursor, Windows Terminal, and Ghostty. Add Claude Code:

Current:
```
A dark color theme for **VS Code**, **Cursor**, **Windows Terminal**, and **Ghostty**, derived from the
```

Change to:
```
A dark color theme for **VS Code**, **Cursor**, **Windows Terminal**, **Ghostty**, and **Claude Code**, derived from the
```

**Step 4: Update the Origin section**

Find the bullet list in `## Origin` that lists the outputs. Add a Claude Code entry:

```
- Claude Code: 30 theme color tokens mapped to the Void Odyssey palette
```

Also update any reference to "three output files" → "four output files".

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs: add Claude Code install instructions to README"
```

Do NOT include Co-Authored-By lines.

---

### Task 3: Install theme locally and activate it

**Files:**
- Write: `~/.claude/themes/void-odyssey.json`
- Modify: `~/.claude/settings.json`

**Step 1: Create themes directory and install theme**

```bash
mkdir -p ~/.claude/themes
cp /Users/sylvia.hart/.cursor/extensions/voidodyssey.void-odyssey-theme-1.1.0/extras/claude-code-theme.json ~/.claude/themes/void-odyssey.json
```

Verify: `cat ~/.claude/themes/void-odyssey.json | python3 -m json.tool > /dev/null && echo "installed OK"`

Expected: `installed OK`

**Step 2: Read current settings.json**

Read `~/.claude/settings.json` to see the current content before modifying.

**Step 3: Update theme in settings.json**

Find the current `"theme"` key in `~/.claude/settings.json` (currently set to `"dark-ansi"` or similar) and change its value to `"custom:void-odyssey"`.

If the file has:
```json
"theme": "dark-ansi"
```
Change to:
```json
"theme": "custom:void-odyssey"
```

If no `"theme"` key exists, add it to the JSON object.

**Step 4: Verify**

Run: `grep '"theme"' ~/.claude/settings.json`

Expected: `"theme": "custom:void-odyssey"`

No commit needed for this task — these are local user config files outside the repo.

---

### Task 4: Bump version to 1.8.0 and update CHANGELOG

**Files:**
- Modify: `package.json` — version field
- Modify: `CHANGELOG.md` — add 1.8.0 entry at top

**Step 1: Bump version in package.json**

Change `"version": "1.7.0"` to `"version": "1.8.0"`.

**Step 2: Add CHANGELOG entry**

At the very top of the versions list in `CHANGELOG.md` (right after the `# Changelog` heading), add:

```markdown
## 1.8.0 — 2026-04-24

Claude Code CLI custom theme.

### Added

- `extras/claude-code-theme.tmpl` + `extras/claude-code-theme.json` — Claude Code CLI
  custom theme using the full Void Odyssey palette. 30 color tokens mapped across UI
  elements, status colors, diff highlighting, and permission dialogs. Activate with
  `"theme": "custom:void-odyssey"` in `~/.claude/settings.json`.

### Changed

- `tools/build.mjs` — fourth target added for Claude Code theme (JSON output, validate: true).
- `README.md` — Claude Code install section added; tagline and Origin section updated.
```

**Step 3: Commit and push**

```bash
git add package.json CHANGELOG.md
git commit -m "v1.8.0 — Claude Code CLI theme"
git push
```

Do NOT include Co-Authored-By lines.

---

### Verification

After all tasks complete:

- [ ] `npm run build` produces four files with no errors
- [ ] `grep '{{' extras/claude-code-theme.json` returns no output
- [ ] 30 token overrides present in generated file
- [ ] `~/.claude/themes/void-odyssey.json` exists and is valid JSON
- [ ] `~/.claude/settings.json` has `"theme": "custom:void-odyssey"`
- [ ] README has Claude Code install section
- [ ] `package.json` version is `1.8.0`
- [ ] `git log --oneline -5` shows all commits
- [ ] `git push` succeeded
