const fs = require("fs");

const input = fs.readFileSync("16_input.txt", "utf8");
const array = input.split("\n");

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
    return;
  }

  if (maze[i][j] === "#") {
    return;
  }

  if (visited[`${i},${j}`] && visited[`${i},${j}`] <= score) {
    return;
  }

  if (maze[i][j] === "E") {
    bestScore = Math.min(bestScore, score);
    return 1;
  }

  visited[`${i},${j}`] = score;

  score += Math.min(
    traverseMaze(
      maze,
      i - 1,
      j,
      "N",
      faceToDirection(facing, "N") + score + 1,
      visited
    ),
    traverseMaze(
      maze,
      i,
      j + 1,
      "E",
      faceToDirection(facing, "E") + score + 1,
      visited
    ),
    traverseMaze(
      maze,
      i + 1,
      j,
      "S",
      faceToDirection(facing, "S") + score + 1,
      visited
    ),
    traverseMaze(
      maze,
      i,
      j - 1,
      "W",
      faceToDirection(facing, "W") + score + 1,
      visited
    )
  );

  return score;
}

console.log(bestScore);

/* 135512 is correct */
