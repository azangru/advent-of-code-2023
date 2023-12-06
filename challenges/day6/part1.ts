import { parseInput } from "./parseInput";

export const solvePart1 = (input: string) => {
  const { times, distances } = parseInput(input);

  let result = 1;

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    const count = countNumberOfWinningStrategies(time, distance);
    result *= count;
  }

  return result;
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
