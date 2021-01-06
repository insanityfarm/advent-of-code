type InputData = boolean[][];
type Coords = [number, number];

function formatInput(input: string): InputData {
  return input.split('\n').map(e => {
    const line: string[] = e.split('');
    const outputLine: boolean[] = line.map(x => x === '#');
    return outputLine;
  });
}

export function run(input: string): string[] {
  const data = formatInput(input);

  function isTree(position: Coords) {
    return data[position[1]][position[0] % data[position[1]].length];
  }

  function move(position: Coords, slope: Coords) {
    return [position[0] + slope[0], position[1] + slope[1]] as Coords;
  }

  function checkRoute(slope: Coords): number {
    let position = [0, 0] as Coords;
    let treesEncountered = 0;
    while (position[1] < data.length) {
      isTree(position) && treesEncountered++;
      position = move(position, slope);
    }
    return treesEncountered;
  }

  return [
    `${checkRoute([3, 1])}`,
    `${checkRoute([1, 1]) * checkRoute([3, 1]) * checkRoute([5, 1]) * checkRoute([7, 1]) * checkRoute([1, 2])}`,
  ];
}
