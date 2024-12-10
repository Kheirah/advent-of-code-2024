const fs = require("fs");

const input = fs.readFileSync("03_input.txt", "utf8");

const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
const matches = input.match(regex);

let enabled = true;
const instructions = [];

for (const match of matches) {
  if (match === "don't()") {
    enabled = false;
    continue;
  } else if (match === "do()") {
    enabled = true;
    continue;
  }

  if (enabled) {
    instructions.push(match);
  }
}

const multiplications = instructions.map((match) => {
  const [_, a, b] = match.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/);
  return parseInt(a) * parseInt(b);
});

const sum = multiplications.reduce((acc, curr) => acc + curr, 0);

console.log(sum);

/* 85508223 is correct */
