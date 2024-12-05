const fs = require("fs");

const input = fs.readFileSync("05_input.txt", "utf8");
const array = input.split("\n");

const rules = [];
let startPages = -1;

for (let i = 0; i < array.length; i++) {
  const line = array[i];
  if (line === "") {
    startPages = i + 1;
    break;
  }

  const [a, b] = line.split("|");
  rules.push([parseInt(a), parseInt(b)]);
}

const quickAccessOfOrderingRules = {};
for (const rule of rules) {
  const [a, b] = rule;
  if (quickAccessOfOrderingRules[a] === undefined) {
    quickAccessOfOrderingRules[a] = [];
  }
  quickAccessOfOrderingRules[a].push(b);
}

const updates = array
  .slice(startPages)
  .map((line) => line.split(",").map((page) => parseInt(page)));

const orderedUpdates = updates.map((pages) => {
  return pages.slice().sort((a, b) => {
    const rulesOfA = quickAccessOfOrderingRules[a];
    if (rulesOfA?.includes(b)) {
      return -1;
    }
    return 0;
  });
});

let middlePageNumberSum = 0;

for (let i = 0; i < updates.length; i++) {
  if (orderedUpdates[i].toString() !== updates[i].toString()) {
    middlePageNumberSum +=
      orderedUpdates[i][Math.floor(orderedUpdates[i].length / 2)];
  }
}

console.log(middlePageNumberSum);

/* 4130 is correct */
