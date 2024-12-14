const fs = require("fs");

const input = fs.readFileSync("14_input.txt", "utf8");
const array = input.split("\n");
const width = 101;
const height = 103;

const robots = array.map((line) => {
  const [pos, speed] = line.split(" ");
  const [pCol, pRow] = pos.split("=")[1].split(",").map(Number);
  const [vCol, vRow] = speed.split("=")[1].split(",").map(Number);
  return [pRow, pCol, vRow, vCol];
});

const postAfterSeconds = (seconds) =>
  robots.map((robot) => {
    const [pRow, pCol, vRow, vCol] = robot;
    const newRow = (((pRow + vRow * seconds) % height) + height) % height;
    const newCol = (((pCol + vCol * seconds) % width) + width) % width;
    return [newRow, newCol];
  });

async function paintGrid() {
  for (let i = 8000; i <= 8300; i++) {
    const posAfterSeconds = await new Promise((resolve) =>
      setTimeout(() => resolve(postAfterSeconds(i)), 50)
    );
    const grid = Array.from({ length: height }, () => Array(width).fill(" "));
    for (const [row, col] of posAfterSeconds) {
      grid[row][col] = "#";
    }
    console.log(grid.map((row) => row.join("")).join("\n"));
    console.log(i);
  }
}
paintGrid();

/* 8168 is correct */
