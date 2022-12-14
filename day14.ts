import * as fs from "fs";

type RockSet = Set<string>;
const INPUT_FILE = "input.txt";
const SAND_START = 500;
let y_limit = 0;

function set_string(x: number, y: number) {
  return `${x},${y}`;
}

function build_rocks(): RockSet {
  const input = fs.readFileSync(INPUT_FILE, "utf8");
  const rocks = new Set<string>();
  y_limit = 0;
  for (const line of input.split("\n")) {
    const coords = line
      .split("->")
      .map((s) => s.split(",").map((s) => parseInt(s)));

    let last = coords[0];
    for (let i = 1; i < coords.length; i++) {
      const [x1, y1] = last;
      const [x2, y2] = coords[i];
      const dx = x2 - x1;
      const dy = y2 - y1;
      const steps = Math.max(Math.abs(dx), Math.abs(dy));
      for (let j = 0; j <= steps; j++) {
        const x = x1 + Math.round((dx * j) / steps);
        const y = y1 + Math.round((dy * j) / steps);
        rocks.add(set_string(x, y));
        if (y > y_limit) y_limit = y;
      }
      last = coords[i];
    }
  }
  return rocks;
}

// Returns true if the sand came to rest
// Returns false if the sand fell off the bottom
function drop_sand(rocks: RockSet, floor = false): boolean {
  let sand = [SAND_START, 0];
  while (sand[1] < y_limit || floor) {
    const [x, y] = sand;

    if (floor && y == y_limit + 1) {
      rocks.add(set_string(x, y));
      return true;
    }

    if (rocks.has(set_string(x, y + 1))) {
      if (!rocks.has(set_string(x - 1, y + 1))) {
        sand[0]--;
      } else if (!rocks.has(set_string(x + 1, y + 1))) {
        sand[0]++;
      } else {
        rocks.add(set_string(x, y));
        return true;
      }
    } else {
      sand[1]++;
    }
  }
  return false;
}

function part1() {
  const rocks = build_rocks();
  let sand_count = 0;
  while (drop_sand(rocks)) {
    sand_count++;
  }
  console.log("Part 1: " + sand_count);
}

function part2() {
  const rocks = build_rocks();
  let sand_count = 0;
  while (!rocks.has(set_string(SAND_START, 0)) && drop_sand(rocks, true)) {
    sand_count++;
  }
  console.log("Part 2: " + sand_count);
}

part2();
