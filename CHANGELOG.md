# Changelog

## 1.2.0 — 2026-04-24

Cursor AI polish, TypeScript/CSS/JSX language coverage, and missing workbench slot coverage.
No palette changes — all new entries map to existing tokens.

### Added

**Cursor-specific polish**
- `editorGhostText.*` — AI inline completions now render in `--vo-text-muted` rather than
  inheriting the default foreground, visually separating suggestions from committed code.
- `commandCenter.*` — command bar background, border, and active/inactive states themed
  to the void-surface hierarchy.
- `chat.*` — AI chat panel background, avatar, and slash-command highlight colors.
- `keybindingLabel.*` — keyboard shortcut pill styling using `--void-surface-2/3`.

**TypeScript / JavaScript / JSX**
- Decorator rule (`meta.decorator` + children) painted `--purple-mid` — parallels the
  existing C++ macro rule so framework scaffolding reads consistently across ecosystems.
- JSX/TSX component name rule (`support.class.component.tsx/jsx`) painted `--cyan-bright`,
  distinguishing `<MyComponent>` from lowercase HTML elements.
- Semantic tokens: `decorator` → `--purple-mid`, `typeParameter` → `--shield-bright`,
  `operator` → `--vo-text-secondary`.

**CSS / SCSS / Less**
- Custom property rule (`variable.css`, `variable.scss`, `variable.other.less`) →
  `--purple-bright`, grouping `--foo` vars with JSON keys and HTML attribute names.
- Unit rule (`keyword.other.unit.css/scss`) → `--shield-bright`, pairing units with their
  numbers (shield-full) in the same color family.
- Pseudo-class/element rule → `--cyan-mid`, distinguishing `:hover`/`::before` from
  plain attribute names (purple-bright) and type names (cyan-bright).
- At-rule explicit rule (`keyword.control.at-rule.css/scss/less`) → `--purple-glow`,
  ensuring SCSS/Less `@mixin`, `@include` etc. catch the rule cleanly.

**Workbench slots**
- 28 `symbolIcon.*` entries — each symbol kind icon gets the same color its token uses
  in the editor (classes → cyan-bright, functions → tac-primary, variables → text-primary, etc.).
- `editorCodeLens.foreground` → `--vo-text-muted`.
- `editor.rangeHighlightBackground` → `--cyan-bright` at 8% alpha.
- 9 `testing.*` entries: pass/fail/error/queue/skip icons use the health-color vocabulary;
  test peek borders use cyan-bright / tac-primary.

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
