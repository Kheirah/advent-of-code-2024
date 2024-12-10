const fs = require("fs");

const input = fs.readFileSync("10_input.txt", "utf8");
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

function getTrailheadScore(row, column) {
  const current = Number(array[row][column]);

  if (current === 9) {
    return 1;
  }

  const nextHeight = current + 1;
  let paths = 0;

  if (array[row - 1]?.[column] == nextHeight) {
    paths += getTrailheadScore(row - 1, column);
  }
  if (array[row]?.[column + 1] == nextHeight) {
    paths += getTrailheadScore(row, column + 1);
  }
  if (array[row + 1]?.[column] == nextHeight) {
    paths += getTrailheadScore(row + 1, column);
  }
  if (array[row]?.[column - 1] == nextHeight) {
    paths += getTrailheadScore(row, column - 1);
  }

  return paths;
}

const trailheadScores = matches.map(({ row, column }) =>
  getTrailheadScore(row, column)
);

console.log(trailheadScores.reduce((acc, curr) => acc + curr, 0));

/* 1694 is correct */
