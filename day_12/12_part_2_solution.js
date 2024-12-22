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
// exploreRegion(0, 6, "C");
function exploreRegion(i, j, plot) {
  if (visited[`${i}-${j}`]) return false;

  if (array[i][j] !== plot) return false;
  visited[`${i}-${j}`] = true;

  if (regions[`${plot}`] === undefined)
    regions[plot] = { area: 0, plots: [], sides: 0 };

  const borders = calculatePerimeter(i, j, plot);

  regions[plot].area += 1;
  regions[plot].plots.push({ pos: [i, j], borders });

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
  const up = array[i - 1]?.[j] === plot ? 0 : 1;
  const right = array[i]?.[j + 1] === plot ? 0 : 1;
  const down = array[i + 1]?.[j] === plot ? 0 : 1;
  const left = array[i]?.[j - 1] === plot ? 0 : 1;
  return [up, right, down, left];
}

for (const region of Object.values(regions)) {
  const height = region.plots.reduce(
    (acc, curr) => Math.max(acc, curr.pos[0]),
    0
  );

  for (let i = 0; i <= height; i++) {
    const sortedLines = region.plots
      .filter(({ pos: [x] }) => x === i)
      .sort(({ pos: posA }, { pos: posB }) => posA[1] - posB[1]);

    const sortedPlots = sortedLines.length === 1 ? [sortedLines.slice()] : [];
    let lastInterrupt = 0;
    for (let k = 1; k < sortedLines.length; k++) {
      if (sortedLines[k].pos[1] - sortedLines[k - 1].pos[1] > 1) {
        sortedPlots.push(sortedLines.slice(lastInterrupt, k));
        lastInterrupt = k;
      }
      if (k === sortedLines.length - 1) {
        sortedPlots.push(sortedLines.slice(lastInterrupt));
      }
    }

    for (const plots of sortedPlots) {
      if (plots.length === 0) continue;
      if (plots.length === 1) {
        region.sides += plots[0].borders[0] + plots[0].borders[2];
        continue;
      }

      let prevUpper = plots[0].borders[0];
      let prevLower = plots[0].borders[2];

      for (let j = 1; j < plots.length; j++) {
        const [upper, _, lower] = plots[j].borders;
        if (j === plots.length - 1) {
          region.sides += upper + lower;
        }
        if (prevUpper === 1 && upper === 0) {
          region.sides += 1;
        }
        if (prevLower === 1 && lower === 0) {
          region.sides += 1;
        }
        prevUpper = upper;
        prevLower = lower;
      }
    }
  }

  const width = region.plots.reduce(
    (acc, curr) => Math.max(acc, curr.pos[1]),
    0
  );

  for (let i = 0; i <= width; i++) {
    const sortedLines = region.plots
      .filter(({ pos: [_, y] }) => y === i)
      .sort(({ pos: posA }, { pos: posB }) => posA[0] - posB[0]);

    const sortedPlots = sortedLines.length === 1 ? [sortedLines.slice()] : [];
    let lastInterrupt = 0;
    for (let k = 1; k < sortedLines.length; k++) {
      if (sortedLines[k].pos[0] - sortedLines[k - 1].pos[0] > 1) {
        sortedPlots.push(sortedLines.slice(lastInterrupt, k));
        lastInterrupt = k;
      }
      if (k === sortedLines.length - 1) {
        sortedPlots.push(sortedLines.slice(lastInterrupt));
      }
    }

    for (const plots of sortedPlots) {
      if (plots.length === 0) continue;
      if (plots.length === 1) {
        region.sides += plots[0].borders[1] + plots[0].borders[3];
        continue;
      }
      let prevLeft = plots[0].borders[1];
      let prevRight = plots[0].borders[3];

      for (let j = 1; j < plots.length; j++) {
        const [_, left, __, right] = plots[j].borders;
        if (j === plots.length - 1) {
          region.sides += left + right;
        }
        if (prevLeft === 1 && left === 0) {
          region.sides += 1;
        }
        if (prevRight === 1 && right === 0) {
          region.sides += 1;
        }
        prevLeft = left;
        prevRight = right;
      }
    }
  }
}

// console.dir(regions, { depth: null });
console.log(
  Object.values(regions).reduce((acc, curr) => acc + curr.area * curr.sides, 0)
);

/* 865063 is too low */
/* 892036 is too low */
/* 908042 is correct */

/* 
XXXX...CFF
XXXX...CCF
..XXX..FFF
..X....FFF
.......CFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE
*/

/* 
0.....CC..
1.....CCC.
2....CC...
3..CCC....
4...C.....
5...CC....
6....C....
M.........
MIIISIJEEE
MMMISSJEEE
*/
