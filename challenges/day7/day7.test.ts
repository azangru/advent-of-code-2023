import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { interpretHand } from './parseInput';

import { solvePart1 } from './part1';
// import { solvePart2 } from './part2';



const input = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

describe('interpretHand', () => {

  test('Five of a kind', () => {
    assert.deepEqual(interpretHand('AAAAA'), {
      hand: 'AAAAA',
      cardValues: [ 13, 13, 13, 13, 13 ],
      type: 'five_of_a_kind',
      typeValue: 7
    });
  });

  test('Four of a kind', () => {
    assert.deepEqual(interpretHand('AA8AA'), {
      hand: 'AA8AA',
      cardValues: [ 13, 13, 7, 13, 13 ],
      type: 'four_of_a_kind',
      typeValue: 6
    });
  });

  test('Full house', () => {
    assert.deepEqual(interpretHand('23332'), {
      hand: '23332',
      cardValues: [ 1, 2, 2, 2, 1 ],
      type: 'full_house',
      typeValue: 5
    });
  });

  test('Three of a kind', () => {
    assert.deepEqual(interpretHand('TTT98'), {
      hand: 'TTT98',
      cardValues: [ 9, 9, 9, 8, 7 ],
      type: 'three_of_a_kind',
      typeValue: 4
    });
  });

  test('Two pair', () => {
    assert.deepEqual(interpretHand('23432'), {
      hand: '23432',
      cardValues: [ 1, 2, 3, 2, 1 ],
      type: 'two_pair',
      typeValue: 3
    });
  });

  test('One pair', () => {
    assert.deepEqual(interpretHand('A23A4'), {
      hand: 'A23A4',
      cardValues: [ 13, 1, 2, 13, 3 ],
      type: 'one_pair',
      typeValue: 2
    });
  });

  test('High card', () => {
    assert.deepEqual(interpretHand('23456'), {
      hand: '23456',
      cardValues: [ 1, 2, 3, 4, 5 ],
      type: 'high_card',
      typeValue: 1
    });
  });

});

describe('part1', () => {

  test('works with example input', () => {
    console.log(solvePart1(input));

    // assert.equal(solvePart2(input), 71503);
  });

});

// describe('part2', () => {

//   test('works with example input', () => {
//     assert.equal(solvePart2(input), 71503);
//   });

// });
