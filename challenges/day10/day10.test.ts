import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';



describe.skip('part1', () => {
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

  // same as input 3, but with added noise
  const input4 = `
  7-F7-
  .FJ|7
  SJLL7
  |F--J
  LJ.LJ`;


  test('works with example input 1', () => {
    // console.log(solvePart1(input1));
    assert.equal(solvePart1(input1), 4);
  });

  test('works with example input 2', () => {
    // console.log(solvePart1(input1));
    assert.equal(solvePart1(input2), 4);
  });

  test('works with example input 3', () => {
    // console.log(solvePart1(input1));
    assert.equal(solvePart1(input3), 8);
  });

  test('works with example input 4', () => {
    // console.log(solvePart1(input1));
    assert.equal(solvePart1(input3), 8);
  });

});

describe('part2', () => {
  const input1 = `
  .....
  .S-7.
  .|.|.
  .L-J.
  .....`;

  const input2 = `
  ...........
  .S-------7.
  .|F-----7|.
  .||.....||.
  .||.....||.
  .|L-7.F-J|.
  .|..|.|..|.
  .L--J.L--J.
  ...........`;

  const input3 = `
  .F----7F7F7F7F-7....
  .|F--7||||||||FJ....
  .||.FJ||||||||L7....
  FJL7L7LJLJ||LJ.L-7..
  L--J.L7...LJS7F-7L7.
  ....F-J..F7FJ|L7L7L7
  ....L7.F7||L7|.L7L7|
  .....|FJLJ|FJ|F7|.LJ
  ....FJL-7.||.||||...
  ....L---J.LJ.LJLJ...
  `;


  test.skip('works with example input 1', () => {
    assert.equal(solvePart2(input1), 1);
  });

  test.skip('works with example input 2', () => {
    assert.equal(solvePart2(input2), 4);
  });

  test('works with example input 3', () => {
    console.log(solvePart2(input3));
  })

});
