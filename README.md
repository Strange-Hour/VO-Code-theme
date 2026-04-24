# Void Odyssey Theme

A dark color theme for **VS Code**, **Cursor**, **Windows Terminal**, **Ghostty**, and **Claude Code**, derived from the
[Void Odyssey](https://github.com/Strange-Hour) docs v2 palette.
Cyan and purple accents over a deep void-black canvas; health/state colors mapped onto
syntax tokens so the editor feels like an extension of the game's UI language.

## What's inside

```
palette.json                            ─ single source of truth: 24 named tokens → hex
tools/build.mjs                         ─ generator: substitutes {{token}} markers in *.tmpl files
package.json                            ─ VS Code / Cursor extension manifest
themes/
  void-odyssey-color-theme.tmpl         ─ template (edit this, then npm run build)
  void-odyssey-color-theme.json         ─ generated workbench + TextMate + semantic tokens
extras/
  windows-terminal-scheme.tmpl          ─ template
  windows-terminal-scheme.json          ─ generated ANSI palette for Windows Terminal
  ghostty-theme.tmpl                    ─ template
  ghostty-theme.conf                    ─ generated color + appearance theme for Ghostty
  claude-code-theme.tmpl                ─ template
  claude-code-theme.json                ─ generated custom theme for Claude Code CLI
CHANGELOG.md                            ─ versioned change history
```

Generated files are committed so users can install without running the build step.
If you change `palette.json`, run `npm run build` and commit the regenerated JSON alongside.

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

### Ghostty

**macOS** config lives in `~/Library/Application Support/com.mitchellh.ghostty/`.
**Linux** config lives in `~/.config/ghostty/`.

1. From the repo root, copy the generated theme file to Ghostty's themes directory:

   macOS:
   ```sh
   cp extras/ghostty-theme.conf ~/Library/Application\ Support/com.mitchellh.ghostty/themes/"Void Odyssey"
   ```
   Linux:
   ```sh
   cp extras/ghostty-theme.conf ~/.config/ghostty/themes/"Void Odyssey"
   ```
2. Add the following line to your Ghostty config file:
   ```
   theme = Void Odyssey
   ```
3. Restart Ghostty to apply. (Config reload does not re-scan the themes directory.)

The theme file includes appearance settings (opacity, blur, cursor style, font size) as
sensible defaults — override any of them in your Ghostty config after the `theme` line.

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

The same hex codes feed every output (VS Code workbench, VS Code tokens, semantic tokens,
Windows Terminal ANSI palette). Edit one place; rebuild; everything stays in sync.

```powershell
# 1. Edit a token value
notepad palette.json   # change e.g. "cyan-bright" : "#00D4E6"

# 2. Regenerate every derived file
npm run build

# 3. Reload your editor (or terminal) to see the change
```

If you want to remap a slot rather than retune a hex (say, route Markdown headings through
`--purple-glow` instead of `--cyan-bright`), edit the `.tmpl` files in `themes/` and `extras/`,
then `npm run build`. Templates use `{{token-name}}` markers — the build fails loudly if a
template references a token that doesn't exist in `palette.json`.

## Tab colors (file-type extension)

VS Code's theme API does not expose per-file-type tab colors natively. To get them, install
a third-party extension such as **colorize-tabs** or **Peacock** that accepts custom color
rules, then paste the mappings below. These hex values are lifted directly from `palette.json`
so they stay on-brand with the rest of the theme.

| File type | Token | Hex |
| --------- | ----- | --- |
| TypeScript / TSX | `--cyan-bright` | `#00D4E6` |
| JavaScript / JSX | `--shield-bright` | `#7DC4FF` |
| CSS / SCSS / Less | `--purple-bright` | `#9A6EF0` |
| HTML | `--purple-glow` | `#B48AFF` |
| JSON / YAML | `--tac-primary` | `#F0A832` |
| Markdown | `--comment` | `#7ABFA8` |
| Python | `--shield-full` | `#4DA8FF` |
| C / C++ | `--purple-mid` | `#7A52D1` |
| Test files (`*.test.*`, `*.spec.*`) | `--health-full` | `#2DD65B` |

## C++ / Unreal note

The theme adds a dedicated rule for C/C++ preprocessor function-like macros (the scope
`entity.name.function.preprocessor.cpp` and friends), painting them in `--purple-mid`.
This visually separates Unreal scaffolding macros (`UCLASS`, `UFUNCTION`, `UPROPERTY`,
`USTRUCT`, `UENUM`, `UMETA`, …) from your actual function calls (which stay `--tac-primary`
amber). If you spot a macro that isn't picking up the rule, `Ctrl+Shift+P` →
**Developer: Inspect Editor Tokens and Scopes** on the symbol will show its real scope —
add that scope to the rule's `scope` array in the template and rebuild.

## Origin

The token names and hex values come from the Void Odyssey docs site theme
(`docs/.vitepress/theme/custom.css` in the parent project). This repo translates that
palette into the vocabularies VS Code, Windows Terminal, and Ghostty expect:

- VS Code: ~140 named workbench color slots + 26 TextMate token rules + 16 semantic token rules
- Windows Terminal: 16 ANSI colors + background / foreground / cursor / selection
- Ghostty: 16 ANSI colors + background / foreground / cursor / selection + appearance settings (opacity, blur, cursor, font)
- Claude Code: 30 theme color tokens mapped to the Void Odyssey palette

If the docs palette ever shifts (token rename, new accent, etc.), update the `:root` block
in the docs site, then propagate the matching hex to this repo's four output files.

## License

Add your preferred license — none included by default.
