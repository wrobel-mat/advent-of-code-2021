import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((num) => num.trim());

const bitCountCalculator = {
  0: (counter) => --counter,
  1: (counter) => ++counter,
};

const calculateBitCountV1 = (arr) => {
  let counters = arr[0].split("").map((num) => 0);
  arr.forEach((num) => {
    const numArr = [...num];
    for (let i = 0; i < numArr.length; i++) {
      counters[i] = bitCountCalculator[numArr[i]](counters[i]);
    }
  });
  return counters;
};

const calculateBitCountV2 = (arr, posIndex) => {
  let counter = 0;
  arr.forEach((num) => {
    counter = bitCountCalculator[num.split("")[posIndex]](counter);
  });
  return counter;
};

const binToDec = (bin) => {
  return parseInt(bin, 2).toString(10);
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const counters = calculateBitCountV1(input);
  const [gammaRate, epsilonRate] = (() => {
    let gammaArr = [];
    let epsilonArr = [];
    for (let i = 0; i < counters.length; i++) {
      gammaArr[i] = counters[i] > 0 ? 1 : 0;
      epsilonArr[i] = counters[i] > 0 ? 0 : 1;
    }
    return [binToDec(gammaArr.join("")), binToDec(epsilonArr.join(""))];
  })();

  return gammaRate * epsilonRate;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const loopSize = input[0].length;
  let oxygenRatingCandidates = input;
  let co2RatingCandidates = input;
  let oxygenRating;
  let co2Rating;

  for (let i = 0; i < loopSize; i++) {
    if (!oxygenRating) {
      const oxygenBitCounter = calculateBitCountV2(oxygenRatingCandidates, i);
      const mostCommonBit = oxygenBitCounter >= 0 ? 1 : 0;
      let filteredOxygenCandidates = [];
      oxygenRatingCandidates.forEach((num) => {
        if (num.split("")[i] == mostCommonBit)
          filteredOxygenCandidates.push(num);
      });
      oxygenRatingCandidates = filteredOxygenCandidates;
      if (oxygenRatingCandidates.length == 1)
        oxygenRating = binToDec(oxygenRatingCandidates[0]);
    }
    if (!co2Rating) {
      const co2Counter = calculateBitCountV2(co2RatingCandidates, i);
      const leastCommonBit = co2Counter >= 0 ? 0 : 1;
      let filteredCO2Candidates = [];
      co2RatingCandidates.forEach((num) => {
        if (num.split("")[i] == leastCommonBit) filteredCO2Candidates.push(num);
      });
      co2RatingCandidates = filteredCO2Candidates;
      if (co2RatingCandidates.length == 1)
        co2Rating = binToDec(co2RatingCandidates[0]);
    }

    if (oxygenRatingCandidates.length <= 1 && co2RatingCandidates.length <= 1)
      break;
  }

  return oxygenRating * co2Rating;
};

run({
  part1: {
    tests: [
      {
        input: `00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`,
        expected: 198,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`,
        expected: 230,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
