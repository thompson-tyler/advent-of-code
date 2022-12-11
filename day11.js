const INPUT_FILE = "input.txt";

let lcm = 1;

class Monkey {
  constructor(items, op, test, trueTo, falseTo) {
    this.items = items;
    this.op = op;
    this.test = test;
    this.trueTo = trueTo;
    this.falseTo = falseTo;
    this.inspected = 0;
  }

  doRoundPart1(monkeys) {
    while (this.items.length > 0) {
      let item = this.items.shift();
      item = this.op(item);
      item = Math.floor(item / 3);
      if (item % this.test == 0) {
        monkeys[this.trueTo].items.push(item);
      } else {
        monkeys[this.falseTo].items.push(item);
      }
      this.inspected++;
    }
  }

  doRoundPart2(monkeys) {
    while (this.items.length > 0) {
      let item = this.items.shift();
      item = this.op(item);
      item %= lcm;
      if (item % this.test == 0) {
        monkeys[this.trueTo].items.push(item);
      } else {
        monkeys[this.falseTo].items.push(item);
      }
      this.inspected++;
    }
  }
}

function buildMonkeys() {
  const f = require("fs").readFileSync(INPUT_FILE, "utf8");

  let monkeys = [];
  let lines = f.split("\n");
  lcm = 1;

  while (lines.length > 0) {
    lines.shift();

    // Parse items
    let items = lines
      .shift()
      .split(":")[1]
      .trim()
      .split(", ")
      .map((x) => parseInt(x));

    // Parse operation
    let op = lines.shift().split("old")[1].trim();
    let num = parseInt(op.slice(1));
    if (op[0] == "+") {
      op = (x) => x + new Number(num);
    } else if (op[0] == "*") {
      if (isNaN(num)) {
        op = (x) => x * x;
      } else {
        op = (x) => x * new Number(num);
      }
    }

    // Parse test
    let test = parseInt(lines.shift().split("by")[1].trim());
    lcm *= test;

    // Parse trueTo
    let trueTo = parseInt(lines.shift().split("monkey")[1].trim());

    // Parse falseTo
    let falseTo = parseInt(lines.shift().split("monkey")[1].trim());

    // Create monkey
    monkeys.push(new Monkey(items, op, test, trueTo, falseTo));

    // Skip empty line
    lines.shift();
  }
  return monkeys;
}

// Part 1
let monkeys = buildMonkeys();

for (let i = 0; i < 20; i++) {
  monkeys.forEach((monkey) => monkey.doRoundPart1(monkeys));
}

let max1 = -1;
let max2 = -1;

for (let monkey of monkeys) {
  if (monkey.inspected > max1) {
    max2 = max1;
    max1 = monkey.inspected;
  } else if (monkey.inspected > max2) {
    max2 = monkey.inspected;
  }
}

console.log(`Part 1: ${max1 * max2}`);

// Part 2
monkeys = buildMonkeys();

for (let i = 0; i < 10000; i++) {
  monkeys.forEach((monkey) => monkey.doRoundPart2(monkeys));
}

max1 = -1;
max2 = -1;

for (let monkey of monkeys) {
  if (monkey.inspected > max1) {
    max2 = max1;
    max1 = monkey.inspected;
  } else if (monkey.inspected > max2) {
    max2 = monkey.inspected;
  }
}

console.log(`Part 2: ${max1 * max2}`);
