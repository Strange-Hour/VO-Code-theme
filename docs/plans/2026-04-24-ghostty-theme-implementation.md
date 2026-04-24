# Ghostty Theme Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Ghostty terminal theme to `extras/` that is generated from `palette.json` via `npm run build`, matching the VS Code theme colors and including Ghostty-specific appearance settings.

**Architecture:** Extend `build.mjs` with a per-target `validate` flag so non-JSON outputs skip the `JSON.parse` check. Add `extras/ghostty-theme.tmpl` using the same `{{token-name}}` substitution system. The rendered `.conf` file is committed alongside the template so users can install without running the build.

**Tech Stack:** Node.js ESM (`build.mjs`), Ghostty key=value config format, existing `palette.json` token system.

---

### Task 1: Extend build.mjs to support non-JSON outputs

**Files:**
- Modify: `tools/build.mjs:20-29` (targets array and render function)

**Step 1: Add `validate` flag to existing targets and update render()**

Open `tools/build.mjs`. Make these two changes:

Change the targets array from:
```js
const targets = [
    {
        template: "themes/void-odyssey-color-theme.tmpl",
        output: "themes/void-odyssey-color-theme.json",
    },
    {
        template: "extras/windows-terminal-scheme.tmpl",
        output: "extras/windows-terminal-scheme.json",
    },
];
```

To:
```js
const targets = [
    {
        template: "themes/void-odyssey-color-theme.tmpl",
        output: "themes/void-odyssey-color-theme.json",
        validate: true,
    },
    {
        template: "extras/windows-terminal-scheme.tmpl",
        output: "extras/windows-terminal-scheme.json",
        validate: true,
    },
    {
        template: "extras/ghostty-theme.tmpl",
        output: "extras/ghostty-theme.conf",
        validate: false,
    },
];
```

Then update the `render` function signature and JSON validation block from:
```js
function render({ template, output }) {
    ...
    try {
        JSON.parse(rendered);
    } catch (err) {
        throw new Error(`${output}: rendered file is not valid JSON.\n${err.message}`);
    }
```

To:
```js
function render({ template, output, validate = true }) {
    ...
    if (validate) {
        try {
            JSON.parse(rendered);
        } catch (err) {
            throw new Error(`${output}: rendered file is not valid JSON.\n${err.message}`);
        }
    }
```

**Step 2: Verify existing build still works**

Run: `npm run build`

Expected output:
```
void-odyssey-theme · build
  themes/void-odyssey-color-theme.json
  extras/windows-terminal-scheme.json
  extras/ghostty-theme.conf
done. 3 files generated from 25 tokens.
```

Note: This will fail because `extras/ghostty-theme.tmpl` doesn't exist yet. That's expected — we'll create it in Task 2. If the error is specifically "ENOENT: no such file or directory, open '.../extras/ghostty-theme.tmpl'", the build.mjs changes are correct. Any other error means something is wrong with the build.mjs edits.

**Step 3: Commit**

```bash
git add tools/build.mjs
git commit -m "build: support non-JSON output targets via validate flag"
```

---

### Task 2: Create the Ghostty theme template

**Files:**
- Create: `extras/ghostty-theme.tmpl`

**Step 1: Create the template file**

Create `extras/ghostty-theme.tmpl` with this exact content:

```
# Void Odyssey — Ghostty terminal theme
# Generated from palette.json via `npm run build`.
# Install: copy this file to ~/.config/ghostty/themes/Void\ Odyssey
# Then add `theme = Void Odyssey` to ~/.config/ghostty/config

# Base colors
background = {{void-deep}}
foreground = {{vo-text-primary}}
cursor-color = {{cyan-glow}}
selection-background = {{purple-mid}}
selection-foreground = {{vo-text-primary}}

# Appearance
background-opacity = 0.95
background-blur-radius = 20
cursor-style = block
cursor-style-blink = false
font-size = 13
minimum-contrast = 1.1

# ANSI palette
# Normal colors
palette = 0={{void-surface-2}}
palette = 1={{health-low}}
palette = 2={{health-full}}
palette = 3={{health-mid}}
palette = 4={{shield-full}}
palette = 5={{purple-bright}}
palette = 6={{cyan-mid}}
palette = 7={{vo-text-secondary}}
# Bright colors
palette = 8={{vo-text-muted}}
palette = 9={{dps-bright}}
palette = 10={{health-bright}}
palette = 11={{tac-bright}}
palette = 12={{shield-bright}}
palette = 13={{purple-glow}}
palette = 14={{cyan-bright}}
palette = 15={{vo-text-primary}}
```

**Step 2: Run the build**

Run: `npm run build`

Expected output:
```
void-odyssey-theme · build
  themes/void-odyssey-color-theme.json
  extras/windows-terminal-scheme.json
  extras/ghostty-theme.conf
done. 3 files generated from 25 tokens.
```

**Step 3: Verify the generated file**

Run: `cat extras/ghostty-theme.conf`

Check that:
- All `{{token-name}}` markers are replaced with hex values (no `{{` remaining)
- `background = #0D0F14` (void-deep)
- `foreground = #E2E6F0` (vo-text-primary)
- `cursor-color = #00F0FF` (cyan-glow)
- `palette = 0=#1A1E28` (void-surface-2)
- `palette = 14=#00D4E6` (cyan-bright)

Run: `grep '{{' extras/ghostty-theme.conf`

Expected: no output (no unresolved tokens).

**Step 4: Commit**

```bash
git add extras/ghostty-theme.tmpl extras/ghostty-theme.conf
git commit -m "feat: add Ghostty terminal theme to extras/"
```

---

### Task 3: Update README with Ghostty install instructions

**Files:**
- Modify: `README.md` — add Ghostty section under "Install"

**Step 1: Add Ghostty install section**

In `README.md`, find the "### Windows Terminal" install section. Insert a new "### Ghostty" section directly after the Windows Terminal section (before the "## Palette" section).

Add:
```markdown
### Ghostty

1. Copy the generated theme file to Ghostty's themes directory:
   ```sh
   cp extras/ghostty-theme.conf ~/.config/ghostty/themes/"Void Odyssey"
   ```
2. Add the following line to `~/.config/ghostty/config`:
   ```
   theme = Void Odyssey
   ```
3. Restart Ghostty (or reload config with the keybind) to apply.

The theme file includes appearance settings (opacity, blur, cursor style, font size) as
sensible defaults — override any of them in your main `~/.config/ghostty/config` after
the `theme` line.
```

**Step 2: Also update the "What's inside" file tree**

Find the existing file tree block in `README.md`:
```
extras/
  windows-terminal-scheme.tmpl          ─ template
  windows-terminal-scheme.json          ─ generated ANSI palette for Windows Terminal
```

Update it to:
```
extras/
  windows-terminal-scheme.tmpl          ─ template
  windows-terminal-scheme.json          ─ generated ANSI palette for Windows Terminal
  ghostty-theme.tmpl                    ─ template
  ghostty-theme.conf                    ─ generated color + appearance theme for Ghostty
```

**Step 3: Commit**

```bash
git add README.md
git commit -m "docs: add Ghostty install instructions to README"
```

---

### Task 4: Bump version and update CHANGELOG

**Files:**
- Modify: `package.json` — version field
- Modify: `CHANGELOG.md` — add 1.7.0 entry at top

**Step 1: Bump version in package.json**

Change `"version": "1.6.0"` to `"version": "1.7.0"`.

**Step 2: Add CHANGELOG entry**

At the top of the `## [versions]` list in `CHANGELOG.md`, add:

```markdown
## 1.7.0 — 2026-04-24

Ghostty terminal theme and build pipeline extension.

### Added

- `extras/ghostty-theme.tmpl` + `extras/ghostty-theme.conf` — Ghostty color theme using
  the full Void Odyssey palette. Includes ANSI colors (matching the Windows Terminal scheme),
  plus Ghostty-specific appearance settings: `background-opacity = 0.95`,
  `background-blur-radius = 20`, block cursor, `font-size = 13`, `minimum-contrast = 1.1`.

### Changed

- `tools/build.mjs` — targets now carry a `validate` flag (default `true`). When `false`,
  the JSON parse check is skipped, enabling non-JSON output formats. Existing JSON targets
  are unaffected.
- `README.md` — Ghostty install section added; file tree updated.
```

**Step 3: Commit and push**

```bash
git add package.json CHANGELOG.md
git commit -m "v1.7.0 — Ghostty theme + build pipeline non-JSON support"
git push
```

---

### Verification

After all tasks complete:

- [ ] `npm run build` produces three files with no errors
- [ ] `extras/ghostty-theme.conf` contains no unresolved `{{token}}` markers
- [ ] All 16 palette entries (0–15) present in the conf file
- [ ] Appearance settings (opacity, blur, cursor, font-size, minimum-contrast) present
- [ ] README has Ghostty install section
- [ ] `package.json` version is `1.7.0`
- [ ] `git log --oneline -5` shows all four commits
- [ ] `git push` succeeded
