const fs = require("fs");

const input = fs.readFileSync("14_input.txt", "utf8");
const array = input.split("\n");
const width = 101; //101; //11;
const height = 103; //103; //7;

const robots = array.map((line) => {
  const [pos, speed] = line.split(" ");
  const [pCol, pRow] = pos.split("=")[1].split(",").map(Number);
  const [vCol, vRow] = speed.split("=")[1].split(",").map(Number);
  return [pRow, pCol, vRow, vCol];
});

const posAfter100Seconds = robots.map((robot) => {
  const [pRow, pCol, vRow, vCol] = robot;
  const newRow = (((pRow + vRow * 100) % height) + height) % height;
  const newCol = (((pCol + vCol * 100) % width) + width) % width;
  return [newRow, newCol];
});

const quadrants = [0, 0, 0, 0];

for (let i = 0; i < posAfter100Seconds.length; i++) {
  const [row, col] = posAfter100Seconds[i];
  if (row < Math.floor(height / 2) && col < Math.floor(width / 2)) {
    quadrants[0]++;
  } else if (row < Math.floor(height / 2) && col > Math.floor(width / 2)) {
    quadrants[1]++;
  } else if (row > Math.floor(height / 2) && col < Math.floor(width / 2)) {
    quadrants[2]++;
  } else if (row > Math.floor(height / 2) && col > Math.floor(width / 2)) {
    quadrants[3]++;
  }
}

console.log(quadrants.reduce((acc, curr) => acc * curr, 1));

/* 77785110 is too low */
/* 226236192 is correct */
