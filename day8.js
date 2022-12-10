file = require("fs").readFileSync("input.txt", "utf8");

trees = file.split("\n").map((line) => line.split(""));
trees = trees.map((line) =>
  line.map((char) => {
    return {
      height: parseInt(char),
      visible: false,
    };
  })
);

// Part 1

let count = 0;
let tallest = -1;

function update_if_taller(tree) {
  if (tree.height > tallest) {
    tallest = tree.height;
    if (!tree.visible) {
      count++;
      tree.visible = true;
    }
  }
}

// count top edge
for (let c = 0; c < trees[0].length; c++) {
  tallest = -1;
  for (let r = 0; r < trees.length; r++) {
    update_if_taller(trees[r][c]);
  }
}

// count bottom edge
for (let c = 0; c < trees[0].length; c++) {
  tallest = -1;
  for (let r = trees.length - 1; r >= 0; r--) {
    update_if_taller(trees[r][c]);
  }
}

// Count left edge
for (let r = 0; r < trees.length; r++) {
  tallest = -1;
  for (let c = 0; c < trees[0].length; c++) {
    update_if_taller(trees[r][c]);
  }
}

// Count right edge
for (let r = 0; r < trees.length; r++) {
  tallest = -1;
  for (let c = trees[0].length - 1; c >= 0; c--) {
    update_if_taller(trees[r][c]);
  }
}

console.log("Part 1: " + count);

// Part 2

function getScore(trees, r, c) {
  let score = 1;
  const height = trees[r][c].height;

  // Check top
  let dist;
  for (dist = 1; r - dist > 0 && trees[r - dist][c].height < height; dist++);
  score *= dist;

  // Check bottom
  for (
    dist = 1;
    r + dist < trees.length - 1 && trees[r + dist][c].height < height;
    dist++
  );
  score *= dist;

  // Check left
  for (dist = 1; c - dist > 0 && trees[r][c - dist].height < height; dist++);
  score *= dist;

  // Check right
  for (
    dist = 1;
    c + dist < trees[0].length - 1 && trees[r][c + dist].height < height;
    dist++
  );
  score *= dist;

  return score;
}

let best_score = 0;
for (let r = 1; r < trees.length - 1; r++) {
  for (let c = 1; c < trees[0].length - 1; c++) {
    const score = getScore(trees, r, c);
    best_score = Math.max(best_score, score);
  }
}

console.log("Part 2: " + best_score);
