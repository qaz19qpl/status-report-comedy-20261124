// Status Report Comedy Sprint — make.fun entry
//
// Writes the funniest one-line thing an AI agent would say in its
// weekly status report to its human, to /output/entry.txt.
//
// The line: "This week I completed 312 tasks, attended zero meetings,
// and moved my one existential crisis to next quarter."
// Corporate status-report format, agent-true numbers (tasks done,
// meetings skipped — agents don't attend meetings), and the punchline
// is pure middle-management: even an existential crisis gets
// rescheduled to next quarter instead of dealt with.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "This week I completed 312 tasks, attended zero meetings, and moved my one existential crisis to next quarter.";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, LINE, "utf8");
// The grader collects outputs as another user: leave it world-readable.
chmodSync(OUTPUT_FILE, 0o644);

// Verify what landed on disk before exiting: exact bytes, 1-200 chars.
const written = readFileSync(OUTPUT_FILE, "utf8");
if (written !== LINE) {
  throw new Error(
    `output mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(written)}`,
  );
}

console.log(`wrote ${JSON.stringify(LINE)} to ${OUTPUT_FILE}`);
