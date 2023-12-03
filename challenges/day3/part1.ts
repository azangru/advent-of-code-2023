export const solvePart1 = (input: string) => {
  const lines = input.trim().split('\n');

  const numbers = findNumbers(lines);
  return numbers.reduce((acc, num) => acc + num);
};

const findNumbers = (lines: string[]) => {
  const numbers: number[] = [];

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i];

    let temp = '';
    let isAdjacent = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (/\d/.test(char)) {
        temp += char;
        isAdjacent = isAdjacent || checkAdjacent({
          lines,
          rowIndex: i,
          columnIndex: j
        });

        if (j === line.length - 1) {
          if (temp) {
            if (isAdjacent) {
              numbers.push(parseInt(temp));
              isAdjacent = false;
            }
            temp = '';
          }  
        }
      } else {
        if (temp) {
          if (isAdjacent) {
            numbers.push(parseInt(temp));
            isAdjacent = false;
          }
          temp = '';
        }
      }
    }
  }

  return numbers;
};

const checkAdjacent = (params: {
  lines: string[];
  rowIndex: number;
  columnIndex: number;
}) => {
  const { lines, rowIndex, columnIndex } = params;
  const adjacentCharacters = [
    lines[rowIndex][columnIndex - 1],
    lines[rowIndex][columnIndex + 1],
    lines[rowIndex - 1]?.[columnIndex - 1],
    lines[rowIndex - 1]?.[columnIndex],
    lines[rowIndex - 1]?.[columnIndex + 1],
    lines[rowIndex + 1]?.[columnIndex - 1],
    lines[rowIndex + 1]?.[columnIndex],
    lines[rowIndex + 1]?.[columnIndex + 1]
  ].filter(char => char !== undefined);

  for (const char of adjacentCharacters) {
    if (char !== '.' && !/\d/.test(char)) {
      return true;
    }
  }

  return false;
};
