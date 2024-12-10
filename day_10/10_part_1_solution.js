const fs = require("fs");

const input = fs.readFileSync("10_example.txt", "utf8");
const array = input.split("\n");

const matches = array
  .map((line, index) =>
    Array.from(line.matchAll(/0/g), (match) => ({
      value: match[0],
      row: index,
      column: match.index,
    }))
  )
  .flat();

function getTrailheadScore(row, column, visited = new Set()) {
  const current = Number(array[row][column]);
  const position = `${row},${column}`;

  // Reaching any given 9 once is enough
  if (visited.has(position)) return 0;
  visited.add(position);

  if (current === 9) {
    return 1;
  }

  const nextHeight = current + 1;
  let paths = 0;

  if (array[row - 1]?.[column] == nextHeight) {
    paths += getTrailheadScore(row - 1, column, visited);
  }
  if (array[row]?.[column + 1] == nextHeight) {
    paths += getTrailheadScore(row, column + 1, visited);
  }
  if (array[row + 1]?.[column] == nextHeight) {
    paths += getTrailheadScore(row + 1, column, visited);
  }
  if (array[row]?.[column - 1] == nextHeight) {
    paths += getTrailheadScore(row, column - 1, visited);
  }

  return paths;
}

const trailheadScores = matches.map(({ row, column }) =>
  getTrailheadScore(row, column)
);

console.log(trailheadScores.reduce((acc, curr) => acc + curr, 0));

/* 782 is correct */
