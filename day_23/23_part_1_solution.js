const fs = require("fs");

const input = fs.readFileSync("23_input.txt", "utf8");
const array = input.split("\n");

const p2p = {};
const p2p_only_three = {};

array.forEach((line) => {
  const [a, b] = line.split("-");

  if (p2p[a] === undefined) {
    p2p[a] = [];
  }

  if (p2p[b] === undefined) {
    p2p[b] = [];
  }

  p2p[a].push(b);
  p2p[b].push(a);

  return [a, b];
});

for (const [computer, connections] of Object.entries(p2p)) {
  for (let i = 0; i < connections.length; i++) {
    const connectedComputer = connections[i];
    const withoutSelf = connections.filter((_, idx) => idx !== i);
    let count = withoutSelf.length;
    while (count > 0) {
      if (p2p[connectedComputer].includes(withoutSelf[count - 1])) {
        const byThreeTheyCome = [
          computer,
          connectedComputer,
          withoutSelf[count - 1],
        ];

        if (p2p_only_three[byThreeTheyCome] === undefined) {
          p2p_only_three[byThreeTheyCome.sort().join("-")] = p2p_only_three[
            byThreeTheyCome.sort().join("-")
          ] = byThreeTheyCome;
        }
      }
      count--;
    }
  }
}

console.log(
  Object.values(p2p_only_three).filter((triplet) =>
    triplet.some((comp) => comp.startsWith("t"))
  ).length
);

/* 925 is too low */
/* 1368 is correct */
