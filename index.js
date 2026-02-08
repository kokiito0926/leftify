#!/usr/bin/env node

import dedent from "dedent";
import { stdin, argv } from "zx";

const alignValues = argv?.["align-values"] || false;
const escapeSpecialCharacters = argv?.["escape-special-characters"] || false;
const trimWhitespace = argv?.["trim-whitespace"] || true;

if (process.stdin.isTTY) {
	process.exit(1);
}

const text = await stdin();

const dedented = dedent.withOptions({
	alignValues,
	escapeSpecialCharacters,
	trimWhitespace,
})(text);

if (!dedented) {
	process.exit(1);
}

console.log(dedented);
