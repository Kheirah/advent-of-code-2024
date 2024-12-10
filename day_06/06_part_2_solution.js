const fs = require("fs");

const input = fs.readFileSync("06_input.txt", "utf8");
const array = input.split("\n");

let guardStartsAt = [];

array.find((line, row) => {
  const col = line.indexOf("^");
  if (col !== -1) {
    guardStartsAt = [row, col];
  }
});

// 0 = up, 1 = right, 2 = down, 3 = left
const moves = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

function simulate(simulationMap, startX, startY, startFacing) {
  const visitedPositions = new Set(); // positions only
  const visitedStates = new Set(); // positions & facing direction
  let guardCurrentX = startX;
  let guardCurrentY = startY;
  let facing = startFacing;

  while (
    guardCurrentX < simulationMap.length &&
    guardCurrentX >= 0 &&
    guardCurrentY < simulationMap[guardCurrentX].length &&
    guardCurrentY >= 0
  ) {
    const position = `${guardCurrentX},${guardCurrentY}`;
    visitedPositions.add(position);

    const stateKey = `${guardCurrentX},${guardCurrentY},${facing}`;
    // Seen position & facing direction => loop
    if (visitedStates.has(stateKey)) {
      return {
        visitedCount: visitedPositions.size,
        loopDetected: true,
      };
    }
    visitedStates.add(stateKey);

    const [x, y] = moves[facing];
    if (simulationMap[guardCurrentX + x]?.[guardCurrentY + y] === "#") {
      facing = (facing + 1) % 4;
    } else {
      guardCurrentX += x;
      guardCurrentY += y;
    }
  }

  return {
    visitedCount: visitedPositions.size,
    visitedPositions,
    loopDetected: false,
  };
}

// Replace a character in a string
function replaceChar(str, index, char) {
  return str.slice(0, index) + char + str.slice(index + 1);
}

const result = simulate(array.slice(), guardStartsAt[0], guardStartsAt[1], 0);
// Only need to check positions the guard has visited
const possibleObstructions = [...result.visitedPositions].map((pos) =>
  pos.split(",").map(Number)
);

let loopObstructionsCount = 0;
while (possibleObstructions.length > 0) {
  const [r, c] = possibleObstructions.shift();
  // Skip the guard start position since it’s not allowed to be an obstruction
  if (r === guardStartsAt[0] && c === guardStartsAt[1]) continue;

  if (array[r][c] === ".") {
    const modifiedMap = array.slice();
    modifiedMap[r] = replaceChar(modifiedMap[r], c, "#");

    const result = simulate(modifiedMap, guardStartsAt[0], guardStartsAt[1], 0);

    if (result.loopDetected) {
      loopObstructionsCount++;
    }
  }
}

console.log(loopObstructionsCount);

/* 1650 is too low */
/* 1729 is correct */
