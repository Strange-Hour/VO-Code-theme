# Claude Code CLI Theme — Design

**Date:** 2026-04-24

## Goal

Add a Claude Code CLI custom theme to the Void Odyssey repo, matching the VS Code and Ghostty themes. Generated via the existing template build pipeline so palette changes propagate automatically. Installed to `~/.claude/themes/void-odyssey.json` and activated via `settings.json`.

## Approach

Add `extras/claude-code-theme.tmpl` to the build pipeline (same `{{token-name}}` substitution as Windows Terminal and Ghostty). Output is `extras/claude-code-theme.json`. The build target uses `validate: true` since the output is valid JSON. Install step copies the generated file to `~/.claude/themes/void-odyssey.json` and sets `"theme": "custom:void-odyssey"` in `~/.claude/settings.json`.

## Build Pipeline

Add to `tools/build.mjs` targets:
```js
{
  template: "extras/claude-code-theme.tmpl",
  output: "extras/claude-code-theme.json",
  validate: true,
}
```

## Theme File Structure

```json
{
  "name": "Void Odyssey",
  "base": "dark",
  "overrides": { ... }
}
```

## Token Mapping

| Token | Palette token | Hex | Rationale |
|---|---|---|---|
| `claude` | `cyan-bright` | `#00D4E6` | Main accent — matches types/active borders in editor |
| `claudeShimmer` | `cyan-mid` | `#0AAFBE` | Slightly dimmer cyan for shimmer animation |
| `text` | `vo-text-primary` | `#E2E6F0` | Primary text |
| `inverseText` | `void-deep` | `#0D0F14` | Text on colored backgrounds |
| `subtle` | `vo-text-muted` | `#4A5168` | Muted / inactive |
| `inactive` | `vo-text-muted` | `#4A5168` | Inactive state |
| `suggestion` | `vo-text-secondary` | `#8891AA` | Dim suggestions |
| `background` | `void-deep` | `#0D0F14` | Canvas |
| `border` | `void-surface-2` | `#1A1E28` | General borders |
| `promptBorder` | `cyan-bright` | `#00D4E6` | Input prompt — cyan focus ring |
| `bashBorder` | `void-surface-2` | `#1A1E28` | Tool output border |
| `header` | `cyan-bright` | `#00D4E6` | Section headers |
| `error` | `health-low` | `#F04040` | Errors |
| `success` | `health-full` | `#2DD65B` | Success |
| `warning` | `tac-primary` | `#F0A832` | Warnings |
| `info` | `shield-full` | `#4DA8FF` | Info |
| `permission` | `purple-glow` | `#B48AFF` | Permission dialogs |
| `permissionShimmer` | `purple-bright` | `#9A6EF0` | Permission shimmer |
| `planMode` | `purple-mid` | `#7A52D1` | Plan mode indicator |
| `autoAccept` | `health-full` | `#2DD65B` | Auto-accept indicator |
| `remember` | `comment` | `#7ABFA8` | Memory/context — sage teal (matches code comments) |
| `diffAdded` | `health-full` | `#2DD65B` | Added lines |
| `diffRemoved` | `health-low` | `#F04040` | Removed lines |
| `diffAddedWord` | `health-bright` | `#5FED83` | Word-level add highlight |
| `diffRemovedWord` | `dps-bright` | `#FF6B6B` | Word-level remove highlight |
| `diffAddedDimmed` | `health-mid` | `#E8C320` | Dimmed added |
| `diffRemovedDimmed` | `vo-text-muted` | `#4A5168` | Dimmed removed |
| `userMessageBackground` | `void-surface` | `#13161D` | User message background |
| `bashMessageBackgroundColor` | `void-surface` | `#13161D` | Tool output background |
| `memoryBackgroundColor` | `void-surface-2` | `#1A1E28` | Memory block background |

## File Structure

```
extras/
  claude-code-theme.tmpl     (new — template)
  claude-code-theme.json     (new — generated)
```

## Install

1. Copy `extras/claude-code-theme.json` to `~/.claude/themes/void-odyssey.json`
2. Set `"theme": "custom:void-odyssey"` in `~/.claude/settings.json`

## README Addition

New "Claude Code" section under Install, with platform-agnostic cp command and settings.json snippet.

## Success Criteria

- `npm run build` generates `extras/claude-code-theme.json` without errors
- All 30 token overrides present in generated file
- No `{{` markers remaining in generated file
- File installed to `~/.claude/themes/void-odyssey.json`
- `~/.claude/settings.json` updated to `"theme": "custom:void-odyssey"`
- README install section added
- CHANGELOG and version bumped to 1.8.0
