import * as fs from "fs";

const INPUT_FILE = "input.txt";

function dist(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

interface Sensor {
  x: number;
  y: number;
  radius: number;
}

function buildSensorsBeacons(): [Sensor[], Set<string>] {
  const input = fs.readFileSync(INPUT_FILE, "utf8");
  const sensors: Sensor[] = [];
  const beacons = new Set<string>();

  for (let line of input.split("\n")) {
    const [sensorInfo, beaconInfo] = line.split(":");
    const x = parseInt(sensorInfo.split("x=")[1]);
    const y = parseInt(sensorInfo.split("y=")[1]);
    const xBeacon = parseInt(beaconInfo.split("x=")[1]);
    const yBeacon = parseInt(beaconInfo.split("y=")[1]);
    const radius = dist(x, y, xBeacon, yBeacon);
    sensors.push({ x, y, radius });
    beacons.add(`${xBeacon},${yBeacon}`);
  }
  return [sensors, beacons];
}

function part1() {
  const [sensors, beacons] = buildSensorsBeacons();
  const ROW_TO_COUNT = 2000000;

  const countedPoints = new Set<string>();
  for (let sensor of sensors) {
    const { x, y, radius } = sensor;

    const distToRow = Math.abs(ROW_TO_COUNT - y);
    if (distToRow > radius) continue;

    const overlap = radius - distToRow;
    for (let i = x - overlap; i <= x + overlap; i++) {
      const point = `${i},${ROW_TO_COUNT}`;
      if (!beacons.has(point)) countedPoints.add(point);
    }
  }
  console.log("Part 1: " + countedPoints.size);
}

function part2() {
  const [sensors, beacons] = buildSensorsBeacons();

  const MAX = 4000000;
  for (let y = 0; y <= MAX; y++) {
    for (let x = 0; x <= MAX; x++) {
      let detected = false;
      for (let sensor of sensors) {
        if (dist(x, y, sensor.x, sensor.y) <= sensor.radius) {
          detected = true;
          const jump = sensor.x - x + (sensor.radius - Math.abs(sensor.y - y));
          x += jump;
          break;
        }
      }
      if (!detected) {
        console.log("Part 2: " + (MAX * x + y));
        return;
      }
    }
  }
  console.log("Part 2: not found");
}

part1();
part2();
