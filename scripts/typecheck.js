import { spawnSync } from 'node:child_process';
import { readdir } from 'node:fs/promises';
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
const result = spawnSync(process.execPath, ['--check', ...files], { stdio: 'inherit' });
if (result.status !== 0) process.exitCode = result.status;
