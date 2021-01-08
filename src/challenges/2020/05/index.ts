type BoardingPass = [string, string];
type Range = [number, number];
type InputData = BoardingPass[];

const plane = {
  rows: 128,
  cols: 8,
};

function formatInput(input: string): InputData {
  return input.split('\n').map(e => [e.slice(0, -3), e.slice(-3)]);
}

function getMidpoint(range: Range): number {
  return (range[1] - range[0]) / 2 + range[0];
}

function resolveTree(tree, max: number): number {
  const range: Range = [0, max];
  for (const node of tree) {
    const index = ['F', 'L'].includes(node) ? 1 : 0;
    range[index] = getMidpoint(range);
  }
  return range[0];
}

function findSeatId(boardingPass: BoardingPass): number {
  const [rowTree, colTree] = boardingPass;
  const { rows, cols } = plane;
  const seatRow = resolveTree(rowTree, rows);
  const seatCol = resolveTree(colTree, cols);
  return seatRow * 8 + seatCol;
}

function getSeatIdData(boardingPasses): [number, number[]] {
  let lowestFound = 9999;
  const ids: number[] = [];
  for (const boardingPass of boardingPasses) {
    const seatId = findSeatId(boardingPass);
    if (seatId < lowestFound) {
      lowestFound = seatId;
    }
    ids.push(seatId);
  }
  return [lowestFound, ids];
}

function findMissingSeatId(boardingPasses): number {
  const seatIdData = getSeatIdData(boardingPasses);
  for (let [minId, ids] = seatIdData, i = minId; i < ids.length + minId; i++) {
    if (!ids.includes(i)) {
      return i;
    }
  }
  return 0;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  return [`${getSeatIdData(data)[0]}`, `${findMissingSeatId(data)}`];
}
