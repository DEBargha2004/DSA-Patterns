/**
 * Problem: Find Target Indices After Sorting Array (LeetCode 2089)
 * Difficulty: Easy
 * Pattern: BS3 - First or last occurrence
 *
 * Return a list of the target indices of nums after sorting nums in non-decreasing order.
 */

// --- Optimal Approach (Count Smaller & Count Equal - O(n) without sorting) ---
// Time Complexity: O(n)
// Space Complexity: O(1) auxiliary
export function targetIndices(nums: number[], target: number): number[] {
  let smaller = 0;
  let count = 0;

  for (const x of nums) {
    if (x < target) smaller++;
    else if (x === target) count++;
  }

  const result: number[] = [];
  for (let i = 0; i < count; i++) {
    result.push(smaller + i);
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(targetIndices([1, 2, 5, 2, 3], 2)) === JSON.stringify([1, 2]), "Test failed");
