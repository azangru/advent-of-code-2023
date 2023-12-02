import { parseGame, type Game, GameRound } from './parseGame';

export const solvePart2 = (input: string) => {
  const games = input
    .trim()
    .split('\n')
    .map(parseGame);

  return games.map(getFewestNumberOfCubesOfEachColor)
    .map(getPowerOfSetOfCubes)
    .reduce((acc, val) => acc + val);
};

const getFewestNumberOfCubesOfEachColor = (game: Game) => {
  const result: GameRound = {};

  for (const round of game.rounds) {
    for (const color of Object.keys(round)) {
      if (!result[color] || round[color] > result[color]) {
        result[color] = round[color];
      }
    }
  }

  return result;
};

const getPowerOfSetOfCubes = (cubes: GameRound) => {
  return Object.values(cubes).reduce((acc, val) => acc * val);
};
