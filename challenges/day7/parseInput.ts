/**
 * Input looks like this:
 * 
 * 32T3K 765
 * T55J5 684
 */

export type HandWithBid = {
  hand: Hand;
  bid: number;
}

export type Hand = {
  hand: string;
  cardValues: number[];
  type: string;
  typeValue: number;
};


export const parseInput = (input: string) => {
  return input.trim()
    .split('\n')
    .map(parseLine);
};


const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

const assignValueToCard = (card: string) => {
  const cardIndex = cards.findIndex((c) => card === c);
  const cardValue = cards.length - cardIndex;

  return cardValue;
};

const parseLine = (line: string): HandWithBid => {
  const [hand, bid] = line.trim().split(' ');

  return {
    hand: interpretHand(hand),
    bid: parseInt(bid)
  };
};

export const interpretHand = (hand: string) => {
  const cardValues = hand.split('').map(card => assignValueToCard(card));

  return {
    hand,
    cardValues,
    ...getHandType(cardValues)
  };
};


/**
 * Five of a kind, where all five cards have the same label: AAAAA
 * Four of a kind, where four cards have the same label and one card has a different label: AA8AA
 * Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
 * Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
 * Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
 * One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
 * High card, where all cards' labels are distinct: 23456
 */

const types = [
  'five_of_a_kind',
  'four_of_a_kind',
  'full_house',
  'three_of_a_kind',
  'two_pair',
  'one_pair',
  'high_card'
]

const getHandType = (hand: number[]) => {
  const acc: Record<string, number> = {};

  for (const card of hand) {
    if (acc[card] === undefined) {
      acc[card] = 1;
    } else {
      acc[card] = acc[card] + 1;
    }
  }

  const accValues = Object.values(acc);

  if (accValues.length === 1) {
    // Five of a kind
    return {
      type: types[0],
      typeValue: types.length
    };
  } else if (accValues.length === 2 && accValues.includes(4)) {
    // Four of a kind
    return {
      type: types[1],
      typeValue: types.length - 1
    };
  } else if (accValues.length === 2) {
    // Full house
    return {
      type: types[2],
      typeValue: types.length - 2
    };
  } else if (accValues.length === 3 && accValues.includes(3)) {
    // Three of a kind
    return {
      type: types[3],
      typeValue: types.length - 3
    };
  } else if (accValues.length === 3) {
    // Two pair
    return {
      type: types[4],
      typeValue: types.length - 4
    };
  } else if (accValues.length === 4) {
    // One pair
    return {
      type: types[5],
      typeValue: types.length - 5
    };
  } else {
    // High card
    return {
      type: types[6],
      typeValue: types.length - 6
    };
  }

};
