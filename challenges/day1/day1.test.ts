import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';

const examplesPart1 = [
  '1abc2',
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet'
];

const examplesPart2 = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen'
];


describe('part1', () => {

  test('individual strings', () => {
    assert.equal(solvePart1(examplesPart1[0]), 12);
    assert.equal(solvePart1(examplesPart1[1]), 38);
    assert.equal(solvePart1(examplesPart1[2]), 15);
    assert.equal(solvePart1(examplesPart1[3]), 77);
  });

  test('all strings combined', () => {
    const input = examplesPart1.join('\n');
    assert.equal(solvePart1(input), 142);
  });

});

describe('part2', () => {

  test('individual strings', () => {
    assert.equal(solvePart2(examplesPart2[0]), 29);
    assert.equal(solvePart2(examplesPart2[1]), 83);
    assert.equal(solvePart2(examplesPart2[2]), 13);
    assert.equal(solvePart2(examplesPart2[3]), 24);
    assert.equal(solvePart2(examplesPart2[4]), 42);
    assert.equal(solvePart2(examplesPart2[5]), 14);
    assert.equal(solvePart2(examplesPart2[6]), 76);
  });

  test('all strings combined', () => {
    const input = examplesPart2.join('\n');
    assert.equal(solvePart2(input), 281);
  });

});
