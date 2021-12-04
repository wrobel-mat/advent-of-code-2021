import run from "aocrunner";

class BoardNumber {
  constructor(value, marked) {
    this.value = value;
    this.marked = marked;
  }
  setMarked(marked) {
    this.marked = marked;
  }
}

class Board {
  size = 5;
  constructor(rows) {
    this.rows = rows;
    this.cols = this.#getCols(rows);
  }
  isWinner() {
    let isWinner = false;
    this.rows.forEach((row) => {
      if (this.#hasAllNumbersMarked(row)) {
        isWinner = true;
        return;
      }
    });
    if (!isWinner) {
      this.cols.forEach((col) => {
        if (this.#hasAllNumbersMarked(col)) {
          isWinner = true;
          return;
        }
      });
    }
    return isWinner;
  }
  #getCols(rows) {
    let cols = [[], [], [], [], []];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        cols[j][i] = rows[i][j];
      }
    }
    return cols;
  }
  #hasAllNumbersMarked(line) {
    let markedNumbersCount = 0;
    line.forEach((num) => {
      if (num.marked) markedNumbersCount++;
    });
    return markedNumbersCount == this.size;
  }
}

class Bingo {
  numbers;
  boards;
  winningBoards = [];

  constructor(numbers, boards) {
    this.numbers = numbers;
    this.boards = boards;
  }

  playUntilFirstWinningBoard() {
    const that = this;
    let winningBoard;
    let winningNumber;
    for (let i = 0; i < that.numbers.length; i++) {
      that.boards.forEach((board) => {
        board.rows.forEach((row) => {
          row.forEach((number) => {
            if (number.value == that.numbers[i]) {
              number.setMarked(true);
            }
          });
        });
        if (board.isWinner()) {
          winningBoard = board;
          winningNumber = that.numbers[i];
          return;
        }
      });
      if (winningBoard && winningNumber) break;
    }
    return [winningBoard, winningNumber];
  }

  playAllBoards() {
    const that = this;
    for (let i = 0; i < that.numbers.length; i++) {
      that.boards.forEach((board, key) => {
        board.rows.forEach((row) => {
          row.forEach((number) => {
            if (number.value == that.numbers[i]) {
              number.setMarked(true);
            }
          });
        });
        if (board.isWinner()) {
          that.winningBoards.unshift({
            winningBoard: board,
            winningNumber: that.numbers[i],
          });
          that.boards.delete(key);
        }
      });
    }
  }

  getLastWinningBoard() {
    return this.winningBoards[0];
  }
}

const parseNumbers = (input) => input.split(",").map((num) => parseInt(num));
const parseBoards = (input) => {
  let boards = new Map();
  for (let i = 1; i < input.length; i++) {
    const rows = input[i].split("\n").map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((num) => new BoardNumber(parseInt(num), false)),
    );
    boards.set(i, new Board(rows));
  }
  return boards;
};
const parseInput = (rawInput) => {
  const input = rawInput.split("\n\n");
  const numbers = parseNumbers(input[0]);
  const boards = parseBoards(input);
  return [numbers, boards];
};

const calculateScore = (winningBoard, winningNumber) => {
  const unmarkedNumbersSum = winningBoard.rows.reduce((sum, row) => {
    return (
      sum +
      row.reduce((sum, number) => {
        return number.marked ? sum : sum + number.value;
      }, 0)
    );
  }, 0);
  return unmarkedNumbersSum * winningNumber;
};

const part1 = (rawInput) => {
  const [numbers, boards] = parseInput(rawInput);
  const bingo = new Bingo(numbers, boards);
  const [winningBoard, winningNumber] = bingo.playUntilFirstWinningBoard();
  return calculateScore(winningBoard, winningNumber);
};

const part2 = (rawInput) => {
  const [numbers, boards] = parseInput(rawInput);
  const bingo = new Bingo(numbers, boards);
  bingo.playAllBoards();
  const { winningBoard, winningNumber } = bingo.getLastWinningBoard();
  return calculateScore(winningBoard, winningNumber);
};

run({
  part1: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`,
        expected: 4512,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19

3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
2  0 12  3  7`,
        expected: 1924,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
