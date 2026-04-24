# Changelog

## 1.7.0 — 2026-04-24

Ghostty terminal theme and build pipeline extension.

### Added

- `extras/ghostty-theme.tmpl` + `extras/ghostty-theme.conf` — Ghostty color theme using
  the full Void Odyssey palette. Includes ANSI colors (matching the Windows Terminal scheme),
  plus Ghostty-specific appearance settings: `background-opacity = 0.95`,
  `background-blur-radius = 20`, block cursor, `font-size = 13`, `minimum-contrast = 3.0`.
  Selection background uses `--purple-bright` (#9A6EF0) for WCAG AA-compliant contrast.

### Changed

- `tools/build.mjs` — targets now carry a `validate` flag (default `true`). When `false`,
  the JSON parse check is skipped, enabling non-JSON output formats. Existing JSON targets
  are unaffected.
- `README.md` — Ghostty install section added; file tree, tagline, and Origin section
  updated to include Ghostty as a first-class supported target.

## 1.6.0 — 2026-04-24

HUD frame pass — title bar and status bar now carry the theme's signature
cyan/purple identity; Cursor AI panel separated from the editor surface.

### Changed

- **Title bar** → `--purple-mid` (#7A52D1) background. The header now reads as a distinct
  purple HUD strip rather than blending into the void-black chrome.
- **Status bar** → `--cyan-mid` (#0AAFBE) background with `--void-deep` foreground. The
  footer becomes a vivid cyan HUD bar — matching the game's health/state readout aesthetic
  and complementing the purple title bar.
- **`statusBarItem.remoteBackground`** → `--purple-mid` so the remote badge pops against
  the cyan bar instead of blending in.
- **`statusBarItem.hoverBackground`** → `--void-deep` at 25% alpha — dark press overlay
  on the cyan surface rather than the old void-surface block.

### Added

- **`secondarySideBar.*`** (7 tokens) — Cursor's AI chat panel now uses the same
  `--void-surface` / `--void-surface-2` surface hierarchy as the left file explorer,
  separating it clearly from the `--void-deep` editor canvas.

## 1.5.0 — 2026-04-24

Panel clarity pass — editor canvas, sidebar, and chat panel now occupy clearly distinct
visual layers.

### Changed

- **`sideBar.background`** → `--void-surface` (#13161D), up from `--void-deep` (#0D0F14).
  Sidebar lifts off the editor background, making file trees and explorer content easier to
  scan without blending into the canvas.
- **`sideBar.border`** → `--void-surface-2`, up from `--void-black`. Visible dividing line
  between sidebar and editor.
- **`sideBarSectionHeader.background`** → `--void-surface-2`, up from `--void-surface`.
  Section headers (EXPLORER, SOURCE CONTROL, etc.) now float above the sidebar body.
- **`sideBarSectionHeader.border`** → `--void-surface-2`.
- **`panel.background`** → `--void-surface` (#13161D), up from `--void-deep` (#0D0F14).
  Bottom panel (terminal, output, problems) matches the sidebar tier, not the editor floor.
- **`panel.border`** → `--void-surface-2`, up from `--void-surface`.
- **`terminal.background`** → `--void-surface`. Terminal stays visually within the panel
  rather than punching a hole to the editor background.
- **`list.hoverBackground`** → `--void-surface-2` (was `--void-surface`). Hover state is now
  visible on the lighter sidebar background.
- **`list.inactiveSelectionBackground`** → `--void-surface-2` (was `--void-surface`).
- **`list.activeSelectionBackground`** → `--void-surface-3` (was `--void-surface-2`).
- **`list.focusBackground`** → `--void-surface-3` (was `--void-surface-2`).

### Added

- **`editorGroup.border`** → `--void-surface-2`. Split-pane dividers are now visible as a
  subtle surface line rather than a hairline against the void-black background.

## 1.4.0 — 2026-04-24

### Added
- New `comment` palette token `#7ABFA8` — a sage teal distinct from all existing syntax
  colors. Comments now render in italic sage teal instead of the near-invisible muted gray,
  making annotations immediately readable without blending into code.

### Changed
- `tokenColors` Comments rule and `semanticTokenColors` comment entry both updated from
  `--vo-text-muted` (#4A5168) to `--comment` (#7ABFA8).

## 1.3.0 — 2026-04-24

Popup/overlay readability pass — all floating UI surfaces lifted off the black canvas.

### Changed

- **Widget/suggest/hover backgrounds** → `--void-surface-2` (#1A1E28), up from `--void-surface`
  (#13161D). Autocomplete popups, hover docs, and find widgets now clearly float above the
  `--void-deep` (#0D0F14) editor background.
- **Widget borders** → `--cyan-bright` at 25% alpha. Replaces the barely-visible surface
  border with a subtle cyan frame that makes popups instantly recognisable.
- **Hover/selected states within popups** → `--void-surface-3` (#222733). Maintains
  internal contrast now that the popup base is lighter.
- **Context menus and dropdowns** — same surface-2 background / surface-3 selection /
  cyan-bright border treatment.
- **Notifications** — background `--void-surface-2`, header `--void-surface-3`, border
  `--void-surface-3`.
- **Breadcrumb picker** → `--void-surface-2`.
- **Peek view result + title** → `--void-surface-2`.
- **Command center** — background `--void-surface-2`, active `--void-surface-3`,
  borders updated to cyan-bright.
- **Chat request background** → `--void-surface-2`.
- **Input fields** — background `--void-surface-2`, border `--void-surface-3`.

### Added

- `quickInput.*` tokens (command palette was previously unstyled, falling back to
  editor defaults): `quickInput.background` / `quickInput.foreground` / `quickInputTitle.background` /
  `quickInputList.focusBackground` / `quickInputList.focusForeground`.

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
