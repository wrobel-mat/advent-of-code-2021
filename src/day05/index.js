import run from "aocrunner";

class Diagram {
  _points = new Map();
  constructor() {}

  drawLine(...[[x1, y1], [x2, y2], part2]) {
    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    // draw vertical line
    if (dy > 0 && dx == 0) {
      const y0 = y1 < y2 ? y1 : y2;
      for (let i = y0; i <= y0 + dy; i++) {
        this.#addPoint([x1, i]);
      }
    }

    // draw horizontal line
    if (dx > 0 && dy == 0) {
      const x0 = x1 < x2 ? x1 : x2;
      for (let i = x0; i <= x0 + dx; i++) {
        this.#addPoint([i, y1]);
      }
    }

    // draw diagonal line
    if (part2 && dx == dy) {
      const [x0, y0, direction] =
        y1 < y2 ? [x1, y1, x2 > x1 ? 1 : -1] : [x2, y2, x1 > x2 ? 1 : -1];
      for (
        let yPos = y0, xPos = x0;
        yPos <= y0 + dy;
        yPos++, xPos += direction
      ) {
        this.#addPoint([xPos, yPos]);
      }
    }
  }

  countOverlappingPoints() {
    let counter = 0;
    this._points.forEach((occurences) => {
      if (occurences > 1) counter++;
    });
    return counter;
  }

  #addPoint(point) {
    const pointAsString = point.toString();
    if (this._points.has(pointAsString)) {
      this._points.set(pointAsString, this._points.get(pointAsString) + 1);
    } else {
      this._points.set(pointAsString, 1);
    }
  }
}

const parseInput = (rawInput) => rawInput.split("\n");
const parsePoints = (line) => {
  const [p1, p2] = line.split(" -> ");
  const [x1, y1] = p1.split(",");
  const [x2, y2] = p2.split(",");
  return [
    [parseInt(x1), parseInt(y1)],
    [parseInt(x2), parseInt(y2)],
  ];
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let diagram = new Diagram();
  input.forEach((line) => {
    const [p1, p2] = parsePoints(line);
    diagram.drawLine(p1, p2);
  });
  return diagram.countOverlappingPoints();
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let diagram = new Diagram();
  input.forEach((line) => {
    const [p1, p2] = parsePoints(line);
    diagram.drawLine(p1, p2, true);
  });
  return diagram.countOverlappingPoints();
};

run({
  part1: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 5,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
