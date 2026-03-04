import { mkdir, rm, cp } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(process.cwd(), 'src'), join(dist, 'src'), { recursive: true });
await cp(join(process.cwd(), 'scripts', 'seedData.js'), join(dist, 'seedData.js'));
console.info('Build complete: copied source files into dist/.');
