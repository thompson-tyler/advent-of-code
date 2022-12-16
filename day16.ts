import * as fs from "fs";

const INPUT_FILE = "input.txt";

interface Node {
  idx: number;
  flow: number;
  open: boolean;
  distances: Distance[];
}

type Distance = { idx: number; dist: number };

function buildNodes() {
  const input = fs.readFileSync(INPUT_FILE, "utf8");
  const nodes: Node[] = [];
  const adjList: number[][] = [];
  const nodeNames: string[] = [];

  // Build list of nodes names (for enumeration)
  input.split("\n").forEach((line) => nodeNames.push(line.substring(6, 8)));

  // Build list of nodes
  for (const line of input.split("\n")) {
    const idx = nodeNames.indexOf(line.substring(6, 8));
    const flow = parseInt(line.substring(23));
    const neighbors = line
      .split("to valve")[1]
      .split(",")
      .map((s) => s.replace("s", ""))
      .map((s) => s.trim())
      .map((name) => {
        const idx = nodeNames.indexOf(name);
        return idx;
      });
    nodes.push({ idx, flow, open: false, distances: [] });
    adjList.push(neighbors);
  }

  const startIdx = nodeNames.indexOf("AA");

  // Compute distances to all non-zero flow nodes
  for (const src of nodes) {
    if (src.flow === 0 && src.idx != startIdx) continue;
    for (const dst of nodes) {
      if (dst.flow === 0 || src === dst) continue;
      const dist = distance(adjList, src.idx, dst.idx);
      if (dist > 0) {
        src.distances.push({ idx: dst.idx, dist });
      }
    }
  }

  return nodes;
}

// Compute the distance from start to end using BFS
function distance(adjList: number[][], startIdx: number, endIdx: number) {
  const visited = new Set<number>();
  const queue: Distance[] = [{ idx: startIdx, dist: 0 }];
  while (queue.length > 0) {
    const next = queue.shift();
    if (next === undefined) throw new Error("distance: next is undefined");
    if (next.idx === endIdx) return next.dist;
    if (visited.has(next.idx)) continue;
    visited.add(next.idx);
    for (const neighborIdx of adjList[next.idx]) {
      if (!visited.has(neighborIdx)) {
        queue.push({ idx: neighborIdx, dist: next.dist + 1 });
      }
    }
  }
  return -1;
}

function maxPressure(nodes: Node[], startIdx: number, m: number) {
  const cans = nodes[startIdx].distances.filter((d) => !nodes[d.idx].open);
  if (cans.length === 0) return { pressure: 0, path: [] };
  let max = 0;
  let bestPath: number[] = [];
  for (let can of cans) {
    const mNew = m - can.dist - 1;
    if (mNew < 0) continue;
    const canNode = nodes[can.idx];
    canNode.open = true;
    let { pressure, path } = maxPressure(nodes, can.idx, mNew);
    pressure += canNode.flow * mNew;
    canNode.open = false;
    if (pressure > max) {
      max = pressure;
      bestPath = [can.idx, ...path];
    }
  }
  return { pressure: max, path: bestPath };
}

function part1() {
  const TIME = 30;
  const nodes = buildNodes();
  const startIdx = nodes.findIndex(
    (n) => n.flow === 0 && n.distances.length > 0
  );
  const { pressure, path } = maxPressure(nodes, startIdx, TIME);
  console.log("Part 1:", pressure);
}

function part2() {
  const TIME = 26;
  const nodes = buildNodes();
  const startIdx = nodes.findIndex(
    (n) => n.flow === 0 && n.distances.length > 0
  );
  let { pressure, path } = maxPressure(nodes, startIdx, TIME);
  nodes.forEach((n) => {
    n.distances = n.distances.filter((d) => !path.includes(d.idx));
  });
  let { pressure: pressure2, path: path2 } = maxPressure(nodes, startIdx, TIME);
  pressure += pressure2;
  console.log("Part 2:", pressure);
}

part1();
part2();
