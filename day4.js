const INPUT_FILE = "input.txt";
const fs = require("fs");
const input = fs.readFileSync(INPUT_FILE, "utf8");

// Part 1

const pairs = input
  .split("\n")
  .map((line) => line.split(","))
  .map((pair) => pair.map((str) => str.split("-").map((n) => parseInt(n))));

let count = 0;
pairs.forEach(([[a1, b1], [a2, b2]]) => {
  if ((a1 <= a2 && b1 >= b2) || (a1 >= a2 && b1 <= b2)) count++;
});

console.log(`Part 1: ${count}`);

// Part 2

count = 0;
pairs.forEach(([[a1, b1], [a2, b2]]) => {
  if (
    (a1 <= a2 && b1 >= a2) ||
    (a1 >= a2 && b1 <= b2) ||
    (a1 <= b2 && b1 >= b2) ||
    (a1 >= a2 && b1 <= b2)
  )
    count++;
});

console.log(`Part 2: ${count}`);
