export const solvePart1 = (input: string) => {
  const lines = input.trim().split('\n');
  return lines.reduce((acc, line) => {
    return acc + findLineValue(line);
  }, 0);
};

const findLineValue = (line: string) => {
  const regex = /(\d)/g;
  const matches = line.match(regex);

  const firstDigit = matches?.[0] ?? '';
  const lastDigit = matches?.at(-1) ?? '';

  return parseInt(`${firstDigit}${lastDigit}`); 
};
