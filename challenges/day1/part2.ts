export const solvePart2 = (input: string) => {
  const lines = input.trim().split('\n');
  return lines.reduce((acc, line) => {
    return acc + findLineValue(line);
  }, 0);
};

const findLineValue = (line: string) => {
  let firstIndex: number | null = null;
  let lastIndex: number | null = null;

  let firstMatch = '';
  let lastMatch = '';

  for (const candidate of allCandidates) {
    const candidateFirstIndex = line.indexOf(candidate);
    const candidateLastIndex = line.lastIndexOf(candidate);
    if (candidateFirstIndex === -1) {
      continue;
    }
    if (firstIndex === null || candidateFirstIndex < firstIndex) {
      firstIndex = candidateFirstIndex;
      firstMatch = candidate;
    };
    if (lastIndex === null || candidateLastIndex > lastIndex) {
      lastIndex = candidateLastIndex;
      lastMatch = candidate;
    };
  };

  let firstNumber = 0;
  let lastNumber = 0;

  if (/\d/.test(firstMatch)) {
    firstNumber = parseInt(firstMatch);
  } else {
    firstNumber = wordsMap[firstMatch];
  }

  if (/\d/.test(lastMatch)) {
    lastNumber = parseInt(lastMatch);
  } else {
    lastNumber = wordsMap[lastMatch];
  }

  return parseInt(`${firstNumber}${lastNumber}`);
};

const digits = Array(9)
  .fill(0)
  .map((_, index) =>  `${index + 1}`);

const wordsMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
};

const words = Object.keys(wordsMap);

const allCandidates = digits.concat(words);
