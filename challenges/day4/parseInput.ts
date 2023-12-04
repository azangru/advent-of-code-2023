/** 
 * Example line:
 * Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
*/

export type Card = {
  id: number;
  winningNumbers: number[];
  currentNumbers: number[];
};

export const parseCard = (line: string): Card => {
  const idRegex = /Card\s+(\d+): /;
  const id = line.match(idRegex)[1];

  const [winningNumbersSection, currentNumbersSection] =
    line.replace(idRegex, '').split(' | ');
  
  const numberRegex = /(\d+)/g;
  const winningNumbers = winningNumbersSection
    .match(numberRegex)
    .map((num) => parseInt(num));
  const currentNumbers = currentNumbersSection
    .match(numberRegex)
    .map((num) => parseInt(num));

  return {
    id: parseInt(id),
    winningNumbers,
    currentNumbers
  };
};
