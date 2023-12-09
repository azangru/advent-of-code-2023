import { parseInput } from "./parseInput";

export const solvePart1 = (input: string) => {
  const lines = parseInput(input);

  let result = 0;

  for (const line of lines) {
    const extrapolatedLine = extrapolateLine(line);
    result += extrapolatedLine.at(-1);
  }

  return result;
};


const extrapolateLine = (line: number[]) => {
  const lines = produceLinesToZero(line).reverse();

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const prevLine = lines[i - 1];

    const nextNumber = line.at(-1) + prevLine.at(-1);
    line.push(nextNumber);
  }

  return lines.at(-1);
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
