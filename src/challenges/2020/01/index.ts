type InputData = number[];

function formatInput(input: string): InputData {
  return input.split('\n').map(e => Number(e));
}

export function run(input: string): string[] {
  const data = formatInput(input);

  function recurse(
    remainingDepth: number,
    total: number,
    validate: (state: number[], total: number) => boolean,
    totalDepth: number = remainingDepth,
    state: number[] = []
  ): number[] {
    remainingDepth--;
    const currentDepth = totalDepth - remainingDepth;
    for (let i = totalDepth - currentDepth - 1; i < data.length; i++) {
      const currentElement = data[i];
      const currentState = [...state, currentElement];
      if (remainingDepth >= 0) {
        const nextState = recurse(remainingDepth, total, validate, totalDepth, currentState);
        if (validate(nextState, total)) {
          return nextState;
        }
      }
    }
    return state;
  }

  function validateArrayElementSum(arr: number[], total: number): boolean {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum === total;
  }

  function findProductOfSummands(summandCount: number, total: number): number {
    const factors = recurse(summandCount, total, arr => validateArrayElementSum(arr, total));
    let product = 1;
    for (let i = 0; i < factors.length; i++) {
      product *= factors[i];
    }
    return product;
  }

  return [`${findProductOfSummands(2, 2020)}`, `${findProductOfSummands(3, 2020)}`];
}
