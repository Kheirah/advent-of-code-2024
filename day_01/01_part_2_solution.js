const fs = require("fs");

const input = fs.readFileSync("01_input.txt", "utf8");
const array = input.split("\n");
const pairs = array.map((line) => line.split("   "));

const similarities = {};

for (let i = 0; i < pairs.length; i++) {
  if (similarities[pairs[i][1]] === undefined) {
    similarities[pairs[i][1]] = 1;
  } else {
    similarities[pairs[i][1]]++;
  }
}

let similarityCount = 0;
for (let i = 0; i < pairs.length; i++) {
  const currentNum = pairs[i][0];
  const currentSimilarity = similarities[currentNum];
  if (currentSimilarity !== undefined) {
    similarityCount += currentNum * currentSimilarity;
  }
}

console.log(similarityCount);

/* 23046913 is correct */
