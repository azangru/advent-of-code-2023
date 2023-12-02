import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import { solvePart2 } from './part2';

const games = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'
];

describe('part1', () => {

  test('sum of ids of valid games', () => {
    const allGamesStr = games.join('\n');

    assert.equal(solvePart1(allGamesStr), 8);
  });

});


describe('part2', () => {

  test('sum of ids of valid games', () => {
    const allGamesStr = games.join('\n');

    assert.equal(solvePart2(allGamesStr), 2286);
  });

});
