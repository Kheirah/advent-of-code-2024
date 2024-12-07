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

const moves = {
  0: [-1, 0],
  1: [0, 1],
  2: [1, 0],
  3: [0, -1],
};

let visited = new Set();
let guardCurrentX = guardStartsAt[0];
let guardCurrentY = guardStartsAt[1];
let facing = 0;

while (
  guardCurrentX < array.length &&
  guardCurrentX > 0 &&
  guardCurrentY < array[guardCurrentX].length &&
  guardCurrentY > 0
) {
  const position = `${guardCurrentX},${guardCurrentY}`;
  visited.add(position);

  const [x, y] = moves[facing];
  if (array[guardCurrentX + x]?.[guardCurrentY + y] === "#") {
    facing = (facing + 1) % 4;
  } else {
    guardCurrentX += x;
    guardCurrentY += y;
  }
}

console.log(visited.size);

/* 4977 is correct */
