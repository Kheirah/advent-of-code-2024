const fs = require("fs");

const input = fs.readFileSync("22_input.txt", "utf8");
const array = input.split("\n").map(Number);

const MOD = 16777216;
const secretNumbers_2kth = [];

for (const secretNumber of array) {
  let nextSecretNumber = secretNumber;
  for (let i = 0; i < 2000; i++) {
    nextSecretNumber = calculateNextSecretNumber(nextSecretNumber);
  }
  secretNumbers_2kth.push(nextSecretNumber);
}

function calculateNextSecretNumber(secret) {
  let finalSecret = secret;

  const times64 = secret << 6;
  finalSecret = finalSecret ^ times64;
  finalSecret = prune(finalSecret);

  const dividedBy32 = finalSecret >> 5;
  finalSecret = finalSecret ^ dividedBy32;
  finalSecret = prune(finalSecret);

  const times2048 = finalSecret << 11;
  finalSecret = finalSecret ^ times2048;
  finalSecret = prune(finalSecret);

  return finalSecret;
}

function prune(num) {
  return ((num % MOD) + MOD) % MOD;
}

console.log(secretNumbers_2kth.reduce((acc, num) => acc + num, 0));

/* 16299144133 is correct */
