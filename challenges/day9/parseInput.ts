export const parseInput = (input: string): number[][] => {
  return input
    .trim()
    .split('\n')
    .map(line => {
      return line
        .trim()
        .split(' ')
        .map(number => parseInt(number))
    });
};
