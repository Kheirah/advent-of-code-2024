const fs = require("fs");

const input = fs.readFileSync("09_input.txt", "utf8");
const array = input.split("\n");

const blocks = array[0];
const filesystem = [];

let id = 0;
for (let i = 0; i < blocks.length; i++) {
  let block = parseInt(blocks[i]);
  const isFreeSpace = i % 2 === 1;
  while (block) {
    const fragment = isFreeSpace ? "." : id;
    filesystem.push(fragment);
    block--;
  }
  if (!isFreeSpace) id++;
}

const matches = [];
let currentNum = null;
let startIndex = null;

for (let i = 0; i < filesystem.length; i++) {
  if (typeof filesystem[i] === "number") {
    if (currentNum === filesystem[i]) {
      // Continue current sequence of numbers
      continue;
    } else if (currentNum !== null) {
      // End previous sequence
      matches.push({
        value: currentNum,
        startIndex: startIndex,
        length: i - startIndex,
      });
    }
    // Initialize new sequence
    currentNum = filesystem[i];
    startIndex = i;
  } else if (currentNum !== null) {
    // End sequence when hitting a dot
    matches.push({
      value: currentNum,
      startIndex: startIndex,
      length: i - startIndex,
    });
    currentNum = null;
  }
}

// Let's not forget the last sequence if it ends at array boundary
if (currentNum !== null) {
  matches.push({
    value: currentNum,
    startIndex: startIndex,
    length: filesystem.length - startIndex,
  });
}

outer: while (matches.length) {
  const { value, startIndex, length } = matches.pop();
  let diskIndex = 0;
  let freeSpace = filesystem[diskIndex];
  let freeSpaceLength = 0;

  while (diskIndex < filesystem.length && diskIndex < startIndex) {
    if (freeSpace === ".") {
      freeSpaceLength++;
      diskIndex++;
      freeSpace = filesystem[diskIndex];
    } else {
      if (freeSpaceLength >= length) {
        let moves = 0;
        while (moves < length) {
          filesystem[diskIndex - freeSpaceLength + moves] = value;
          filesystem[startIndex + moves] = ".";
          moves++;
        }
        continue outer;
      }
      freeSpaceLength = 0;
      diskIndex++;
      freeSpace = filesystem[diskIndex];
    }
  }

  // Let's not forget the last item if it ends at array boundary
  if (freeSpaceLength >= length) {
    let moves = 0;
    while (moves < length) {
      filesystem[diskIndex - freeSpaceLength + moves] = value;
      filesystem[startIndex + moves] = ".";
      moves++;
    }
    continue outer;
  }
}

console.log(
  filesystem.reduce((acc, curr, i) => (curr !== "." ? acc + curr * i : acc), 0)
);

/* 15833897195827 is too high */
/* 6412390328451 is too high */
/* 6412390114238 is correct */
