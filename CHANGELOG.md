# Changelog

## 1.1.0 — 2026-04-24

Polish pass + build pipeline. No palette changes; same colors driven from a single source.

### Added
- **`palette.json` source of truth** — 24 named tokens (one per docs palette token) feed
  every generated artifact. Edit one place; rebuild; theme + WT scheme stay in sync.
- **`tools/build.mjs` generator** — substitutes `{{token-name}}` markers in `*.tmpl` files,
  validates the result is parseable JSON, and fails loudly if a template references an
  unknown token. Run via `npm run build`.
- **Bracket pair colorization** (`editorBracketHighlight.foreground1..6` +
  `editorBracketPairGuide.background1..6` + active variants). Rotation:
  `--cyan-bright → --purple-glow → --tac-primary → --health-full → --shield-full → --dps-bright`.
  Unmatched brackets get `--health-low`. Previously fell back to VS Code defaults.
- **Inlay hint styling** — `editorInlayHint.{background,foreground,typeBackground,
  typeForeground,parameterBackground,parameterForeground}` now use palette tokens.
  Type hints in `--cyan-bright` (matches the type/class color elsewhere); parameter hints
  in `--vo-text-secondary` on `--void-surface`. Previously fell back to VS Code defaults.
- **C++ Unreal-style macro rule** — new TextMate token rule targets
  `entity.name.function.preprocessor.{c,cpp}` (and the equivalent inside
  `meta.preprocessor.macro.*` and `meta.attribute.cpp` contexts). Paints them in
  `--purple-mid` so `UCLASS`, `UFUNCTION`, `UPROPERTY`, etc. visually separate from
  ordinary function calls (which stay `--tac-primary` amber). Same color also applied
  to the `macro` and `macro.cpp` semantic token kinds.
- **`package.json` marketplace prep** — added `repository`, `keywords`, and a `build`
  script. Sets up for future `vsce publish` to the VS Code Marketplace.

### Notes
- Palette hex codes are unchanged from 1.0.0. Existing user customizations still work.
- Generated JSON files are committed alongside the templates so users can install without
  the build step. CI-style rebuild verification can be added later if drift becomes a risk.

## 1.0.0 — 2026-04-23

Initial release.

### Added
- VS Code / Cursor color theme: ~140 workbench colors, 26 TextMate token rules,
  16 semantic token mappings.
- Windows Terminal color scheme: 16 ANSI colors + bg/fg/cursor/selection.
- README documenting the palette, syntax mapping, and install for all three surfaces.
