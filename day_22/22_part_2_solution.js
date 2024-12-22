const fs = require("fs");

const input = fs.readFileSync("22_input.txt", "utf8");
const array = input.split("\n").map(Number);

const MOD = 16777216;
const secretNumbers_2kth = [];
const prices = [];

for (let i = 0; i < array.length; i++) {
  const secretNumber = array[i];
  let nextSecretNumber = secretNumber;
  prices[i] = [secretNumber % 10];
  for (let j = 0; j < 2000; j++) {
    nextSecretNumber = calculateNextSecretNumber(nextSecretNumber);
    prices[i].push(nextSecretNumber % 10);
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

const windowOfFourPrices = [];
const patterns = {};

for (let p = 0; p < prices.length; p++) {
  const buyerPrices = prices[p];
  for (let i = 0; i < buyerPrices.length; i++) {
    if (windowOfFourPrices.length < 4) {
      windowOfFourPrices.push(buyerPrices[i]);
    } else {
      windowOfFourPrices.push(buyerPrices[i]);
      const priceDifferences = getDifference(windowOfFourPrices);
      const pattern = priceDifferences.join("_");
      if (patterns[pattern] === undefined) {
        patterns[pattern] = { [p]: undefined };
      }
      if (patterns[pattern][p] === undefined) {
        patterns[pattern][p] = buyerPrices[i];
      }
      windowOfFourPrices.shift();
    }
  }
  windowOfFourPrices.length = 0;
}

function getDifference(sequence) {
  const difference = [];
  for (let i = 1; i < sequence.length; i++) {
    difference.push(sequence[i] - sequence[i - 1]);
  }
  return difference;
}

const mostBananas = { pattern: "", bananas: 0 };
for (const [pattern, bananas] of Object.entries(patterns)) {
  const currentBananas = Object.values(bananas).reduce(
    (acc, num) => acc + num,
    0
  );
  if (currentBananas > mostBananas.bananas) {
    mostBananas.pattern = pattern;
    mostBananas.bananas = currentBananas;
  }
}

console.log(mostBananas);

/* 4221 is too high */
/* 2055 is too high */
/* 1908 is too high */
/* 1887 is not correct */
/* 1896 is correct */
