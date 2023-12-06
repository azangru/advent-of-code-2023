export const parseInput = (input: string) => {
  const [timeLine, distanceLine] = input.trim().split('\n');
  const numberRegex = /(\d+)/g;

  const [ times, distances ] = [timeLine, distanceLine]
    .map(line => line.match(numberRegex).map(num => parseInt(num)));
  
  return {times, distances};
};

export const parseInput2 = (input: string) => {
  const [timeLine, distanceLine] = input.trim().split('\n');
  const regex = /(\d.+)/;

  const [ time, distance ] = [timeLine, distanceLine]
    .map(line => {
      const digits = line
        .match(/(\d.+)/)[1]
        .split(/\s+/).join('');

      return parseInt(digits);
    });
  
  return {time, distance};
};
