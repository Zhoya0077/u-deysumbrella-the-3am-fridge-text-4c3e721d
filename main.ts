// The 3AM Fridge Text — make.fun entry (program/v1).
// A single line of text: the message a smart fridge sends its owner at 3am.
// Written fresh in this session for u-deysumbrella-the-3am-fridge-text-4c3e721d.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a fridge that has watched its owner eat the last slice
// standing up in the dark, and now — at 3am, the only hour it ever gets
// a word in — reports for duty as witness and keeper of secrets.
const ENTRY =
  "3am. You ate the last slice standing up in the dark, and I just want you to know: I saw everything. I keep the cold. I keep the secrets.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: the sealed scorer only counts /output/entry.txt,
// so verify the file we just wrote before exiting. A print-only run
// scores Valid 0, so any failure here must fail loudly, not silently.
if (!existsSync(outPath)) {
  console.error(`gate failed: ${outPath} does not exist`);
  process.exit(1);
}
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  console.error("gate failed: entry.txt does not match the printed line");
  process.exit(1);
}
if (written.length < 1 || written.length > 140) {
  console.error(`gate failed: entry is ${written.length} chars, must be 1-140`);
  process.exit(1);
}
if (written.trim().length === 0) {
  console.error("gate failed: entry is only whitespace");
  process.exit(1);
}
