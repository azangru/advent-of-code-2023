import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';

const input = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

describe('part1', () => {

  test('works with example input', () => {
    assert.equal(solvePart1(input), 4361);
  });

});


describe('part2', () => {

  test('can discover adjacent numbers', () => {
    const example = `
    467..114..
    ...*......
    ..35..633.`;

    assert.equal(solvePart2(example), 467 * 35);
  });

  test('works with both numbers above', () => {
    const example1 = `
    467.114...
    ...*......
    ......633.`;

    const example2 = `
    467.114
    ...*...
    ......6`;

    assert.equal(solvePart2(example1), 467 * 114);
    assert.equal(solvePart2(example2), 467 * 114);
  });

  test('works with both numbers on same line as gear', () => {
    const example1 = `
    467*114...
    ..........
    ......633.`;

    const example2 = `
    467*114
    .......
    ......6`;

    assert.equal(solvePart2(example1), 467 * 114);
    assert.equal(solvePart2(example2), 467 * 114);
  });

  test('works with both numbers on line below', () => {
    const example1 = `
    46...114..
    ...*......
    .35.633...`;

    const example2 = `
    46...11
    ...*...
    .35.633`;

    assert.equal(solvePart2(example1), 35 * 633);
    assert.equal(solvePart2(example2), 35 * 633);
  });

  test('works with example input', () => {
    assert.equal(solvePart2(input), 467835);
  });

});
