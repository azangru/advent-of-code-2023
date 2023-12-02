/**
 * Game string format:
 * - Starts with the word "Game", followed by the id, followed by a colon and a space
 * - This is followed by several game rounds, separated by a semicolon
 * - Each round shows a list of cubes, starting with a number and followed by the color
 * 
 * Example:
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 */

export type Game = {
  id: string;
  rounds: GameRound[];
};

export type GameRound = {
  red?: number;
  green?: number;
  blue?: number;
};

export const parseGame = (gameStr: string) => {
  const gameIdRegex = /Game (\d+): /; 
  const gameId = gameStr.match(gameIdRegex)?.[1] as string;

  const game: Game = {
    id: gameId,
    rounds: []
  };

  const rounds = gameStr.replace(gameIdRegex, '')
    .split('; ');

  for (const roundData of rounds) {
    const singleColorCubesData = roundData.split(', ');
    const round: GameRound = {};

    for (const cubes of singleColorCubesData) {
      const [countStr, color] = cubes.split(' ');
      const count = parseInt(countStr);
      round[color] = count;
    }

    game.rounds.push(round);
  }

  return game;
};
