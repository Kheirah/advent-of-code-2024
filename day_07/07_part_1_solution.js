const fs = require("fs");

const input = fs.readFileSync("07_input.txt", "utf8");
const array = input.split("\n");

const lines = array.map((line) => line.split(": "));
const calibrationValues = lines.map((line) => ({
  [line[0]]: line[1].split(" ").map(Number),
}));

const validCalibrations = [];

for (const calibration of calibrationValues) {
  const [sum, values] = Object.entries(calibration)[0];
  let permutations = Math.pow(2, values.length);

  while (permutations) {
    const binary = permutations.toString(2).padStart(values.length, "0");
    let currentSum = values[0];
    for (let i = 1; i < values.length; i++) {
      const value = values[i];
      if (binary[i - 1] === "0") {
        currentSum += value;
      } else {
        currentSum *= value;
      }
    }
    if (currentSum == sum) {
      validCalibrations.push(calibration);
      break;
    }
    permutations--;
  }
}

const totalCalibration = validCalibrations.reduce((acc, curr) => {
  return acc + Number(Object.keys(curr)[0]);
}, 0);

console.log(totalCalibration);

/* 1298300076754 is correct */
