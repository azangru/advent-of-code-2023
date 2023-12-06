import path from 'node:path';
import fs from 'node:fs';
import * as url from 'node:url';
import assert from 'assert/strict';
import { describe, test } from 'node:test';

import { solvePart1 } from './part1';
import * as part2 from './part2';
// import { solvePart2 } from './part2';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const pathToInput = path.resolve(__dirname, './example.txt');
const input = fs.readFileSync(pathToInput, { encoding: 'utf-8' });


describe.skip('part1', () => {

  test('works with example input', () => {
    assert.equal(solvePart1(input), 35);
  });

});

describe('part2', () => {

  describe('pipeThroughSubMap', () => {

    test('example 1', () => {
      const input1 = [[79, 14], [55, 13]];
      const subMap1 = {
        sourceRangeStart: 98,
        destinationRangeStart: 50,
        rangeLength: 2
      };
      
      assert.deepEqual(part2.pipeThroughSubMap(input1, subMap1), { outputs: [], remainderSegments: input1 });
  
      const subMap2 = {
        sourceRangeStart: 50,
        destinationRangeStart: 52,
        rangeLength: 48
      };

      assert.deepEqual(part2.pipeThroughSubMap(input1, subMap2), {
        outputs: [[81, 14], [57, 13]], remainderSegments: []
      });
    });
  
  });

  describe('pipeThroughMap', () => {

    test('example 1', () => {
      const input = [[79, 14], [55, 13]];
      const subMap1 = {
        sourceRangeStart: 98,
        destinationRangeStart: 50,
        rangeLength: 2
      };
      const subMap2 = {
        sourceRangeStart: 50,
        destinationRangeStart: 52,
        rangeLength: 48
      };
      const map = [subMap1, subMap2];


      assert.deepEqual(part2.pipeThroughMap(input, map), [[ 81, 14 ], [ 57, 13 ]]);

    });

  });

  describe('solvePart2', () => {

    test('example input', () => {
      console.log(part2.solvePart2(input));
    });

  })

});
