import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
// import { solvePart2 } from './part2';



describe('part1', () => {
  const input1 = `
  .....
  .S-7.
  .|.|.
  .L-J.
  .....`;

  // same as input 1, but with added noise
  const input2 = `
  -L|F7
  7S-7|
  L|7||
  -L-J|
  L|-JF`;  

  const input3 = `
  ..F7.
  .FJ|.
  SJ.L7
  |F--J
  LJ...`;

  // same as input 2, but with added noise
  const input4 = `
  7-F7-
  .FJ|7
  SJLL7
  |F--J
  LJ.LJ`;


  // test('works with example input 1', () => {
  //   // console.log(solvePart1(input1));
  //   assert.equal(solvePart1(input1), 4);
  // });

  test('works with example input 2', () => {
    // console.log(solvePart1(input1));
    assert.equal(solvePart1(input2), 4);
  });

  // test('works with example input 3', () => {
  //   // console.log(solvePart1(input1));
  //   assert.equal(solvePart1(input3), 8);
  // });

});

// describe('part2', () => {

//   test('works with a single line', () => {
//     assert.equal(solvePart2('10 13 16 21 30 45'), 5);
//   });

// });
