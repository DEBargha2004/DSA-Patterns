/**
 * Pattern: Greedy assignment and pairing
 * Problem: Assign Cookies (LeetCode 455)
 *
 * Each child i has greed factor g[i]. Each cookie j has size s[j].
 * A child is content if s[j] >= g[i]. Maximize number of content children.
 */

// Brute Force: Nested loop matching smallest valid cookie for each child
// Time: O(N * M), Space: O(M)
export function findContentChildrenBrute(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  const used = new Array(s.length).fill(false);
  let count = 0;

  for (const greed of g) {
    let bestCookie = -1;
    let minSize = Infinity;

    for (let j = 0; j < s.length; j++) {
      if (!used[j] && s[j] >= greed && s[j] < minSize) {
        minSize = s[j];
        bestCookie = j;
      }
    }

    if (bestCookie !== -1) {
      used[bestCookie] = true;
      count++;
    }
  }

  return count;
}

// Optimal: Two Pointers on Sorted Arrays (Assign smallest sufficient cookie to least greedy child)
// Time: O(N log N + M log M), Space: O(1) auxiliary
export function findContentChildrenOptimal(g: number[], s: number[]): number {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let child = 0;
  let cookie = 0;

  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) {
      child++; // child satisfied
    }
    cookie++; // move to next cookie
  }

  return child;
}

// Test cases
const gTest = [1, 2, 3];
const sTest = [1, 1];
if (findContentChildrenBrute(gTest, sTest) !== 1 || findContentChildrenOptimal(gTest, sTest) !== 1) {
  throw new Error("Expected 1 child satisfied");
}
console.log("Assign Cookies passed!");
