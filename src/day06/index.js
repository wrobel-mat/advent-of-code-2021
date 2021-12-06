import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split(",").map((num) => parseInt(num));

const spawnFishes = (fishFamily, fishGroup, fishGroupQty) => {
  fishFamily.has(fishGroup)
    ? fishFamily.set(fishGroup, fishFamily.get(fishGroup) + fishGroupQty)
    : fishFamily.set(fishGroup, fishGroupQty);
};

const initialFishFamilyMap = (input) => {
  let fishFamily = new Map();
  input.forEach((fish) => {
    spawnFishes(fishFamily, fish, 1);
  });
  return fishFamily;
};

const simulateFishSpawn = (input, simulationTime) => {
  const newbornSpawnCycle = 8;
  const adultSpawnCycle = 6;
  let fishFamily = initialFishFamilyMap(input);

  for (let day = 0; day < simulationTime; day++) {
    let newFishFamily = new Map();
    fishFamily.forEach((fishGroupQty, fishGroup) => {
      if (fishGroup > 0) {
        spawnFishes(newFishFamily, fishGroup - 1, fishGroupQty);
      } else {
        spawnFishes(newFishFamily, newbornSpawnCycle, fishGroupQty);
        spawnFishes(newFishFamily, adultSpawnCycle, fishGroupQty);
      }
    });
    fishFamily = newFishFamily;
  }

  let fishFamilyQty = 0;
  fishFamily.forEach((fishGroupQty) => {
    fishFamilyQty += fishGroupQty;
  });
  return fishFamilyQty;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return simulateFishSpawn(input, 80);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return simulateFishSpawn(input, 256);
};

run({
  part1: {
    tests: [{ input: `3,4,3,1,2`, expected: 5934 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: `3,4,3,1,2`, expected: 26984457539 }],
    solution: part2,
  },
  trimTestInputs: true,
});
