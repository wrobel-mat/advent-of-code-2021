import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((el) => el.trim());

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let horizontalPos = 0;
  let depth = 0;
  const move = {
    forward: (steps) => {
      horizontalPos += steps;
    },
    down: (steps) => {
      depth += steps;
    },
    up: (steps) => {
      depth -= steps;
    },
  };

  input.forEach((instruction) => {
    const [command, steps] = instruction.split(" ");
    move[command](parseInt(steps));
  });

  return horizontalPos * depth;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let horizontalPos = 0;
  let depth = 0;
  let aim = 0;

  const move = {
    forward: (steps) => {
      horizontalPos += steps;
      depth += aim * steps;
    },
    down: (steps) => {
      aim += steps;
    },
    up: (steps) => {
      aim -= steps;
    },
  };

  input.forEach((instruction) => {
    const [command, steps] = instruction.split(" ");
    move[command](parseInt(steps));
  });

  return horizontalPos * depth;
};

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
