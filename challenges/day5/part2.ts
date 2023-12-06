import { parseInput2, type SourceToDestinationMap } from "./parseInput";

export const solvePart2 = (input: string) => {
  const { seeds, maps } = parseInput2(input);

  // let outputs: number[][] = [];
  let result: number[][] = seeds

  for (const map of maps) {
    result = pipeThroughMap(result, map);
  }

  return result;


  // return Math.min(...finalDestinations);
};


/**
 * |--------------------|
 *        |--------------------|
 * 
 * 
 *          |--------------------|
 * |--------------------|
 * 
 * 
 *       |--------|
 * |--------------------|
 *
 *  
 * |--------------------|
 *    |--------|
 */


/**
 * - receive an array of start coordinate and range
 * - check intersection with any of the maps
 * - if any of the maps intersects
 *   - separate intersection from overhangs
 *   - map the intersection
 *   - make sure to check the overhangs
 *   - if there is a remainder, return it unchanged 
 */

export const pipeThroughMap = (input: number[][], map: SourceToDestinationMap) => {
  let outputs: number[][] = [];
  let remainderSegments: number[][] = input;

  for (const subMap of map) {
    const input = remainderSegments;
    const result = pipeThroughSubMap(input, subMap);

    // console.log(input, map, result);

    outputs = outputs.concat(result.outputs);
    remainderSegments = result.remainderSegments;
  }

  console.log('here', [...outputs, ...remainderSegments]);
  return [...outputs, ...remainderSegments];
};


export const pipeThroughSubMap = (inputs: number[][], subMap: SourceToDestinationMap[number]) => {
  const outputs: number[][] = [];
  const remainderSegments: number[][] = [];
  const { sourceRangeStart, destinationRangeStart, rangeLength } = subMap;

  for (const input of inputs) {
    const [inputStart, inputRange] = input;

    const intersectionStart = inputStart >= sourceRangeStart && inputStart <= sourceRangeStart + rangeLength
      ? inputStart
      : inputStart <= sourceRangeStart && inputStart + inputRange >= sourceRangeStart
        ? sourceRangeStart
        : null;

    if (intersectionStart === null) {
      remainderSegments.push(input);
      continue;
    } else if (inputStart <= sourceRangeStart) {
      const mappableRange = Math.min(rangeLength, inputRange - (sourceRangeStart - inputStart));
      outputs.push([destinationRangeStart, mappableRange]);
    } else {
      const inputDelta = inputStart - sourceRangeStart;
      const mappableRange = Math.min(inputRange, rangeLength - inputDelta);
      const mappedDestination = destinationRangeStart + inputDelta;
      outputs.push([mappedDestination, mappableRange]);
    }

    // remainders
    if (inputStart < sourceRangeStart) {
      const remainder = sourceRangeStart - inputStart;
      const newSegment = [inputStart, remainder];
      remainderSegments.push(newSegment);
    }

    if (inputStart + inputRange > sourceRangeStart + rangeLength) {
      const newStart = sourceRangeStart + rangeLength;
      const remainder = (inputStart + inputRange) - (sourceRangeStart + rangeLength);
      const newSegment = [newStart, remainder];
      remainderSegments.push(newSegment);
    }
  }

  return { outputs, remainderSegments };
}
