type AOC_Element = number | AOC_Element[];

enum Order {
  CORRECT,
  INCORRECT,
  CONTINUE,
}

const INPUT_FILE = "input.txt";
import * as fs from "fs";

function compare(left: AOC_Element, right: AOC_Element): Order {
  // Same type comparison
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return Order.CORRECT;
    if (left > right) return Order.INCORRECT;
    return Order.CONTINUE;
  }
  if (typeof left === "object" && typeof right === "object") {
    for (let i = 0; i < left.length; i++) {
      // right ran out of elements
      if (i >= right.length) return Order.INCORRECT;
      const result = compare(left[i], right[i]);
      if (result !== Order.CONTINUE) return result;
    }
    if (left.length == right.length) return Order.CONTINUE;
    return Order.CORRECT;
  }
  // Type coercion
  else if (typeof left === "number" && typeof right === "object") {
    return compare([left], right);
  } else if (typeof left === "object" && typeof right === "number") {
    return compare(left, [right]);
  }
  throw new Error("Invalid comparison");
}

function part1() {
  const input = fs.readFileSync(INPUT_FILE, "utf8");

  const lines = input.split("\n");
  const pairs: AOC_Element[][] = [];
  for (let i = 0; i < lines.length; i += 3) {
    const left: AOC_Element = eval(lines[i]);
    const right: AOC_Element = eval(lines[i + 1]);
    pairs.push([left, right]);
  }

  let sum = 0;
  for (let i = 0; i < pairs.length; i++) {
    const [left, right] = pairs[i];
    if (compare(left, right) !== Order.INCORRECT) sum += i + 1;
  }
  console.log("Part 1: " + sum);
}

const DIVIDER_1 = [[2]];
const DIVIDER_2 = [[6]];

function part2() {
  const input = fs.readFileSync(INPUT_FILE, "utf8");

  const lines = input.split("\n");
  const packets: AOC_Element[][] = [];
  for (let line of lines) {
    if (line.length === 0) continue;
    packets.push(eval(line));
  }
  packets.push(DIVIDER_1);
  packets.push(DIVIDER_2);

  packets.sort((a, b) => (compare(a, b) === Order.INCORRECT ? 1 : -1));
  const i_1 = packets.indexOf(DIVIDER_1) + 1;
  const i_2 = packets.indexOf(DIVIDER_2) + 1;
  console.log("Part 2: " + i_1 * i_2);
}

part1();
part2();
