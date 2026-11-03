/**
 * Problem: Squares of a Sorted Array (LeetCode 977)
 * Difficulty: Easy
 * Pattern: TP5 - Two pointers on sorted arrays
 *
 * Return sorted array of squares of nums sorted in non-decreasing order.
 */

// --- Optimal Approach (Two Pointers Colliding from Extremes) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function sortedSquares(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n);
  let l = 0, r = n - 1, pos = n - 1;

  while (l <= r) {
    const lSq = nums[l] * nums[l];
    const rSq = nums[r] * nums[r];

    if (lSq > rSq) {
      result[pos--] = lSq;
      l++;
    } else {
      result[pos--] = rSq;
      r--;
    }
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(sortedSquares([-4, -1, 0, 3, 10])) === JSON.stringify([0, 1, 9, 16, 100]), "Test failed");
