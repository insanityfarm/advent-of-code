type coords = [number, number];

export function run(input: string): void {
  const data = input.split('\n').map(e => {
    const line: string[] = e.split('');
    const outputLine: boolean[] = line.map(x => x === '#');
    return outputLine;
  });

  console.log('PART 1:');

  function isTree(position: coords) {
    return data[position[1]][position[0] % data[position[1]].length];
  }

  function move(position: coords, slope: coords) {
    return [position[0] + slope[0], position[1] + slope[1]] as coords;
  }

  function checkRoute(slope: coords) {
    let position = [0, 0] as coords;
    let treesEncountered = 0;
    while (position[1] < data.length) {
      isTree(position) && treesEncountered++;
      position = move(position, slope);
    }
    return treesEncountered;
  }

  console.log(checkRoute([3, 1]));

  console.log('\nPART 2:');

  console.log(checkRoute([1, 1]) * checkRoute([3, 1]) * checkRoute([5, 1]) * checkRoute([7, 1]) * checkRoute([1, 2]));
}
