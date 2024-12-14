const fs = require("fs");

const input = fs.readFileSync("13_input.txt", "utf8");
const array = input.split("\n").filter((line) => line.trim() !== "");

const clawMachines = [];
// Process 3 lines at a time
for (let i = 0; i < array.length; i += 3) {
  const [buttonA, a, c] = array[i].match(/X\+(\d+), Y\+(\d+)/);
  const [buttonB, b, d] = array[i + 1].match(/X\+(\d+), Y\+(\d+)/);
  const [prize, xPrize, yPrize] = array[i + 2].match(/X=(\d+), Y=(\d+)/);

  if (buttonA && buttonB && prize) {
    clawMachines.push([
      parseInt(a),
      parseInt(b),
      parseInt(c),
      parseInt(d),
      parseInt(xPrize),
      parseInt(yPrize),
    ]);
  }
}

// Solve the claw machine equations using determinants
function solveClawMachine(a, b, c, d, xPrize, yPrize) {
  // Think of the equations in matrix form:
  // [a b][x] = [xPrize]
  // [c d][y] = [yPrize]

  // Calculate determinant
  const det = a * d - b * c;
  if (det === 0) return false; // No unique solution exists

  // Solve using Cramer's rule
  const x = (d * xPrize - b * yPrize) / det;
  const y = (-c * xPrize + a * yPrize) / det;
  // Explanation:
  // Replace first column in matrix with vector [xPrize, yPrize]
  // [xPrize b][x] = [a]
  // [yPrize d][y] = [c]
  // Replace second column in matrix with vector [xPrize, yPrize]
  // [a xPrize][x] = [b]
  // [c yPrize][y] = [d]

  // Valid solution if x and y are non-negative integers
  if (x < 0 || y < 0 || !Number.isInteger(x) || !Number.isInteger(y)) {
    return false;
  }

  // Calculate cost
  return 3 * x + y;
}

const totalCost = clawMachines
  .map((params) => solveClawMachine(...params))
  .reduce((acc, curr) => {
    return acc + curr;
  }, 0);

console.log(totalCost);

/* 28262 is correct */
