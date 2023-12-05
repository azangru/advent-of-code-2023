import path from 'node:path';
import fs from 'node:fs';
import * as url from 'node:url';
import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
// import { solvePart2 } from './part2';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const pathToInput = path.resolve(__dirname, './example.txt');
const input = fs.readFileSync(pathToInput, { encoding: 'utf-8' });


describe('part1', () => {

  test('works with example input', () => {
    // console.log(JSON.stringify(solvePart1(input), null, 2));
    assert.equal(solvePart1(input), 35);
  });

});

// describe('part2', () => {

//   test('works with example input', () => {
//     assert.equal(solvePart2(input), 30);
//   });

// });
