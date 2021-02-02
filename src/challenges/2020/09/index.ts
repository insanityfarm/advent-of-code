type InputData = number[];

function formatInput(input: string): InputData {
  return input.split('\n').map(e => Number(e));
}

function findFirstInvalid(data: InputData): number {
  const preambleLength = 25;
  for (let sumIndex = preambleLength; sumIndex < data.length; sumIndex++) {
    let areAddendsFound = false;
    for (
      let firstAddendIndex = sumIndex - preambleLength;
      firstAddendIndex < sumIndex - 1 && !areAddendsFound;
      firstAddendIndex++
    ) {
      for (
        let secondAddendIndex = firstAddendIndex + 1;
        secondAddendIndex < sumIndex && !areAddendsFound;
        secondAddendIndex++
      ) {
        if (data[firstAddendIndex] + data[secondAddendIndex] === data[sumIndex]) {
          areAddendsFound = true;
        }
      }
    }
    if (!areAddendsFound) {
      return data[sumIndex];
    }
  }
  return 0;
}

function getExploitRangeSum(data: InputData, target: number): number {
  for (let i = 0; i < data.length - 1; i++) {
    let [sum, max, min] = Array(3).fill(data[i]) as number[];
    for (let j = i + 1; sum < target && j < data.length; j++) {
      sum += data[j];
      min = data[j] < min ? data[j] : min;
      max = data[j] > max ? data[j] : max;
      if (sum === target) {
        return min + max;
      }
    }
  }

  return 1;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  const firstInvalid = findFirstInvalid(data);
  return [`${firstInvalid}`, `${getExploitRangeSum(data, firstInvalid)}`];
}
