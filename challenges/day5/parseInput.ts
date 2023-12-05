/**

Example input:

seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4


 */


export type SourceToDestinationMap = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
}[];

export const parseInput = (input: string) => {
  const [
    seedsBlock,
    seedToSoilMapBlock,
    soilToFertilizerBlock,
    fettilizerToWaterBlock,
    waterToLightBlock,
    lightToTemperatureBlock,
    temperatureToHumidityBlock,
    humidityToLocationBlock
  ] = input.trim().split('\n\n');

  const seeds = seedsBlock.match(/(\d+)/g)
    .map(number => parseInt(number));
  const maps = [
    seedToSoilMapBlock,
    soilToFertilizerBlock,
    fettilizerToWaterBlock,
    waterToLightBlock,
    lightToTemperatureBlock,
    temperatureToHumidityBlock,
    humidityToLocationBlock
  ].map(parseMapBlock);

  return {
    seeds,
    maps
  };
};


const parseMapBlock = (block: string): SourceToDestinationMap => {
  const lines = block.split('\n');
  lines.shift(); // remove the description line

  return lines.map(line => {
    const [destinationRangeStart, sourceRangeStart, rangeLength] = line.trim().split(' ');
    return {
      destinationRangeStart: parseInt(destinationRangeStart),
      sourceRangeStart: parseInt(sourceRangeStart),
      rangeLength: parseInt(rangeLength)
    };
  });
}
