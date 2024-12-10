const fs = require("fs");

const input = fs.readFileSync("02_input.txt", "utf8");
const array = input.split("\n");

const unusualData = array
  .map((line) => line.split(" "))
  .map((line) => line.map(Number));

let safeReports = 0;

for (let i = 0; i < unusualData.length; i++) {
  const report = unusualData[i];
  let isSafe = true;
  let isIncreasing = undefined;

  for (let j = 0; j < report.length - 1; j++) {
    const difference = report[j] - report[j + 1];
    if (
      ![1, 2, 3].includes(Math.abs(difference)) ||
      didChangeDirection(isIncreasing, difference < 0)
    ) {
      isSafe = false;
      break;
    }
    isIncreasing = difference < 0;
  }

  if (isSafe) {
    safeReports++;
  }
}

function didChangeDirection(previousDirection, isDifferencePositive) {
  return (
    previousDirection !== undefined &&
    previousDirection !== isDifferencePositive
  );
}

console.log(safeReports);

/* 483 is correct */
