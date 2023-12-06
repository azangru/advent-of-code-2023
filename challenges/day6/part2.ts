import { parseInput2 } from "./parseInput";

export const solvePart2 = (input: string) => {
  const { time, distance } = parseInput2(input);

  return countNumberOfWinningStrategies(time, distance);
};


const countNumberOfWinningStrategies = (time: number, distance: number) => {
  let count = 0;

  for (let i = 0; i <= time; i++) {
    const speed = i;
    const remainingTime = time - i;

    if (speed * remainingTime > distance) {
      count++;
    }
  }

  return count;
};
