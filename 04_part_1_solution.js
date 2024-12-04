const fs = require("fs");

const input = fs.readFileSync("04_input.txt", "utf8");
const array = input.split("\n");

let countXMAS = 0;

// Horizontal iteration
for (const line of array) {
  countXMAS += findXMAS(line);
}

// Vertical iteration
const numColumns = array[0].length;
for (let col = 0; col < numColumns; col++) {
  let columnString = "";
  for (let row = 0; row < array.length; row++) {
    columnString += array[row][col];
  }
  countXMAS += findXMAS(columnString);
}

// Main diagonal (upper right triangle)
for (let startCol = 0; startCol < numColumns - 3; startCol++) {
  let diagonalString = "";
  let row = 0;
  let col = startCol;

  while (row < array.length && col < numColumns) {
    diagonalString += array[row][col];
    row++;
    col++;
  }
  countXMAS += findXMAS(diagonalString);
}

// Main diagonal (lower left triangle)
for (let startRow = 1; startRow < array.length - 3; startRow++) {
  let diagonalString = "";
  let row = startRow;
  let col = 0;

  while (row < array.length && col < numColumns) {
    diagonalString += array[row][col];
    row++;
    col++;
  }
  countXMAS += findXMAS(diagonalString);
}

// Anti-diagonal (upper left triangle)
for (let startCol = array.length - 1; startCol > 2; startCol--) {
  let antiDiagonalString = "";
  let row = 0;
  let col = startCol;

  while (row < array.length && col >= 0) {
    antiDiagonalString += array[row][col];
    row++;
    col--;
  }
  countXMAS += findXMAS(antiDiagonalString);
}

// Anti-diagonal (lower right triangle)
for (let startRow = 1; startRow < array.length - 3; startRow++) {
  let antiDiagonalString = "";
  let row = startRow;
  let col = numColumns - 1;

  while (row < array.length && col >= 0) {
    antiDiagonalString += array[row][col];
    row++;
    col--;
  }
  countXMAS += findXMAS(antiDiagonalString);
}

// Finds XMAS in both directions
function findXMAS(string) {
  const xmas = string.match(/XMAS/g);
  const count = xmas ? xmas.length : 0;
  const reversedString = string.split("").reverse().join("");
  const xmasReversed = reversedString.match(/XMAS/g);
  return count + (xmasReversed ? xmasReversed.length : 0);
}

console.log(countXMAS);

/* 2569 is correct */
