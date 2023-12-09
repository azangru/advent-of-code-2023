import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';



const input = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`;

describe('part1', () => {

  test('works with example input', () => {
    assert.equal(solvePart1(input), 114);
  });

});

describe('part2', () => {

  test('works with a single line', () => {
    assert.equal(solvePart2('10 13 16 21 30 45'), 5);
  });

});
