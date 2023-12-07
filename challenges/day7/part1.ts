import { parseInput, type HandWithBid } from "./parseInput"

export const solvePart1 = (input: string) => {
  const game = parseInput(input);

  const orderedHands = orderHands(game);
  return countTotalWinnings(orderedHands);
};

// orders weakest -> strongest hands
const orderHands = (game: HandWithBid[]) => {
  return game.toSorted((hand1, hand2) => {
    if (hand1.hand.typeValue !== hand2.hand.typeValue) {
      return hand1.hand.typeValue - hand2.hand.typeValue;
    } else {
      for (let i = 0; i < hand1.hand.cardValues.length; i++) {
        const hand1Card = hand1.hand.cardValues[i];
        const hand2Card = hand2.hand.cardValues[i];
        if (hand1Card === hand2Card) {
          continue;
        }
        return hand1Card - hand2Card;
      }
      return 0;
    }
  });
};

// receives ordered hands
const countTotalWinnings = (game: HandWithBid[]) => {
  let total = 0;

  for (let i = 0; i < game.length; i++) {
    const rank = i + 1;
    const winning = game[i].bid * rank;
    total += winning;
  }

  return total;
};
