# Void Odyssey Theme

A dark color theme for **VS Code**, **Cursor**, and **Windows Terminal**, derived from the
[Void Odyssey](https://github.com/Strange-Hour) docs v2 palette.
Cyan and purple accents over a deep void-black canvas; health/state colors mapped onto
syntax tokens so the editor feels like an extension of the game's UI language.

## What's inside

```
package.json                          ─ VS Code / Cursor extension manifest
themes/void-odyssey-color-theme.json  ─ workbench colors + TextMate scopes + semantic tokens
extras/windows-terminal-scheme.json   ─ matching ANSI palette for Windows Terminal
```

## Install

### VS Code

```powershell
git clone https://github.com/Strange-Hour/VO-Code-theme.git "$env:USERPROFILE\.vscode\extensions\voidodyssey.void-odyssey-theme-1.0.0"
```

Reload the editor (`Ctrl+Shift+P` → **Developer: Reload Window**), then `Ctrl+K Ctrl+T` →
pick **Void Odyssey** from the Color Theme list.

### Cursor

Same as VS Code but clone into Cursor's extensions folder instead:

```powershell
git clone https://github.com/Strange-Hour/VO-Code-theme.git "$env:USERPROFILE\.cursor\extensions\voidodyssey.void-odyssey-theme-1.0.0"
```

Reload window → `Ctrl+K Ctrl+T` → **Void Odyssey**.

### Windows Terminal

1. Open Windows Terminal → `Ctrl+,` → click the gear icon at the bottom → **Open JSON file**.
2. Paste the object inside `extras/windows-terminal-scheme.json` into the top-level
   `"schemes": []` array.
3. Apply to a profile: under `profiles.list[]` (or `profiles.defaults` for all profiles)
   add `"colorScheme": "Void Odyssey"`.

Save the file and Windows Terminal hot-reloads.

## Palette

Single source of truth: the docs v2 tokens defined in the Void Odyssey vitepress theme.

| Token                     | Hex       | Role |
| ------------------------- | --------- | ---- |
| `--void-black`            | `#08090D` | activity bar / status bar / titlebar / chrome |
| `--void-deep`             | `#0D0F14` | editor / sidebar / panel background |
| `--void-surface`          | `#13161D` | tab strip / hover / panel header |
| `--void-surface-2`        | `#1A1E28` | list selection / ANSI black |
| `--vo-text-primary`       | `#E2E6F0` | foreground text / ANSI bright white |
| `--vo-text-secondary`     | `#8891AA` | dim chrome / preprocessor / ANSI white |
| `--vo-text-muted`         | `#4A5168` | comments / ANSI bright black |
| `--vo-text-dim`           | `#2D3242` | whitespace / inactive indent guide |
| `--cyan-glow`             | `#00F0FF` | cursor / signature accent |
| `--cyan-bright`           | `#00D4E6` | types / active borders / badges |
| `--cyan-mid`              | `#0AAFBE` | buttons / ANSI cyan |
| `--purple-glow`           | `#B48AFF` | keywords / ANSI bright purple |
| `--purple-bright`         | `#9A6EF0` | attrs / JSON keys / ANSI purple |
| `--purple-mid`            | `#7A52D1` | selection background (alpha) |
| `--health-full`           | `#2DD65B` | strings / ANSI green / git untracked |
| `--health-mid`            | `#E8C320` | ANSI yellow |
| `--health-low`            | `#F04040` | errors / ANSI red / git deleted |
| `--shield-full`           | `#4DA8FF` | numbers / ANSI blue / git modified / info |
| `--tac-primary`           | `#F0A832` | function names / debug bar / warnings |

## Syntax mapping

| Token class                            | Color          | Style |
| -------------------------------------- | -------------- | ----- |
| Comments                               | `--vo-text-muted` | italic |
| Keywords (`if`, `return`, `class`, …)  | `--purple-glow` | |
| Types, classes, namespaces, built-ins  | `--cyan-bright` | |
| Strings                                | `--health-full` | |
| String escapes                         | `#5FED83`       | |
| Numbers, `true`, `false`, `null`       | `--shield-full` | |
| Function names                         | `--tac-primary` | |
| Variables                              | `--vo-text-primary` | |
| Constants / enum members               | `#7DC4FF`       | |
| Operators / punctuation / preprocessor | `--vo-text-secondary` | |
| HTML/XML tags                          | `--purple-glow` | |
| HTML/XML attrs · JSON keys             | `--purple-bright` | |
| Markdown headings                      | `--cyan-bright` | bold |
| Markdown links                         | `--shield-full` | underline |
| Markdown inline code                   | `#5FED83`       | |
| Diff insert / delete / change          | `--health-full` / `--health-low` / `--shield-full` | |
| Invalid                                | `#FF6B6B`       | |

## Workbench highlights

- Active tab gets a `--cyan-bright` top border; cursor uses `--cyan-glow`.
- Selection is `--purple-mid` at 25% alpha — readable on dark backgrounds without overwhelming.
- Active line numbers, breadcrumbs, panel titles, and find-match highlights all share `--cyan-bright`.
- Buttons fill `--cyan-mid` with `--void-deep` text; badges match.
- Git decorations: modified `--shield-full`, untracked `--health-full`, deleted `--health-low`,
  conflicting `--tac-primary`, submodule `--purple-bright`, ignored `--vo-text-muted`.
- Errors / warnings / info: `--health-low` / `--tac-primary` / `--shield-full` (matching
  game-state colors so editor diagnostics feel native).
- Integrated terminal inherits the **same** ANSI palette as the Windows Terminal scheme,
  so `git diff`, `ls --color`, and CLI tools render identically across both apps.

## Tweaking

Single edit point: `themes/void-odyssey-color-theme.json`. Reload the window to apply.
The Windows Terminal scheme lives separately at `extras/windows-terminal-scheme.json` —
keep the two ANSI mappings in sync if you adjust them.

## Origin

The token names and hex values come from the Void Odyssey docs site theme
(`docs/.vitepress/theme/custom.css` in the parent project). This repo translates that
palette into the vocabularies VS Code and Windows Terminal expect:

- VS Code: ~140 named workbench color slots + 26 TextMate token rules + 16 semantic token rules
- Windows Terminal: 16 ANSI colors + background / foreground / cursor / selection

If the docs palette ever shifts (token rename, new accent, etc.), update the `:root` block
in the docs site, then propagate the matching hex to this repo's two JSON files.

## License

Add your preferred license — none included by default.
