import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((el) => parseInt(el.trim()));

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let depthIncreaseCount = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
      depthIncreaseCount++;
    }
  }
  return depthIncreaseCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const windowWidth = 3;
  let depthIncreaseCount = 0;

  for (let i = windowWidth + 1; i <= input.length; i++) {
    const groupOneSum = input
      .slice(i - windowWidth - 1, i - 1)
      .reduce((a, b) => a + b);
    const groupTwoSum = input.slice(i - windowWidth, i).reduce((a, b) => a + b);
    if (groupTwoSum > groupOneSum) depthIncreaseCount++;
  }
  return depthIncreaseCount;
};

run({
  part1: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `199
      200
      208
      210
      200
      207
      240
      269
      260
      263`,
        expected: 5,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
