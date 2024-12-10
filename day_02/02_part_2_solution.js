const fs = require("fs");

const input = fs.readFileSync("02_input.txt", "utf8");
const array = input.split("\n");

const unusualData = array
  .map((line) => line.split(" "))
  .map((line) => line.map(Number));

let safeReports = 0;

for (let i = 0; i < unusualData.length; i++) {
  const report = unusualData[i];

  const [isSafe, unsafeAt] = isReportSafe(report);

  if (!isSafe) {
    const [isSafeWithoutJ] = isReportSafe(
      report.filter((_, index) => index !== unsafeAt)
    );
    const [isSafeWithoutJPlus1] = isReportSafe(
      report.filter((_, index) => index !== unsafeAt + 1)
    );
    const [isSafeWithoutFirstLevel] = isReportSafe(
      report.filter((_, index) => index !== 0)
    );

    if (isSafeWithoutJ || isSafeWithoutJPlus1 || isSafeWithoutFirstLevel) {
      safeReports++;
    }
  } else {
    safeReports++;
  }
}

/*
 * final fix: missing special case where initial level should not determine direction
 * [7,6,7,8,9]
 */

function isReportSafe(report) {
  let isIncreasing = undefined;

  for (let j = 0; j < report.length - 1; j++) {
    const difference = report[j] - report[j + 1];

    if (
      ![1, 2, 3].includes(Math.abs(difference)) ||
      didChangeDirection(isIncreasing, difference < 0)
    ) {
      return [false, j];
    }
    isIncreasing = difference < 0;
  }

  return [true, -1];
}

function didChangeDirection(previousDirection, isDifferencePositive) {
  return (
    previousDirection !== undefined &&
    previousDirection !== isDifferencePositive
  );
}

console.log(safeReports);

/* 532 is too high */
/* 509 is too low */
/* 526 is too low */
/* 531 is too high */
/* 529 is not correct */
/* 528 is correct */
