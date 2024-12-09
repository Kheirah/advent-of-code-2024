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
    const fragment = isFreeSpace ? undefined : id;
    filesystem.push(fragment);
    block--;
  }
  if (!isFreeSpace) id++;
}

let checksum = 0;
let left = 0;
let right = filesystem.length - 1;

while (left <= right) {
  const leftFragment = filesystem[left];
  let rightFragment = filesystem[right];
  while (rightFragment === undefined) {
    right--;
    rightFragment = filesystem[right];
  }

  if (leftFragment !== undefined) {
    checksum += left * leftFragment;
    left++;
  } else {
    checksum += left * rightFragment;
    filesystem[left] = rightFragment;
    filesystem[right] = undefined;
    left++;
    right--;
  }
}

console.log(
  filesystem
    .filter((x) => x !== undefined)
    .reduce((acc, curr, i) => acc + curr * i, 0)
);
console.log(checksum);

/* 6390444967413 is too high */
/* 6390180901651 is correct */
