import { parseInput, type NodesMap } from "./parseInput";

export const solvePart2 = (input: string) => {
  const { instructions, map } = parseInput(input);

  return countSteps({ instructions, map });
};

const countSteps = ({ instructions, map }: ReturnType<typeof parseInput>) => {
  let currentNodes = findAllStartNodes(map);

  let count = 0;

  while (!areAllEndNodes(currentNodes)) {
    const indexIntoInstructions = count % instructions.length;
    const instruction = instructions[indexIntoInstructions];

    for (let i = 0; i< currentNodes.length; i++) {
      const node = currentNodes[i];
      const leftRight = map[node];
      const nextNode = instruction === 'L'
        ? leftRight[0]
        : leftRight[1];
      currentNodes[i] = nextNode;
    }

    count++;
  }

  return count;
};

const findAllStartNodes = (map: NodesMap) => {
  return Object.keys(map).filter(node => {
    return node.at(-1) === 'A';
  });
};

const areAllEndNodes = (nodes: string[]) => {
  let nodesEndingInZCount = 0;

  for (const node of nodes) {
    if (node.at(-1) === 'Z') {
      nodesEndingInZCount++;
    }
  }

  return nodesEndingInZCount === nodes.length;
};
