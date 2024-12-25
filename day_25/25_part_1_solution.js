const fs = require("fs");

const input = fs.readFileSync("25_input.txt", "utf8");
const array = input.split("\n");

const keys = [];
const locks = [];

for (let i = 0; i < array.length; i += 8) {
  const line0 = array[i];
  if (line0 === "#####") {
    const l1 = array[i + 1];
    const l2 = array[i + 2];
    const l3 = array[i + 3];
    const l4 = array[i + 4];
    const l5 = array[i + 5];
    const l6 = array[i + 6];
    locks.push(line0, l1, l2, l3, l4, l5, l6);
  } else {
    const k1 = array[i + 1];
    const k2 = array[i + 2];
    const k3 = array[i + 3];
    const k4 = array[i + 4];
    const k5 = array[i + 5];
    const k6 = array[i + 6];
    keys.push(line0, k1, k2, k3, k4, k5, k6);
  }
}

const pins = getPins(keys);
const columns = getPins(locks);

function getPins(schematic) {
  const pins = [];

  for (let i = 0; i < schematic.length; i += 7) {
    const keyShape = [];
    for (let j = 0; j < schematic[0].length; j++) {
      let count = 0;
      for (let k = i; k < i + 7; k++) {
        if (schematic[k][j] === "#") {
          count++;
        }
      }
      keyShape.push(count);
    }
    pins.push(keyShape);
  }
  return pins;
}

let matches = 0;
for (let i = 0; i < columns.length; i++) {
  const lock = columns[i];
  for (let j = 0; j < pins.length; j++) {
    let match = true;
    for (let k = 0; k < pins[j].length; k++) {
      if (pins[j][k] + lock[k] > 7) {
        match = false;
      }
    }
    if (match) {
      matches++;
    }
  }
}

console.log(matches);

/* 3365 is correct */
