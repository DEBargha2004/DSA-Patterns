/**
 * Pattern: Local choice with a provable invariant
 * Problem: Candy (LeetCode 135)
 *
 * There are n children standing in a line. Each child has a rating value.
 * Each child must have at least one candy. Children with a higher rating get
 * more candies than their immediate neighbors. Return minimum candies required.
 */

// Brute Force: Iteratively update candies array until no violation exists
// Time: O(N^2), Space: O(N)
export function candyBrute(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  let hasChanged = true;

  while (hasChanged) {
    hasChanged = false;
    for (let i = 0; i < n; i++) {
      if (i > 0 && ratings[i] > ratings[i - 1] && candies[i] <= candies[i - 1]) {
        candies[i] = candies[i - 1] + 1;
        hasChanged = true;
      }
      if (i < n - 1 && ratings[i] > ratings[i + 1] && candies[i] <= candies[i + 1]) {
        candies[i] = candies[i + 1] + 1;
        hasChanged = true;
      }
    }
  }

  return candies.reduce((sum, val) => sum + val, 0);
}

// Optimal: Two-Pass Greedy (Left-to-Right then Right-to-Left)
// Invariant: After pass 1, left neighbors satisfied. After pass 2 with Math.max, both satisfied.
// Time: O(N), Space: O(N)
export function candyOptimal(ratings: number[]): number {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // Left to right: satisfy right > left
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to left: satisfy left > right with max invariant
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((sum, val) => sum + val, 0);
}

// Test cases
const rCandy = [1, 0, 2];
if (candyBrute(rCandy) !== 5 || candyOptimal(rCandy) !== 5) throw new Error("Expected 5 candies");
const rCandy2 = [1, 2, 2];
if (candyOptimal(rCandy2) !== 4) throw new Error("Expected 4 candies");
console.log("Candy passed!");
