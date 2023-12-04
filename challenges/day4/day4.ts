import path from 'node:path';
import fs from 'node:fs';
import * as url from 'node:url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';

const pathToInput = path.resolve(__dirname, './input.txt');
const input = fs.readFileSync(pathToInput, { encoding: 'utf-8' });


console.log('solution to day4 part 1:', solvePart1(input));
console.log('solution to day4 part 2:', solvePart2(input));
