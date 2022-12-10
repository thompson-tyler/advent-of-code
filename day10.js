const input_file = require("fs").readFileSync("input.txt", "utf8");

let x = 1;
let cycle = 0;
let sum = 0;
let commands = input_file.split("\n");
let screen_output = [];

function increment_signal() {
  let screen_pos = cycle % 40;
  if (Math.abs(x - screen_pos) < 2) {
    screen_output.push("#");
  } else {
    screen_output.push(".");
  }
  cycle++;
  if ((cycle - 20) % 40 == 0) {
    sum += x * cycle;
    console.log(x, cycle, x * cycle);
  }
}

for (let command of commands) {
  if (command == "noop") {
    increment_signal();
    continue;
  }
  let cmd = command.split(" ");
  increment_signal();
  increment_signal();
  x += parseInt(cmd[1]);
}

console.log("Part 1: " + sum);

console.log("Part 2:");
for (let i = 0; i < screen_output.length; i += 40) {
  console.log(screen_output.slice(i, i + 40).join(""));
}
