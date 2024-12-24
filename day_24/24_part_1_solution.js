const fs = require("fs");

const input = fs.readFileSync("24_input.txt", "utf8");
const array = input.split("\n");

const operations = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
  /* NOT: (a) => ~a,
  LSHIFT: (a, b) => a << b,
  RSHIFT: (a, b) => a >> b, */
};

const inputs = {};
const zWires = [];
let reachedSeparator = false;

for (let i = 0; i < array.length; i++) {
  const line = array[i];

  if (line === "") {
    reachedSeparator = true;
    continue;
  }

  if (reachedSeparator) {
    const [gates, output] = line.split(" -> ");
    const [wire1, logic, wire2] = gates.split(" ");
    inputs[output] = { inputs: [wire1, wire2], logic };
    if (output.startsWith("z")) {
      zWires.push(output);
    }
  } else {
    const [wire, output] = line.split(": ");
    inputs[wire] = { inputs: [Number(output)], logic: null };
  }
}

function getWireValue(wire) {
  if (wire.inputs.length === 1) {
    return wire.inputs[0];
  }

  const [wire1, wire2] = wire.inputs;
  const logic = wire.logic;
  const value1 = getWireValue(inputs[wire1]);
  const value2 = getWireValue(inputs[wire2]);
  return operations[logic](value1, value2);
}

zWires.sort((a, b) => b.localeCompare(a));
const outputs = zWires.map((wire) => getWireValue(inputs[wire]));
console.log(parseInt(outputs.join(""), 2));

/* 51837135476040 is correct */
