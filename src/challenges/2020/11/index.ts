enum Position {
  Floor = '.',
  EmptySeat = 'L',
  OccupiedSeat = '#',
}
type InputData = Position[][];
type Rule = (room: InputData, row: number, col: number) => Position;
type Ruleset = Rule[];

function formatInput(input: string): InputData {
  return input.split('\n').map(e => [...e] as Position[]);
}

function clone(data: InputData): InputData {
  return data.map(row => [...row]);
}

// variation on this function: https://stackoverflow.com/a/3276730
function checksum(room: InputData): string {
  const s = JSON.stringify(room);
  let chk = 0x12345678;
  for (let i = 0; i < s.length; i++) {
    chk += s.charCodeAt(i) * (i + 1);
  }
  return (chk & 0xffffffff).toString(16);
}

const directionalDeltas = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
] as [number, number][];

function getAdjacentSeats(room: InputData, row: number, col: number): Position[] {
  return directionalDeltas
    .map(delta => {
      const r = row + delta[0];
      const c = col + delta[1];
      return (room[r] && room[r][c] && room[r][c] !== Position.Floor && room[r][c]) || false;
    })
    .filter(e => !!e) as Position[];
}

function getVisibleSeats(room: InputData, row: number, col: number): Position[] {
  return directionalDeltas
    .map(delta => {
      const pos = [row, col];
      while (room[(pos[0] += delta[0])] && room[pos[0]][(pos[1] += delta[1])]) {
        if (room[pos[0]][pos[1]] !== Position.Floor) {
          return room[pos[0]][pos[1]];
        }
      }
      return false;
    })
    .filter(e => !!e) as Position[];
}

const occupyEmptyIfNoAdjacentSeatsAreOccupied: Rule = (room, row, col) => {
  const pos = room[row][col];
  const adjacentSeats = getAdjacentSeats(room, row, col);
  return pos === Position.EmptySeat && !adjacentSeats.includes(Position.OccupiedSeat) ? Position.OccupiedSeat : pos;
};

const vacateOccupiedIfFourAdjacentSeatsAreOccupied: Rule = (room, row, col) => {
  const pos = room[row][col];
  const adjacentPositions = getAdjacentSeats(room, row, col);
  return pos === Position.OccupiedSeat && adjacentPositions.filter(e => e === Position.OccupiedSeat).length >= 4
    ? Position.EmptySeat
    : pos;
};

const occupyEmptyIfNoVisibleSeatsAreOccupied: Rule = (room, row, col) => {
  const pos = room[row][col];
  const visibleSeats = getVisibleSeats(room, row, col);
  return pos === Position.EmptySeat && !visibleSeats.includes(Position.OccupiedSeat) ? Position.OccupiedSeat : pos;
};

const vacateOccupiedIfFiveVisibleSeatsAreOccupied: Rule = (room, row, col) => {
  const pos = room[row][col];
  const visibleSeats = getVisibleSeats(room, row, col);
  return pos === Position.OccupiedSeat && visibleSeats.filter(e => e === Position.OccupiedSeat).length >= 5
    ? Position.EmptySeat
    : pos;
};

function applyRules(room: InputData, rules: Ruleset): InputData {
  const newRoom = clone(room);
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      let pos = newRoom[row][col];
      for (let rule = 0; rule < rules.length; rule++) {
        const newPos = rules[rule](newRoom, row, col);
        if (pos !== newPos) {
          pos = newPos;
          break;
        }
      }
      room[row][col] = pos;
    }
  }
  return room;
}

function findEquilibrium(room: InputData, rules: Ruleset): InputData {
  const hashes = {};
  let i = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const newRoom = applyRules(clone(room), rules);
    const hash = checksum(newRoom);
    if (Object.prototype.hasOwnProperty.call(hashes, hash)) {
      break;
    }
    hashes[hash] = i++;
    room = newRoom;
  }
  return room;
}

function countOccupiedSeats(room: InputData): number {
  let count = 0;
  room.forEach(row => row.forEach(pos => pos === Position.OccupiedSeat && count++));
  return count;
}

export function run(input: string): string[] {
  const data = formatInput(input);
  const rulesetOne: Ruleset = [occupyEmptyIfNoAdjacentSeatsAreOccupied, vacateOccupiedIfFourAdjacentSeatsAreOccupied];
  const rulesetTwo: Ruleset = [occupyEmptyIfNoVisibleSeatsAreOccupied, vacateOccupiedIfFiveVisibleSeatsAreOccupied];
  const firstResult = findEquilibrium(data, rulesetOne);
  const secondResult = findEquilibrium(data, rulesetTwo);
  return [`${countOccupiedSeats(firstResult)}`, `${countOccupiedSeats(secondResult)}`];
}
