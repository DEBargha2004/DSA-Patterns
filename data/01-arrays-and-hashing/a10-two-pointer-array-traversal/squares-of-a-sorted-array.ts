/**
 * Problem: Squares of a Sorted Array (LeetCode 977)
 * Difficulty: Easy
 * Pattern: A10 - Two-pointer array traversal
 *
 * Given an integer array nums sorted in non-decreasing order, return an array of the squares
 * of each number sorted in non-decreasing order.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n log n) - square each then sort
// Space Complexity: O(1) or O(n)
export function sortedSquaresBruteForce(nums: number[]): number[] {
  return nums.map((x) => x * x).sort((a, b) => a - b);
}

// --- 2. Optimal Approach (Two Pointers from Ends) ---
// Time Complexity: O(n) - largest squares exist at either extreme
// Space Complexity: O(n) for result array
export function sortedSquaresOptimal(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n);
  let left = 0;
  let right = n - 1;
  let insertPos = n - 1;

  while (left <= right) {
    const leftSquare = nums[left] * nums[left];
    const rightSquare = nums[right] * nums[right];

    if (leftSquare > rightSquare) {
      result[insertPos] = leftSquare;
      left++;
    } else {
      result[insertPos] = rightSquare;
      right--;
    }
    insertPos--;
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(sortedSquaresOptimal([-4, -1, 0, 3, 10])) === JSON.stringify([0, 1, 9, 16, 100]), "Test failed");
