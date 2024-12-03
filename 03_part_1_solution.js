const fs = require("fs");

const input = fs.readFileSync("03_input.txt", "utf8");

const regex = /mul\(\d{1,3},\d{1,3}\)/g;
const matches = input.match(regex);

const multiplications = matches.map((match) => {
  const [_, a, b] = match.match(/mul\((\d{1,3}),\s*(\d{1,3})\)/);
  return parseInt(a) * parseInt(b);
});

const sum = multiplications.reduce((acc, curr) => acc + curr, 0);

console.log(sum);

/* 187825547 is correct */
