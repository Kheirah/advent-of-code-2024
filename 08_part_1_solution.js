const fs = require("fs");

const input = fs.readFileSync("08_input.txt", "utf8");
const array = input.split("\n");

const matches = array
  .map((line, index) =>
    Array.from(line.matchAll(/\w/g), (match) => ({
      value: match[0],
      column: match.index,
      row: index,
      all: match,
    }))
  )
  .flat();

const antennas = {};

for (const { value, row, column } of matches) {
  if (antennas[value] === undefined) {
    antennas[value] = [];
  }
  antennas[value].push([row, column]);
}

const antiNodes = new Set();

for (const [_, value] of Object.entries(antennas)) {
  for (let i = 0; i < value.length; i++) {
    for (let j = i + 1; j < value.length; j++) {
      const [col1, row1] = value[i];
      const [col2, row2] = value[j];
      const distanceColumn = col1 - col2;
      const distanceRow = row1 - row2;
      const antiNode1 = [col1 + distanceColumn, row1 + distanceRow];
      const antiNode2 = [col2 + distanceColumn * -1, row2 + distanceRow * -1];
      if (isWithinBounds(antiNode1)) {
        antiNodes.add(antiNode1.toString());
      }
      if (isWithinBounds(antiNode2)) {
        antiNodes.add(antiNode2.toString());
      }
    }
  }
}

function isWithinBounds([col, row]) {
  return col >= 0 && col < array[0].length && row >= 0 && row < array.length;
}

console.log(antiNodes.size);

/* 216 is too low */
/* 278 is correct */
