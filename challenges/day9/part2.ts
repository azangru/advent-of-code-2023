import { parseInput } from "./parseInput";

export const solvePart2 = (input: string) => {
  const lines = parseInput(input);

  let result = 0;

  for (const line of lines) {
    const extrapolatedPrevNumber = extrapolatePrevNumberInSeq(line);
    result += extrapolatedPrevNumber;
  }

  return result;
};


const extrapolatePrevNumberInSeq = (line: number[]) => {
  const lines = produceLinesToZero(line).reverse();

  const firstLineNumbers = [0];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const nextNumber = line[0] - firstLineNumbers.at(-1);
    firstLineNumbers.push(nextNumber);
  }

  return firstLineNumbers.at(-1);
}

const produceLinesToZero = (line: number[]) => {
  const lines: number[][] = [line];

  let isBottomLine = areAllZeros(line);

  while (!isBottomLine) {
    const line = lines.at(-1);
    const newLine: number[] = [];

    for (let i = 1; i < line.length; i++) {
      const number = line[i] - line[i-1];
      newLine.push(number);
    }

    lines.push(newLine);
    isBottomLine = areAllZeros(newLine);
  }

  return lines;
};


const areAllZeros = (numbers: number[]) => {
  return numbers.every(num => num === 0);
};
