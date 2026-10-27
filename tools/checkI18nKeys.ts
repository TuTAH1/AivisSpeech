import { glob } from "glob";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");
const localeDir = path.join(srcDir, "i18n", "locales");

const codeFiles = await glob("**/*.{vue,ts,tsx}", { cwd: srcDir, absolute: true });
const keyRegex = /\b(?:t|i18n\.global\.t|\$t)\(\s*["']([^"']+)["']/g;

const usedKeys = new Set<string>();
for (const file of codeFiles) {
  const content = fs.readFileSync(file, "utf8");
  let match: RegExpExecArray | null;
  while ((match = keyRegex.exec(content)) !== null) {
    usedKeys.add(match[1]);
  }
  keyRegex.lastIndex = 0;
}

function flatten(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [];
  const result: string[] = [];
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      result.push(...flatten(v, full));
    } else {
      result.push(full);
    }
  }
  return result;
}

const localeFiles = fs
  .readdirSync(localeDir)
  .filter((f) => f.endsWith(".json"));

for (const localeFile of localeFiles) {
  const localePath = path.join(localeDir, localeFile);
  const json = JSON.parse(fs.readFileSync(localePath, "utf8"));
  const localeKeys = new Set(flatten(json));

  const missing = [...usedKeys].filter((k) => !localeKeys.has(k)).sort();
  const unused = [...localeKeys].filter((k) => !usedKeys.has(k)).sort();

  console.log(`\n=== ${localeFile} ===`);
  console.log(`used keys: ${usedKeys.size}, locale keys: ${localeKeys.size}`);
  console.log(`missing in locale (${missing.length}):`);
  for (const k of missing) console.log(`  - ${k}`);
  console.log(`unused in code (${unused.length}):`);
  for (const k of unused) console.log(`  - ${k}`);
}
