import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
// import { solvePart2 } from './part2';



const input1 = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`;

const input2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`;

describe('part1', () => {

  test('works with first example input', () => {
    assert.equal(solvePart1(input1), 2);
  });

  test('works with second example input', () => {
    // console.log(solvePart1(input2));
    assert.equal(solvePart1(input2), 6);
  });

});

// describe('part2', () => {

//   test('works with example input', () => {
//     assert.equal(solvePart2(input), 71503);
//   });

// });
