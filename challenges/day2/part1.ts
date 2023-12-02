import { parseGame, type Game } from './parseGame';

const CONSTRAINT = {
  red: 12,
  green: 13,
  blue: 14
};

export const solvePart1 = (input: string) => {
  const games = input
    .trim()
    .split('\n')
    .map(parseGame);

  return games.filter(isValidGame)
    .reduce((acc, game) => {
      return acc + parseInt(game.id);
    }, 0);
};

const isValidGame = (game: Game) => {
  for (const round of game.rounds) {
    for (const color of Object.keys(round)) {
      if (round[color] > CONSTRAINT[color]) {
        return false;
      }
    }
  }

  return true;
};
