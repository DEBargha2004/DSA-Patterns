/**
 * Problem: Reverse String (LeetCode 344)
 * Difficulty: Easy
 * Pattern: S3 - Two-pointer string processing
 *
 * Write a function that reverses a string given as an array of characters s.
 * Must modify the input array in-place with O(1) extra memory.
 */

// --- Optimal Approach (Two Pointers Colliding) ---
// Time Complexity: O(n)
// Space Complexity: O(1) in-place
export function reverseString(s: string[]): void {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
}

// --- Test Verification ---
const arr = ["h", "e", "l", "l", "o"];
reverseString(arr);
console.assert(JSON.stringify(arr) === JSON.stringify(["o", "l", "l", "e", "h"]), "Test failed");
