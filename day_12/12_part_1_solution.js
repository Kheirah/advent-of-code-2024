const fs = require("fs");

const input = fs.readFileSync("12_input.txt", "utf8");
const array = input.split("\n");

const visited = {};
const regions = {};

for (let i = 0; i < array.length; i++) {
  for (let j = 0; j < array[i].length; j++) {
    const plot = array[i][j];
    const didExplore = exploreRegion(i, j, plot);
    if (didExplore) {
      regions[`${plot}-${i}-${j}`] = regions[plot];
      delete regions[plot];
    }
  }
}

function exploreRegion(i, j, plot) {
  if (visited[`${i}-${j}`]) return false;

  if (array[i][j] !== plot) return false;
  visited[`${i}-${j}`] = true;

  if (regions[`${plot}`] === undefined)
    regions[plot] = { area: 0, perimeter: 0 };

  const outerPerimeter = calculatePerimeter(i, j, plot);

  regions[plot].area += 1;
  regions[plot].perimeter += outerPerimeter;

  if (i - 1 >= 0) {
    exploreRegion(i - 1, j, plot);
  }
  if (j + 1 < array[i].length) {
    exploreRegion(i, j + 1, plot);
  }
  if (i + 1 < array.length) {
    exploreRegion(i + 1, j, plot);
  }
  if (j - 1 >= 0) {
    exploreRegion(i, j - 1, plot);
  }

  return true;
}

function calculatePerimeter(i, j, plot) {
  const up = array[i - 1]?.[j] === plot ? 1 : 0;
  const right = array[i]?.[j + 1] === plot ? 1 : 0;
  const down = array[i + 1]?.[j] === plot ? 1 : 0;
  const left = array[i]?.[j - 1] === plot ? 1 : 0;
  return 4 - (up + right + down + left);
}

console.log(
  Object.values(regions).reduce(
    (acc, curr) => acc + curr.area * curr.perimeter,
    0
  )
);

/* 1449902 is correct */
