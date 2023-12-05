import { parseInput, type SourceToDestinationMap } from "./parseInput";

export const solvePart1 = (input: string) => {
  const { seeds, maps } = parseInput(input);

  const finalDestinations = seeds.map(seed => pipeThroughMaps(seed, maps));

  return Math.min(...finalDestinations);
};

const pipeThroughMaps = (seed: number, maps: SourceToDestinationMap[]) => {
  return maps.reduce((acc, map) => {
    return getMappedValue(acc, map);
  }, seed);

};

const getMappedValue = (source: number, map: SourceToDestinationMap) => {
  let mappedValue = null;

  for (const mapPart of map) {
    const { sourceRangeStart, destinationRangeStart, rangeLength } = mapPart;
    const sourceRangeEnd = sourceRangeStart + rangeLength - 1;
    const destinationRangeEnd = destinationRangeStart + rangeLength - 1;

    if (source >= sourceRangeStart && source <= sourceRangeEnd) {
      const delta = source - sourceRangeStart;
      mappedValue = destinationRangeStart + delta;
    }
  }

  return mappedValue !== null ? mappedValue : source;
}
