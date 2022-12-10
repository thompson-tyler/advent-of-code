const fs = require("fs");

// Maps part 1 characters to their respective moves:
//    A | X -> 0 (rock)
//    B | Y -> 1 (paper)
//    C | Z -> 2 (scissors)
// Also used to map part 2 outcome characters:
//    X -> 0 (lose)
//    Y -> 1 (tie)
//    Z -> 2 (win)
const MOVE_MAP = {
  A: 0,
  B: 1,
  C: 2,
  X: 0,
  Y: 1,
  Z: 2,
};

// Maps moves to the score that they yield:
//    0 (rock) -> 1
//    1 (paper) -> 2
//    2 (scissors) -> 3
const MOVE_VALS = {
  0: 1,
  1: 2,
  2: 3,
};

// Maps two moves to the resulting score:
//    [rock, paper] -> 6 (win)
//    [scissors, paper] -> 0 (lose)
//    [rock, rock] -> 3 (tie)
//    ...
const OUTCOMES = [
  [3, 6, 0],
  [0, 3, 6],
  [6, 0, 3],
];

// Open input file
const input = fs.readFileSync("input.txt", "utf8");

let score_sum = 0;
input.split("\n").forEach((line) => {
  let moves = line.split(" ");
  let op_move = MOVE_MAP[moves[0]];
  let my_move = MOVE_MAP[moves[1]];
  score_sum += MOVE_VALS[my_move];
  score_sum += OUTCOMES[op_move][my_move];
});
console.log(`Part 1: ${score_sum}`);

// Part 2

// Maps an opponent's move and the outcome to the move that I should play:
//    [rock, lose] -> scissors
//    [scissors, tie] -> scissors
//    [rock, win] -> paper
//    ...
const REVERSE_MOVE_MAP = [
  [2, 0, 1],
  [0, 1, 2],
  [1, 2, 0],
];

score_sum = 0;
input.split("\n").forEach((line) => {
  let chars = line.split(" ");
  let op_move = MOVE_MAP[chars[0]];
  let outcome = MOVE_MAP[chars[1]];
  let my_move = REVERSE_MOVE_MAP[op_move][outcome];
  score_sum += MOVE_VALS[my_move];
  score_sum += OUTCOMES[op_move][my_move];
});
console.log(`Part 2: ${score_sum}`);
