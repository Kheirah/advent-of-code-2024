const fs = require("fs");

const input = fs.readFileSync("04_input.txt", "utf8");
const array = input.split("\n");

let countX_MAS = 0;

for (let i = 1; i < array.length - 1; i++) {
  for (let j = 1; j < array[i].length - 1; j++) {
    const current = array[i][j];

    if (current === "A") {
      const upperLeft = array[i - 1][j - 1];
      const lowerRight = array[i + 1][j + 1];
      const hasXMASUpperLeftLowerRight = hasXMAS(upperLeft, lowerRight);

      const lowerLeft = array[i + 1][j - 1];
      const upperRight = array[i - 1][j + 1];
      const hasXMASLowerLeftUpperRight = hasXMAS(lowerLeft, upperRight);

      if (hasXMASUpperLeftLowerRight && hasXMASLowerLeftUpperRight) {
        countX_MAS++;
      }
    }
  }
}

function hasXMAS(a, b) {
  let xmas = ["M", "S"];
  if (xmas.includes(a)) {
    xmas = xmas.filter((x) => x !== a);
  }
  if (xmas.includes(b)) {
    xmas = xmas.filter((x) => x !== b);
  }
  return xmas.length === 0;
}

console.log(countX_MAS);

/* 1998 is correct */
