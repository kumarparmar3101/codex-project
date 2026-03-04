import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { demoSeedData } from './seedData.js';

const outputDir = join(process.cwd(), 'data');
await mkdir(outputDir, { recursive: true });
const outputPath = join(outputDir, 'demo-seed.json');
await writeFile(outputPath, JSON.stringify(demoSeedData, null, 2));
console.info(`Seeded demo data to ${outputPath}`);
