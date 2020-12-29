export function run(input: string): void {
  const data = input.split('\n').map(e => Number(e));
  let solutionFound = false;

  console.log('PART 1:');
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (Number(data[i]) + Number(data[j]) === 2020) {
        console.log(Number(data[i]) * Number(data[j]));
        solutionFound = true;
        break;
      }
    }
    if (solutionFound) {
      break;
    }
  }

  console.log('\nPART 2:');
  solutionFound = false;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      for (let k = j + 1; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          console.log(data[i] * data[j] * data[k]);
          solutionFound = true;
          break;
        }
      }
      if (solutionFound) {
        break;
      }
    }
    if (solutionFound) {
      break;
    }
  }
}
