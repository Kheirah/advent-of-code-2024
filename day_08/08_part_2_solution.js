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
    antiNodes.add(value[i].toString());
    for (let j = i + 1; j < value.length; j++) {
      generateAntiNodes(value[i], value[j]);
    }
  }
}

function generateAntiNodes([col1, row1], [col2, row2]) {
  const distanceColumn = col1 - col2;
  const distanceRow = row1 - row2;
  let antiNode1 = [col1 + distanceColumn, row1 + distanceRow];
  let antiNode2 = [col2 + distanceColumn * -1, row2 + distanceRow * -1];

  while (isWithinBounds(antiNode1)) {
    antiNodes.add(antiNode1.toString());
    antiNode1 = [antiNode1[0] + distanceColumn, antiNode1[1] + distanceRow];
  }

  while (isWithinBounds(antiNode2)) {
    antiNodes.add(antiNode2.toString());
    antiNode2 = [
      antiNode2[0] + distanceColumn * -1,
      antiNode2[1] + distanceRow * -1,
    ];
  }
}

function isWithinBounds([col, row]) {
  return col >= 0 && col < array[0].length && row >= 0 && row < array.length;
}

console.log(antiNodes.size);

/* 1067 is correct */
