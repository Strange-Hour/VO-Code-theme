// Void Odyssey theme — build pipeline
// Reads palette.json (single source of truth) and substitutes {{token}} markers
// in *.tmpl files, emitting derived .json files alongside them.
//
// Usage:  node tools/build.mjs
//         npm run build  (via package.json scripts)
//
// Add a new token: edit palette.json. Reference it as {{token-name}} in any
// template. Build will fail loudly if a template references an unknown token.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const palette = JSON.parse(readFileSync(join(root, "palette.json"), "utf8"));

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
    {
        template: "extras/claude-code-theme.tmpl",
        output: "extras/claude-code-theme.json",
        validate: true,
    },
];

function render({ template, output, validate = true }) {
    const tplPath = join(root, template);
    const outPath = join(root, output);
    const tpl = readFileSync(tplPath, "utf8");

    const unknown = new Set();
    const rendered = tpl.replace(/\{\{([a-z0-9-]+)\}\}/g, (_match, token) => {
        if (!(token in palette)) {
            unknown.add(token);
            return _match;
        }
        return palette[token];
    });

    if (unknown.size > 0) {
        throw new Error(
            `${template}: unknown palette tokens: ${[...unknown].join(", ")}\n` +
            `Add them to palette.json or fix the template.`
        );
    }

    if (validate) {
        try {
            JSON.parse(rendered);
        } catch (err) {
            throw new Error(`${output}: rendered file is not valid JSON.\n${err.message}`);
        }
    }

    writeFileSync(outPath, rendered);
    console.log(`  ${relative(root, outPath).replace(/\\/g, "/")}`);
}

console.log("void-odyssey-theme · build");
for (const t of targets) render(t);
console.log(`done. ${targets.length} files generated from ${Object.keys(palette).length} tokens.`);
