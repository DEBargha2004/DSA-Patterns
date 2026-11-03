/**
 * Problem: Count and Say (LeetCode 38)
 * Difficulty: Medium
 * Pattern: S8 - Run-length and sequence processing
 *
 * The count-and-say sequence is a sequence of digit strings defined by the recursive formula:
 * countAndSay(1) = "1", countAndSay(n) is the run-length encoding of countAndSay(n - 1).
 */

// --- Optimal Approach (Iterative Run-Length Encoding) ---
// Time Complexity: O(n * L) where L is max length of generated string
// Space Complexity: O(L)
export function countAndSay(n: number): string {
  let current = "1";

  for (let step = 2; step <= n; step++) {
    let nextStr = "";
    let i = 0;

    while (i < current.length) {
      let count = 1;
      while (i + 1 < current.length && current[i] === current[i + 1]) {
        count++;
        i++;
      }
      nextStr += count.toString() + current[i];
      i++;
    }

    current = nextStr;
  }

  return current;
}

// --- Test Verification ---
console.assert(countAndSay(1) === "1", "Test 1 failed");
console.assert(countAndSay(4) === "1211", "Test 2 failed");
