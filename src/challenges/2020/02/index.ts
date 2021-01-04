type RawDataArray = [string, string, string, string];
type DataArray = [number, number, string, string];

export function run(input: string): void {
  const regex = /-| |: /gi;
  const data = input.split('\n').map(e => {
    const line: RawDataArray = e.split(regex) as RawDataArray;
    const outputLine: DataArray = line.map((x, i) => (i < 2 ? Number(x) : x)) as DataArray;
    return outputLine;
  });

  console.log('PART 1:');

  function countChars(str: string, chr: string) {
    let occurrences = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === chr) {
        occurrences++;
      }
    }
    return occurrences;
  }

  function isValidPartOne(str: string, chr: string, pos1: number, pos2: number) {
    if (str) {
      const count = countChars(str, chr);
      return count >= pos1 && count <= pos2;
    }
    return false;
  }

  let validCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (isValidPartOne(data[i][3], data[i][2], data[i][0], data[i][1])) {
      validCount++;
    }
  }

  console.log(validCount);

  console.log('\nPART 2:');

  function isValidPartTwo(str: string, chr: string, pos1: number, pos2: number) {
    if (str) {
      const isValid1 = str[pos1 - 1] === chr;
      const isValid2 = str[pos2 - 1] === chr;
      return (isValid1 && !isValid2) || (isValid2 && !isValid1);
    }
    return false;
  }

  validCount = 0;

  for (let i = 0; i < data.length; i++) {
    if (isValidPartTwo(data[i][3], data[i][2], data[i][0], data[i][1])) {
      validCount++;
    }
  }

  console.log(validCount);
}
