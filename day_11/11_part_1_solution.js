const fs = require("fs");

const input = fs.readFileSync("11_input.txt", "utf8");
const array = input
  .split("\n")
  .map((line) => line.split(" "))
  .flat();

let blinks = 25;
let straightLine = array.slice();

while (blinks > 0) {
  straightLine = straightLine.map((stone) => applyRule(stone)).flat();
  blinks--;
}

function applyRule(stone) {
  if (stone === "0") {
    return "1";
  }

  if (stone.length % 2 === 0) {
    const left = stone.slice(0, stone.length / 2);
    const right = Number(stone.slice(stone.length / 2)).toString();
    return [left, right];
  }

  if (stone.length % 2 === 1) {
    return (stone * 2024).toString();
  }
}

console.log(straightLine.length);

/* 203609 is correct */
