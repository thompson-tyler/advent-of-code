const INPUT_FILE = "input.txt";
const START = "S";
const END = "E";

function to_ascii(c) {
  return c.charCodeAt(0) - "a".charCodeAt(0);
}

function part1() {
  const f = require("fs").readFileSync(INPUT_FILE, "utf8");

  let map = [];
  let start = [-1, -1];
  let end = [-1, -1];

  // Build the map from the input file
  f.split("\n").forEach((line, row) => {
    let row_vals = [];
    line.split("").forEach((c, col) => {
      if (c == START) {
        start = [row, col];
        row_vals.push(to_ascii("a") - 1);
      } else if (c == END) {
        end = [row, col];
        row_vals.push(to_ascii("z") + 1);
      } else {
        row_vals.push(to_ascii(c));
      }
    });
    map.push(row_vals);
  });

  // Find the shortest path from the start to the end
  let visited = Array(map.length);
  for (let i = 0; i < map.length; i++) {
    visited[i] = Array(map[i].length).fill(false);
  }
  let queue = [[start, 0]];
  while (queue.length > 0) {
    const [pos, len] = queue.shift();
    const [row, col] = pos;
    if (visited[row][col]) continue;
    visited[row][col] = true;

    // Found the end
    if (pos[0] == end[0] && pos[1] == end[1]) {
      console.log("Part 1: " + len);
      return;
    }

    // Try upwards
    if (row - 1 >= 0 && map[row - 1][col] - map[row][col] <= 1)
      queue.push([[row - 1, col], len + 1]);

    // Try downwards
    if (row + 1 < map.length && map[row + 1][col] - map[row][col] <= 1)
      queue.push([[row + 1, col], len + 1]);

    // Try left
    if (col - 1 >= 0 && map[row][col - 1] - map[row][col] <= 1)
      queue.push([[row, col - 1], len + 1]);

    // Try right
    if (col + 1 < map[row].length && map[row][col + 1] - map[row][col] <= 1)
      queue.push([[row, col + 1], len + 1]);
  }
}

function part2() {
  const f = require("fs").readFileSync(INPUT_FILE, "utf8");

  let map = [];
  let starts = [];
  let end = [-1, -1];

  // Build the map from the input file
  f.split("\n").forEach((line, row) => {
    let row_vals = [];
    line.split("").forEach((c, col) => {
      if (c == START || c == "a") starts.push([row, col]);

      if (c == START) {
        row_vals.push(to_ascii("a") - 1);
      } else if (c == END) {
        end = [row, col];
        row_vals.push(to_ascii("z") + 1);
      } else {
        row_vals.push(to_ascii(c));
      }
    });
    map.push(row_vals);
  });

  // Find the shortest path from a start to the end
  let best_len = -1;

  for (let start of starts) {
    let visited = Array(map.length);
    for (let i = 0; i < map.length; i++) {
      visited[i] = Array(map[i].length).fill(false);
    }
    let queue = [[start, 0]];

    let final_len = Infinity;
    while (queue.length > 0) {
      const [pos, len] = queue.shift();
      const [row, col] = pos;
      if (visited[row][col]) continue;
      visited[row][col] = true;

      // Found the end
      if (pos[0] == end[0] && pos[1] == end[1]) {
        final_len = len;
        break;
      }

      // Try upwards
      if (row - 1 >= 0 && map[row - 1][col] - map[row][col] <= 1)
        queue.push([[row - 1, col], len + 1]);

      // Try downwards
      if (row + 1 < map.length && map[row + 1][col] - map[row][col] <= 1)
        queue.push([[row + 1, col], len + 1]);

      // Try left
      if (col - 1 >= 0 && map[row][col - 1] - map[row][col] <= 1)
        queue.push([[row, col - 1], len + 1]);

      // Try right
      if (col + 1 < map[row].length && map[row][col + 1] - map[row][col] <= 1)
        queue.push([[row, col + 1], len + 1]);
    }

    if (best_len == -1 || final_len < best_len) {
      best_len = final_len;
    }
  }

  console.log("Part 2: " + best_len);
}

part1();
part2();
