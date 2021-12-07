import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput
    .split(",")
    .map((num) => parseInt(num))
    .sort();

const part1 = (rawInput) => {
  const crabPositions = parseInput(rawInput);
  let fuelUsePerPositionMap = new Map();
  for (
    let position = crabPositions[0];
    position < crabPositions[crabPositions.length - 1];
    position++
  ) {
    let fuelUsePerPosition = 0;
    crabPositions.forEach((crabPosition) => {
      fuelUsePerPosition += Math.abs(crabPosition - position);
    });
    fuelUsePerPositionMap.set(position, fuelUsePerPosition);
  }
  let minFuelUse = Number.MAX_VALUE;
  fuelUsePerPositionMap.forEach((fuelUse) => {
    if (fuelUse < minFuelUse) {
      minFuelUse = fuelUse;
    }
  });
  return minFuelUse;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let fuelUsePerPositionMap = new Map();
  let fuelUsePerStepsMap = new Map();
  for (
    let position = input[0];
    position < input[input.length - 1];
    position++
  ) {
    let fuelUsePerPosition = 0;
    input.forEach((crabPosposition) => {
      let steps = Math.abs(crabPosposition - position);
      if (fuelUsePerStepsMap.has(steps)) {
        fuelUsePerPosition += fuelUsePerStepsMap.get(steps);
      } else {
        let fuelUsePerSteps = 0;
        for (let step = 1; step <= steps; step++) {
          fuelUsePerSteps += step;
        }
        fuelUsePerStepsMap.set(steps, fuelUsePerSteps);
        fuelUsePerPosition += fuelUsePerSteps;
      }
    });
    fuelUsePerPositionMap.set(position, fuelUsePerPosition);
  }
  let minFuelUse = Number.MAX_VALUE;
  fuelUsePerPositionMap.forEach((fuelUse) => {
    if (fuelUse < minFuelUse) {
      minFuelUse = fuelUse;
    }
  });
  return minFuelUse;
};

run({
  part1: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 37 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `16,1,2,0,4,2,7,1,2,14`, expected: 168 }],
    solution: part2,
  },
  trimTestInputs: true,
});
