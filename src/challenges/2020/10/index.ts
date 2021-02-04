type InputData = number[];
interface Differences {
  '1': number;
  '2': number;
  '3': number;
}
interface JoltsInfo {
  compatibilities: number[][];
  differences: Differences;
  pathCount: number;
}

function formatInput(input: string): InputData {
  return input.split('\n').map(e => Number(e));
}

function findCompatibilities(sortedData: InputData, rating: number): number[] {
  const result = [] as number[];
  for (let i = sortedData.indexOf(rating) - 1; rating - sortedData[i] <= 3; i--) {
    result.push(sortedData[i]);
  }
  return result;
}

function countPaths(sortedData: InputData, compatibilities: number[][]): number {
  const paths = Array(sortedData[sortedData.length - 1] - 2) as number[];
  paths[0] = 1;
  for (let i = 1; i < paths.length; i++) {
    let pathsTotal = 0;
    compatibilities[i]?.forEach(compatibility => (pathsTotal += paths[compatibility]));
    paths[i] = pathsTotal;
  }
  return paths[paths.length - 1];
}

function findJoltsInfo(data: InputData): JoltsInfo {
  let currentRating = 0;
  data.push(0);
  data.sort((a, b) => a - b).push(data[data.length - 1] + 3);
  const joltsInfo = {
    compatibilities: Array(data[data.length - 1] + 1) as number[][],
    differences: {
      '1': 0,
      '2': 0,
      '3': 0,
    } as Differences,
    pathCount: 0,
  };
  data.forEach(rating => {
    if (rating === 0) {
      return;
    }
    const difference = rating - currentRating;
    Object.prototype.hasOwnProperty.call(joltsInfo.differences, difference) && joltsInfo.differences[difference]++;
    joltsInfo.compatibilities[rating] = findCompatibilities(data, rating);
    currentRating = rating;
  });
  joltsInfo.pathCount = countPaths(data, joltsInfo.compatibilities);
  return joltsInfo;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  const { differences, pathCount } = findJoltsInfo(data);
  return [`${differences['1'] * differences['3']}`, `${pathCount}`];
}
