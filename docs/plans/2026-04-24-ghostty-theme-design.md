# Ghostty Theme — Design

**Date:** 2026-04-24

## Goal

Add a Ghostty terminal theme to the Void Odyssey repo, matching the VS Code theme palette and including appearance settings (opacity, blur, cursor style, font size). Generated via the existing template build pipeline so palette changes propagate automatically.

## Approach

Extend `build.mjs` with a `validate` flag per target to support non-JSON output formats. Add `extras/ghostty-theme.tmpl` using the same `{{token-name}}` substitution as the Windows Terminal scheme. Output to `extras/ghostty-theme.conf`.

## Build Pipeline Changes

**`tools/build.mjs`:**
- Add `validate: false` to each target entry (existing targets default to `true`)
- Skip `JSON.parse` validation when `validate` is false
- Add `{ template: "extras/ghostty-theme.tmpl", output: "extras/ghostty-theme.conf", validate: false }` to targets array

## Color Mapping

Same ANSI palette as `extras/windows-terminal-scheme.tmpl`:

| Ghostty key | Palette token | Hex |
|---|---|---|
| `background` | `void-deep` | `#0D0F14` |
| `foreground` | `vo-text-primary` | `#E2E6F0` |
| `cursor-color` | `cyan-glow` | `#00F0FF` |
| `selection-background` | `purple-mid` | `#7A52D1` |
| `palette = 0` | `void-surface-2` | `#1A1E28` |
| `palette = 1` | `health-low` | `#F04040` |
| `palette = 2` | `health-full` | `#2DD65B` |
| `palette = 3` | `health-mid` | `#E8C320` |
| `palette = 4` | `shield-full` | `#4DA8FF` |
| `palette = 5` | `purple-bright` | `#9A6EF0` |
| `palette = 6` | `cyan-mid` | `#0AAFBE` |
| `palette = 7` | `vo-text-secondary` | `#8891AA` |
| `palette = 8` | `vo-text-muted` | `#4A5168` |
| `palette = 9` | `dps-bright` | `#FF6B6B` |
| `palette = 10` | `health-bright` | `#5FED83` |
| `palette = 11` | `tac-bright` | `#FFC44D` |
| `palette = 12` | `shield-bright` | `#7DC4FF` |
| `palette = 13` | `purple-glow` | `#B48AFF` |
| `palette = 14` | `cyan-bright` | `#00D4E6` |
| `palette = 15` | `vo-text-primary` | `#E2E6F0` |

## Appearance Settings

| Setting | Value | Rationale |
|---|---|---|
| `background-opacity` | `0.95` | Slight transparency for depth |
| `background-blur-radius` | `20` | Frosted glass blur when opacity < 1 |
| `cursor-style` | `block` | Solid block cursor, consistent with theme aesthetic |
| `cursor-style-blink` | `false` | No distraction |
| `font-size` | `13` | Sensible default, easy to override locally |
| `minimum-contrast` | `1.1` | Nudges dim colors up if unreadable |

## File Structure

```
extras/
  windows-terminal-scheme.tmpl   (existing)
  windows-terminal-scheme.json   (existing)
  ghostty-theme.tmpl             (new)
  ghostty-theme.conf             (new — generated)
docs/
  plans/
    2026-04-24-ghostty-theme-design.md
```

## README Addition

New "Ghostty" install section:
1. Copy `extras/ghostty-theme.conf` to `~/.config/ghostty/themes/Void Odyssey`
2. Add `theme = Void Odyssey` to `~/.config/ghostty/config`

## Success Criteria

- `npm run build` generates `extras/ghostty-theme.conf` without errors
- All 16 ANSI palette entries present
- Appearance settings present and valid
- README install instructions added
- CHANGELOG and version bumped to 1.7.0
