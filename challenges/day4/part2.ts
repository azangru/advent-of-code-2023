import { parseCard, type Card } from './parseInput'

export const solvePart2 = (input: string) => {
  const cards = input.trim()
    .split('\n')
    .map(line => parseCard(line.trim()));

  return getTotalScore(cards);
};

const getTotalScore = (cards: Card[]) => {
  const cardIds: number[] = [];
  const cardsMap = new Map<number, Card>();
  const cardsCountMap = new Map<number, number>();

  for (const card of cards) {
    cardIds.push(card.id);
    cardsMap.set(card.id, card);
    cardsCountMap.set(card.id, 1);
  }

  for (const cardId of cardIds) {
    const card = cardsMap.get(cardId) as Card;
    const score = getCardScore(card);
    updateCardsCountMap({ cardId, score, cardsCountMap });
  }

  return [...cardsCountMap.values()]
    .reduce((acc, value) => acc + value);
};

const getCardScore = (card: Card) => {
  const winningNumbers = new Set(card.winningNumbers);

  let matches = 0;

  for (const number of card.currentNumbers) {
    if (winningNumbers.has(number)) {
      matches++;
    }
  }

  return matches;
};

const updateCardsCountMap = (params: {
  cardId: number;
  score: number;
  cardsCountMap: Map<number, number>;
}) => {
  const { cardId, score, cardsCountMap } = params;
  if (!score) {
    return;
  }

  const currentCardCount = cardsCountMap.get(cardId) as number;

  for (let i = 0; i < currentCardCount; i++) {
    for (let i = 0; i < score; i++) {
      const nextCardId = cardId + i + 1;
      const currentCount = cardsCountMap.get(nextCardId) as number;
      cardsCountMap.set(nextCardId, currentCount + 1);
    }
  }
};
