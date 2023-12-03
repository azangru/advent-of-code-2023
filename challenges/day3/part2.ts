export const solvePart2 = (input: string) => {
  const lines = input.trim()
    .split('\n')
    .map(line => line.trim());

  return findGearRatios(lines)
    .reduce((acc, num) => acc + num);
};

const findGearRatios = (lines: string[]) => {
  const result: number[] = [];

  for (let i = 0; i < lines.length; i++) {

    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '*') {
        const gearRatio = getGearRatio({
          lines,
          rowIndex: i,
          columnIndex: j
        });
        if (gearRatio !== null) {
          result.push(gearRatio);
        }
      }
    }
  }

  return result;
};


const getGearRatio = (params: {
  lines: string[];
  rowIndex: number;
  columnIndex: number;
}) => {
  const { lines, rowIndex, columnIndex } = params;
  const lineLength = lines[0].length;

  const adjacentCoords = [
    { rowIndex, columnIndex: columnIndex - 1 },
    { rowIndex: rowIndex - 1, columnIndex: columnIndex - 1 },
    { rowIndex: rowIndex + 1, columnIndex: columnIndex - 1 },
    { rowIndex, columnIndex: columnIndex + 1 },
    { rowIndex: rowIndex - 1, columnIndex: columnIndex + 1 },
    { rowIndex: rowIndex + 1, columnIndex: columnIndex + 1 },
    { rowIndex: rowIndex - 1, columnIndex },
    { rowIndex: rowIndex + 1, columnIndex }
  ].filter(({ rowIndex, columnIndex }) => {
    const isRowIndexOk = rowIndex >= 0 && rowIndex < lines.length;
    const isColumnIndexOk = columnIndex >=0 && columnIndex < lineLength;
  
    return isRowIndexOk && isColumnIndexOk;
  });

  let candidateCoords = adjacentCoords.filter(({ rowIndex, columnIndex}) => {
    return /\d/.test(lines[rowIndex][columnIndex]);
  }).toSorted((a, b) => {
    if (a.rowIndex !== b.rowIndex) {
      return a.rowIndex - b.rowIndex;
    } else {
      return a.columnIndex - b.columnIndex;
    }
  });

  // discard coords belonging to the same number
  let prunedCandidateCoords: { rowIndex: number, columnIndex: number }[] = [];

  let rowCursor: number | undefined;
  let columnCursor: number | undefined;

  for (const coords of candidateCoords) {
    if (rowCursor === coords.rowIndex && coords.columnIndex - columnCursor === 1) {
      rowCursor = coords.rowIndex;
      columnCursor = coords.columnIndex;
    } else {
      prunedCandidateCoords.push(coords);
      rowCursor = coords.rowIndex;
      columnCursor = coords.columnIndex;
    }
  }

  if (prunedCandidateCoords.length !== 2) {
    return null;
  }

  return prunedCandidateCoords.map(coords => readNumber({
    lines,
    rowIndex: coords.rowIndex,
    columnIndex: coords.columnIndex
  })).reduce((acc, num) => acc * num);
};



const readNumber = (params: {
  lines: string[];
  rowIndex: number;
  columnIndex: number;
}) => {
  const { lines, rowIndex, columnIndex } = params;
  const numberStr = readBothSides(lines, rowIndex, columnIndex);
  if (numberStr === null) {
    throw new Error('Expected a number!');
  }

  return parseInt(numberStr);
}


const readLeft = (lines: string[], rowIndex: number, columnIndex: number) => {
  const line = lines[rowIndex];
  let temp = '';
  while (columnIndex >= 0 && /\d/.test(line[columnIndex])) {
    temp = line[columnIndex] + temp;
    columnIndex--;
  }

  return temp ? temp : null;
};

const readRight = (lines: string[], rowIndex: number, columnIndex: number) => {
  const line = lines[rowIndex];
  let temp = '';
  while (columnIndex < line.length && /\d/.test(line[columnIndex])) {
    temp += line[columnIndex]; 
    columnIndex++;
  }

  return temp ? temp : null;
};

const readBothSides = (lines: string[], rowIndex: number, columnIndex: number) => {
  const line = lines[rowIndex];

  if (/\d/.test(line[columnIndex])) {
    return [
      readLeft(lines, rowIndex, columnIndex - 1),
      line[columnIndex],
      readRight(lines, rowIndex, columnIndex + 1),
    ].filter(x => x !== null).join('');
  }

  return null;
};
