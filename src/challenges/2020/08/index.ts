enum Operation {
  Acc = 'acc',
  Jmp = 'jmp',
  Nop = 'nop',
}
type InputData = [Operation, number][];
type BootResult = [boolean, number];

function formatInput(input: string): InputData {
  return input.split('\n').map(e => {
    const [operation, argument] = e.split(' ');
    return [operation as Operation, Number(argument)];
  });
}

function boot(program: InputData): BootResult {
  const operationHistory = [];
  let success = true;
  let accumulator = 0;
  let i = 0;
  while (i < program.length) {
    if (!operationHistory.includes(i)) {
      operationHistory.push(i);
      const [operation, argument] = program[i];
      switch (operation) {
        case Operation.Acc:
          accumulator += argument;
          i++;
          break;
        case Operation.Jmp:
          i += argument;
          break;
        case Operation.Nop:
          i++;
          break;
      }
    } else {
      success = false;
      break;
    }
  }

  return [success, accumulator];
}

function fix(program: InputData): number {
  let result: BootResult = [false, 0];
  let i = -1;
  while (!result[0] && i < program.length) {
    const currentProgram: InputData = program.map(line => [...line]);
    if (i > -1) {
      switch (currentProgram[i][0]) {
        case Operation.Jmp:
          currentProgram[i][0] = Operation.Nop;
          break;
        case Operation.Nop:
          currentProgram[i][0] = Operation.Jmp;
          break;
      }
    }
    result = [...boot(currentProgram)];
    i++;
  }
  return result[1];
}

export function run(input: string): string[] {
  const data = formatInput(input);
  return [`${boot(data)[1]}`, `${fix(data)}`];
}
