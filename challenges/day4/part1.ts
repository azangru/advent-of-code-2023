import { parseCard, type Card } from './parseInput'

export const solvePart1 = (input: string) => {
  const cards = input.trim()
    .split('\n')
    .map(line => parseCard(line.trim()));

  return cards
    .map(getCardValue)
    .reduce((acc, val) => acc + val);
};

const getCardValue = (card: Card) => {
  const winningNumbers = new Set(card.winningNumbers);

  let matches = 0;

  for (const number of card.currentNumbers) {
    if (winningNumbers.has(number)) {
      matches++;
    }
  }

  const score = matches ? 2 ** (matches - 1) : 0;

  return score;
};
