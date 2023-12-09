/**

Example input:

RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)

 */

export type NodesMap = Record<string, [string, string]>;

export const parseInput = (input: string) => {
  const [instructions, map] = input.trim().split('\n\n');
  const parsedInstructions = instructions.split('');

  return {
    instructions: parsedInstructions,
    map: parseMap(map)
  };
};

const parseMap = (map: string) => {
  const nodesMap: NodesMap = {};
  const lines = map.split('\n').map(line => line.trim());

  for (const line of lines) {
    const [rootNodeName, leftNodeName, rightNodeName] = parseLine(line);
    nodesMap[rootNodeName] = [leftNodeName, rightNodeName];
  }

  return nodesMap;
};

const parseLine = (line: string) => {
  const regex = /([A-Z0-9]+)/g;
  const [rootNodeName, leftNodeName, rightNodeName] = line.match(regex);

  if (!rootNodeName && leftNodeName && rightNodeName) {
    throw new Error('Failed to parse line');
  }

  return [rootNodeName, leftNodeName, rightNodeName];
};
