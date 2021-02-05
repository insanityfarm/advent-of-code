type Instruction = [Direction | Rotation | 'F', number];
type InputData = Instruction[];
interface Point {
  x: number;
  y: number;
}
interface ShipPoint extends Point {
  angle: DirectionAngle;
}
enum Direction {
  N = 'N',
  E = 'E',
  S = 'S',
  W = 'W',
}
enum DirectionAngle {
  N = 0,
  E = 90,
  S = 180,
  W = 270,
}
enum Rotation {
  R = 'R',
  L = 'L',
}
enum RotationMultiplier {
  R = 1,
  L = -1,
}

function formatInput(input: string): InputData {
  return input.split('\n').map(e => [e[0], parseInt(e.slice(1))] as Instruction);
}

function findManhattanDistance(point: Point): number {
  return Math.abs(point.x) + Math.abs(point.y);
}

function navigateByShip(instructions: InputData, ship: ShipPoint): number {
  let { angle, x, y } = ship;
  for (const instruction of instructions) {
    const [action, distance] = instruction;
    switch (action) {
      case 'F':
        switch (angle) {
          case DirectionAngle.N:
            y += distance;
            break;
          case DirectionAngle.E:
            x += distance;
            break;
          case DirectionAngle.S:
            y -= distance;
            break;
          case DirectionAngle.W:
            x -= distance;
            break;
        }
        break;
      case Direction.N:
        y += distance;
        break;
      case Direction.E:
        x += distance;
        break;
      case Direction.S:
        y -= distance;
        break;
      case Direction.W:
        x -= distance;
        break;
      case Rotation.L:
        angle = (angle + distance * RotationMultiplier.L) % 360;
        break;
      case Rotation.R:
        angle = (angle + distance * RotationMultiplier.R) % 360;
        break;
    }
    angle += angle < 0 ? 360 : 0;
  }
  return findManhattanDistance({ x, y });
}

function navigateByWaypoint(instructions: InputData, ship: ShipPoint, waypoint: Point): number {
  let shipX = ship.x;
  let shipY = ship.y;
  let waypointX = waypoint.x;
  let waypointY = waypoint.y;
  for (const instruction of instructions) {
    const [action, distance] = instruction;
    switch (action) {
      case 'F':
        shipX += waypointX * distance;
        shipY += waypointY * distance;
        break;
      case Direction.N:
        waypointY += distance;
        break;
      case Direction.E:
        waypointX += distance;
        break;
      case Direction.S:
        waypointY -= distance;
        break;
      case Direction.W:
        waypointX -= distance;
        break;
      case Rotation.L:
        for (let i = 0; i < distance / 90; i++) {
          const x = waypointX;
          waypointX = waypointY * -1;
          waypointY = x;
        }
        break;
      case Rotation.R:
        for (let i = 0; i < distance / 90; i++) {
          const x = waypointX;
          waypointX = waypointY;
          waypointY = x * -1;
        }
        break;
    }
  }
  return findManhattanDistance({ x: shipX, y: shipY });
}

export function run(input: string): string[] {
  const data = formatInput(input);
  const ship: ShipPoint = {
    angle: DirectionAngle.E,
    x: 0,
    y: 0,
  };
  const waypoint: Point = {
    x: 10,
    y: 1,
  };
  return [`${navigateByShip(data, ship)}`, `${navigateByWaypoint(data, ship, waypoint)}`];
}
