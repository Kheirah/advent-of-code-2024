const fs = require("fs");

const input = fs.readFileSync("16_input.txt", "utf8");
const array = input.split("\n");

const shadow = array.slice().map((line) => line.split(""));

const entryExitTiles = array.reduce(
  (acc, curr, row) => {
    if (curr.includes("S")) {
      acc.start = [row, curr.indexOf("S")];
    }
    if (curr.includes("E")) {
      acc.end = [row, curr.indexOf("E")];
    }
    return acc;
  },
  { start: null, end: null }
);

let bestScore = Infinity;
const bestTiles = new Set();
traverseMaze(array, ...entryExitTiles.start, "E", 0);

function faceToDirection(facing, headedTo) {
  const directions = {
    N: [-1, 0],
    E: [0, 1],
    S: [1, 0],
    W: [0, -1],
  };

  const [facingA, facingB] = directions[facing];
  const [headedToA, headedToB] = directions[headedTo];
  const turns = [Math.abs(facingA + headedToA), Math.abs(facingB + headedToB)];
  const turnAmount = Math.max(...turns);

  switch (turnAmount) {
    case 0:
      return 2000;
    case 1:
      return 1000;
    case 2:
      return 0;
    default:
      return 0;
  }
}

function traverseMaze(maze, i, j, facing, score, visited = {}) {
  if (i < 0 || i >= maze.length || j < 0 || j >= maze[i].length) {
    return false;
  }

  if (maze[i][j] === "#") {
    return false;
  }

  if (visited[`${i},${j}`] && visited[`${i},${j}`].score < score - 1000) {
    return false;
  }

  if (visited[`${i},${j}`] && visited[`${i},${j}`].score === score) {
    return visited[`${i},${j}`].tile;
  }

  if (maze[i][j] === "E") {
    // hardcoded from solution in part 1
    if (score > 135512) {
      return false;
    }
    bestScore = Math.min(bestScore, score);
    visited[`${i},${j}`] = { tile: true, score: bestScore };
    bestTiles.add(`${i},${j}`);
    return true;
  }

  visited[`${i},${j}`] = { tile: false, score };

  const northTile = traverseMaze(
    maze,
    i - 1,
    j,
    "N",
    faceToDirection(facing, "N") + score + 1,
    visited
  );

  const eastTile = traverseMaze(
    maze,
    i,
    j + 1,
    "E",
    faceToDirection(facing, "E") + score + 1,
    visited
  );

  const southTile = traverseMaze(
    maze,
    i + 1,
    j,
    "S",
    faceToDirection(facing, "S") + score + 1,
    visited
  );

  const westTile = traverseMaze(
    maze,
    i,
    j - 1,
    "W",
    faceToDirection(facing, "W") + score + 1,
    visited
  );

  visited[`${i},${j}`].tile = northTile || eastTile || southTile || westTile;
  if (visited[`${i},${j}`].tile) {
    shadow[i][j] = "O";
    bestTiles.add(`${i},${j}`);
  }

  return visited[`${i},${j}`].tile;
}

// console.log(shadow.map((row) => row.join("")).join("\n"));
console.log(bestTiles.size);

/* 541 is correct */
