const fs = require("fs");

const input = fs.readFileSync("11_input.txt", "utf8");
const array = input
  .split("\n")
  .map((line) => line.split(" "))
  .flat();

const blinks = 75;
const straightLine = array.slice();
const cache = {};

const totalStones = straightLine.reduce(
  (acc, curr) => acc + applyRule(curr, blinks),
  0
);

function applyRule(stone, blinks) {
  if (cache[`${stone}-${blinks}`]) {
    return cache[`${stone}-${blinks}`];
  }
  let result;
  if (blinks === 0) result = 1;
  else if (stone === "0") {
    result = applyRule("1", blinks - 1);
  } else if (stone.length % 2 === 0) {
    const left = stone.slice(0, stone.length / 2);
    const right = Number(stone.slice(stone.length / 2)).toString();
    result = applyRule(left, blinks - 1) + applyRule(right, blinks - 1);
  } else if (stone.length % 2 === 1) {
    result = applyRule((stone * 2024).toString(), blinks - 1);
  }

  cache[`${stone}-${blinks}`] = result;
  return result;
}

console.log(totalStones);

/* 240954878211138 is correct */
