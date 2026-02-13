#!/usr/bin/env node

import dedent from "dedent";
import { stdin, argv } from "zx";

// Helper to get boolean from argv, avoiding ||= true bug
const getBool = (key, defaultValue) => {
	const val = argv[key];
	if (val === undefined) return defaultValue;
	if (val === "false") return false;
	if (val === "true") return true;
	return !!val;
};

const alignValues = getBool("align-values", false);
const escapeSpecialCharacters = getBool("escape-special-characters", false);
const trimWhitespace = getBool("trim-whitespace", true);

const noDedent = getBool("no-dedent", false);
const all = getBool("all", false);
const trailing = getBool("trailing", false);
const collapseEmpty = getBool("collapse-empty", false);

if (process.stdin.isTTY) {
	process.exit(1);
}

let text = await stdin();

// Apply dedent unless --no-dedent is specified
if (!noDedent) {
	text = dedent.withOptions({
		alignValues,
		escapeSpecialCharacters,
		trimWhitespace,
	})(text);
}

let lines = text.split(/\r?\n/);

if (all) {
	lines = lines.map(line => line.trimStart());
}

if (trailing) {
	lines = lines.map(line => line.trimEnd());
}

if (collapseEmpty) {
	const newLines = [];
	let lastWasEmpty = false;
	for (const line of lines) {
		const isEmpty = line.trim() === "";
		if (isEmpty) {
			if (!lastWasEmpty) {
				newLines.push("");
				lastWasEmpty = true;
			}
		} else {
			newLines.push(line);
			lastWasEmpty = false;
		}
	}
	lines = newLines;
}

const result = lines.join("\n");

if (!result && text.length > 0) {
	// If input was not empty but result is empty (e.g. only spaces),
	// we still want to output it if it was intented.
	// But usually dedent handles this.
}

console.log(result);
