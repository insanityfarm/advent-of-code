enum Answer {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
  E = 'e',
  F = 'f',
  G = 'g',
  H = 'h',
  I = 'i',
  J = 'j',
  K = 'k',
  L = 'l',
  M = 'm',
  N = 'n',
  O = 'o',
  P = 'p',
  Q = 'q',
  R = 'r',
  S = 's',
  T = 't',
  U = 'u',
  V = 'v',
  W = 'w',
  X = 'x',
  Y = 'y',
  Z = 'z',
}

type Response = Answer[];
type Group = Response[];
type InputData = Group[];

function formatInput(input: string): InputData {
  return input.split('\n\n').map(group => group.split('\n').map(response => response.split('') as Response));
}

function countGroupAnswers(groups: InputData, isRequiredForAllResponses = false): number {
  let total = 0;
  for (const group of groups) {
    const answers: { [key in Answer]?: number } = {};
    let requiredForAllResponsesCount = 0;
    for (const response of group) {
      for (const answer of response) {
        answers[answer] = Object.prototype.hasOwnProperty.call(answers, answer) ? answers[answer] + 1 : 1;
        if (answers[answer] === group.length) {
          requiredForAllResponsesCount++;
        }
      }
    }
    total += isRequiredForAllResponses ? requiredForAllResponsesCount : Object.keys(answers).length;
  }
  return total;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  return [`${countGroupAnswers(data)}`, `${countGroupAnswers(data, true)}`];
}
