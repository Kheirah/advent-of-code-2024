const fs = require("fs");

const input = fs.readFileSync("01_example.txt", "utf8");
const array = input.split("\n");
const pairs = array.map((line) => line.split("   "));

const left = pairs.slice().sort((a, b) => a[0] - b[0]);
const right = pairs.slice().sort((a, b) => a[1] - b[1]);

let distance = 0;

for (let i = 0; i < left.length; i++) {
  distance += Math.abs(left[i][0] - right[i][1]);
}

console.log(distance);

/* 1580061 is correct */
