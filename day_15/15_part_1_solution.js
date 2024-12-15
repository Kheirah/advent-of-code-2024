const fs = require("fs");

const input = fs.readFileSync("15_input.txt", "utf8");
const array = input.split("\n");

const warehouse = [];
const directions = [];

const moveTo = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  v: [1, 0],
};

let separator = false;
for (const line of array) {
  if (line === "") {
    separator = true;
  } else if (!separator) {
    warehouse.push(line.split(""));
  } else {
    directions.push(line);
  }
}

const sequence = directions.join("");

const start = warehouse.reduce((acc, line, row) => {
  if (line.includes("@")) {
    acc.push(row, line.indexOf("@"));
  }
  return acc;
}, []);

let current = start;
for (let i = 0; i < sequence.length; i++) {
  const direction = moveTo[sequence[i]];
  const canMove = move(...current, direction);
  if (canMove) {
    warehouse[current[0]][current[1]] = ".";
    current = [current[0] + direction[0], current[1] + direction[1]];
  }
}

let sum = 0;
for (let i = 0; i < warehouse.length; i++) {
  for (let j = 0; j < warehouse[i].length; j++) {
    sum += warehouse[i][j] === "O" ? i * 100 + j : 0;
  }
}

function move(i, j, direction) {
  if (["#", "."].includes(warehouse[i][j])) {
    return warehouse[i][j] === ".";
  }

  const canMove = move(i + direction[0], j + direction[1], direction);

  if (canMove) {
    warehouse[i + direction[0]][j + direction[1]] = warehouse[i][j];
    warehouse[i][j] = ".";
  }

  return canMove;
}

// console.log(route.map((line) => line.join("")).join("\n"));
console.log(sum);

/* 1492518 is correct */
