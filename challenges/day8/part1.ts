import { parseInput } from "./parseInput";

export const solvePart1 = (input: string) => {
  const { instructions, map } = parseInput(input);

  return countSteps({ instructions, map });
};

const countSteps = ({ instructions, map }: ReturnType<typeof parseInput>) => {
  let currentNode = 'AAA';
  let count = 0;

  while (currentNode !== 'ZZZ') {
    const indexIntoInstructions = count % instructions.length;
    const instruction = instructions[indexIntoInstructions];
    const leftRight = map[currentNode];

    if (instruction === 'L') {
      currentNode = leftRight[0];
    } else {
      currentNode = leftRight[1];
    }

    count++;
  }

  return count;
};
