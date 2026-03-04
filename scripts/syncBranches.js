#!/usr/bin/env node
import { spawnSync } from 'node:child_process';

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'pipe',
    encoding: 'utf8',
    ...options
  });

  if (result.status !== 0) {
    process.stderr.write(result.stderr || 'Command failed\n');
    process.exit(result.status ?? 1);
  }

  return result.stdout.trim();
}

const currentBranch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
run('git', ['fetch', 'origin', '--prune']);

const localMainExists = spawnSync('git', ['show-ref', '--verify', '--quiet', 'refs/heads/main']).status === 0;
if (localMainExists) {
  run('git', ['branch', '-f', 'main', 'origin/main']);
} else {
  run('git', ['branch', 'main', 'origin/main']);
}

if (currentBranch === 'work') {
  run('git', ['merge', '--ff-only', 'main']);
}

console.log(`Current branch: ${currentBranch}`);
console.log('\nRemote branches not merged into origin/main:');
const unmerged = run('git', ['branch', '-r', '--no-merged', 'origin/main']);
console.log(unmerged || '(none)');
