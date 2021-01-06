type RawDataArray = [string, string, string, string];
type DataArray = [number, number, string, string];
type InputData = DataArray[];
type Validator = (str: string, chr: string, pos1: number, pos2: number) => boolean;

function formatInput(input: string): InputData {
  const regex = /-| |: /gi;
  return input.split('\n').map(e => {
    const line: RawDataArray = e.split(regex) as RawDataArray;
    const outputLine: DataArray = line.map((x, i) => (i < 2 ? Number(x) : x)) as DataArray;
    return outputLine;
  });
}

export function run(input: string): string[] {
  const data = formatInput(input);

  function countChars(str: string, chr: string) {
    let occurrences = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === chr) {
        occurrences++;
      }
    }
    return occurrences;
  }

  const firstRule: Validator = (str, chr, pos1, pos2) => {
    const count = countChars(str, chr);
    return count >= pos1 && count <= pos2;
  };

  const secondRule: Validator = (str, chr, pos1, pos2) => {
    const isValid1 = str[pos1 - 1] === chr;
    const isValid2 = str[pos2 - 1] === chr;
    return (isValid1 && !isValid2) || (isValid2 && !isValid1);
  };

  function countValidPasswords(rule: Validator): number {
    let validCount = 0;
    for (let i = 0; i < data.length; i++) {
      if (rule(data[i][3], data[i][2], data[i][0], data[i][1])) {
        validCount++;
      }
    }
    return validCount;
  }

  return [`${countValidPasswords(firstRule)}`, `${countValidPasswords(secondRule)}`];
}
