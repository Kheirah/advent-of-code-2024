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

const scaledUpWarehouse = Array.from({ length: warehouse.length }, () =>
  Array.from({ length: warehouse[0].length * 2 }, () => ".")
);

for (let i = 0; i < warehouse.length; i++) {
  for (let j = 0; j < warehouse[i].length; j++) {
    const currentPos = warehouse[i][j];
    if (currentPos === "#") {
      scaledUpWarehouse[i][j * 2] = "#";
      if (scaledUpWarehouse[i][j * 2 + 1])
        scaledUpWarehouse[i][j * 2 + 1] = "#";
    } else if (currentPos === "O") {
      scaledUpWarehouse[i][j * 2] = "[";
      scaledUpWarehouse[i][j * 2 + 1] = "]";
    } else if (currentPos === "@") {
      scaledUpWarehouse[i][j * 2] = "@";
    }
  }
}

const sequence = directions.join("");

const start = scaledUpWarehouse.reduce((acc, line, row) => {
  if (line.includes("@")) {
    acc.push(row, line.indexOf("@"));
  }
  return acc;
}, []);

async function moveIt() {
  let current = start;
  for (let i = 0; i < sequence.length; i++) {
    const direction = moveTo[sequence[i]];
    const canMove =
      direction[0] !== 0
        ? checkMoveVertically(...current, direction[0])
        : moveHorizontally(...current, direction);
    if (canMove) {
      scaledUpWarehouse[current[0]][current[1]] = ".";
      current = [current[0] + direction[0], current[1] + direction[1]];
    }
    /* console.log(scaledUpWarehouse.map((line) => line.join("")).join("\n"));
    await new Promise((resolve) => setTimeout(resolve, 25)); */
  }
}
moveIt();

let sum = 0;
for (let i = 0; i < scaledUpWarehouse.length; i++) {
  for (let j = 0; j < scaledUpWarehouse[i].length; j++) {
    sum += scaledUpWarehouse[i][j] === "[" ? i * 100 + j : 0;
  }
}

function moveHorizontally(i, j, direction) {
  if ("#.".includes(scaledUpWarehouse[i][j])) {
    return scaledUpWarehouse[i][j] === ".";
  }

  const canMove = moveHorizontally(
    i + direction[0],
    j + direction[1],
    direction
  );

  if (canMove) {
    scaledUpWarehouse[i + direction[0]][j + direction[1]] =
      scaledUpWarehouse[i][j];
    scaledUpWarehouse[i][j] = ".";
  }

  return canMove;
}

function checkMoveVertically(i, j, step) {
  if (canMoveVertically(i, j, step)) {
    return moveVertically(i, j, step);
  }

  return false;
}

function canMoveVertically(i, j, step) {
  const currentLocation = scaledUpWarehouse[i][j];
  if ("#.".includes(currentLocation)) {
    return currentLocation === ".";
  }

  const offset = currentLocation === "[" ? 1 : currentLocation === "]" ? -1 : 0;

  const canMoveOneSide = canMoveVertically(i + step, j, step);
  const canMoveSecondSide =
    offset !== 0 ? canMoveVertically(i + step, j + offset, step) : true;

  return canMoveOneSide && canMoveSecondSide;
}

function moveVertically(i, j, step) {
  const currentLocation = scaledUpWarehouse[i][j];
  if ("#.".includes(currentLocation)) {
    return currentLocation === ".";
  }

  const offset = currentLocation === "[" ? 1 : currentLocation === "]" ? -1 : 0;

  const canMoveOneSide = moveVertically(i + step, j, step);
  const canMoveSecondSide =
    offset !== 0 ? moveVertically(i + step, j + offset, step) : true;

  if (canMoveOneSide && canMoveSecondSide) {
    scaledUpWarehouse[i + step][j] = currentLocation;
    scaledUpWarehouse[i][j] = ".";

    if (offset) {
      scaledUpWarehouse[i + step][j + offset] =
        scaledUpWarehouse[i][j + offset];
      scaledUpWarehouse[i][j + offset] = ".";
    }
  }

  return canMoveOneSide && canMoveSecondSide;
}

// console.log(scaledUpWarehouse.map((line) => line.join("")).join("\n"));
console.log(sum);

/* 1509446 is too low */
/* 1512860 is correct */

/* 
Missing edge case:
##########################
#........................#
#........................#
#........................#
#........................#
#........................#
#................[]@.....#
#.................[].....#
#................[][][]..#
#............[]...[][]...#
#....[][]....[]....[]#...#
#........................#
#........................#
##########################
*/
