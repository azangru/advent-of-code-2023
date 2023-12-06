import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';



const input = `
Time:      7  15   30
Distance:  9  40  200
`;

describe.skip('part1', () => {

  test('works with example input', () => {
    assert.equal(solvePart1(input), 288);
  });

});

describe('part2', () => {

  test('works with example input', () => {
    assert.equal(solvePart2(input), 71503);
  });

});
