/**
 * Problem: Remove K Digits (LeetCode 402)
 * Difficulty: Medium
 * Pattern: SQ4 - Monotonic decreasing stack
 *
 * Given string num representing a non-negative integer and integer k,
 * return the smallest possible integer after removing k digits.
 */

// --- Optimal Approach (Monotonic Increasing Digits Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function removeKdigits(num: string, k: number): string {
  const stack: string[] = [];

  for (const digit of num) {
    while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      k--;
    }
    stack.push(digit);
  }

  // If k still > 0, remove from end
  while (k > 0 && stack.length > 0) {
    stack.pop();
    k--;
  }

  // Remove leading zeros
  let i = 0;
  while (i < stack.length && stack[i] === "0") {
    i++;
  }

  const res = stack.slice(i).join("");
  return res.length === 0 ? "0" : res;
}

// --- Test Verification ---
console.assert(removeKdigits("1432219", 3) === "1219", "Test 1 failed");
console.assert(removeKdigits("10200", 1) === "200", "Test 2 failed");
console.assert(removeKdigits("10", 2) === "0", "Test 3 failed");
console.assert(removeKdigits("9", 1) === "0", "Test 4 failed");
console.assert(removeKdigits("112", 1) === "11", "Test 5 failed");
