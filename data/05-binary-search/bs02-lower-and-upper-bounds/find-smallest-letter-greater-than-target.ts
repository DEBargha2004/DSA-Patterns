/**
 * Problem: Find Smallest Letter Greater Than Target (LeetCode 744)
 * Difficulty: Easy
 * Pattern: BS2 - Lower and upper bounds (Strict Upper Bound)
 *
 * Return smallest character in sorted letters strictly greater than target. Wraps around.
 */

// --- Optimal Approach (Upper Bound Binary Search) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function nextGreatestLetter(letters: string[], target: number | string): string {
  let left = 0;
  let right = letters.length - 1;
  const targetStr = String(target);

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (letters[mid] <= targetStr) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return letters[left % letters.length];
}

// --- Test Verification ---
console.assert(nextGreatestLetter(["c", "f", "j"], "a") === "c", "Test 1 failed");
console.assert(nextGreatestLetter(["c", "f", "j"], "c") === "f", "Test 2 failed");
console.assert(nextGreatestLetter(["x", "x", "y", "y"], "z") === "x", "Test 3 failed");
