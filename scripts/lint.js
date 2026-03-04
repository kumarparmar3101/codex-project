import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function collectFiles(dir, output = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['.git', 'node_modules', 'dist'].includes(entry.name)) continue;
      await collectFiles(full, output);
    } else if (entry.name.endsWith('.js')) {
      output.push(full);
    }
  }
  return output;
}

const files = await collectFiles(process.cwd());
let errors = 0;

for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (text.includes('\t')) {
    console.error(`Tab character found: ${file}`);
    errors += 1;
  }
  if (text.split('\n').some((line) => line.length > 120)) {
    console.error(`Line too long (>120): ${file}`);
    errors += 1;
  }
}

if (errors > 0) {
  process.exitCode = 1;
} else {
  console.info(`Lint passed for ${files.length} files.`);
}
