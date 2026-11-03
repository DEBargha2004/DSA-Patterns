/**
 * Problem: Special Array With X Elements Greater Than or Equal X (LeetCode 1608)
 * Difficulty: Easy
 * Pattern: BS3 - First or last occurrence
 *
 * Find integer x such that exactly x numbers in nums are >= x.
 */

// --- Optimal Approach (Binary Search over [1, n]) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1)
export function specialArray(nums: number[]): number {
  nums.sort((a, b) => a - b);
  const n = nums.length;

  let left = 1, right = n;
  while (left <= right) {
    const x = left + Math.floor((right - left) / 2);

    // Find first element >= x
    let l = 0, r = n - 1, idx = n;
    while (l <= r) {
      const mid = l + Math.floor((r - l) / 2);
      if (nums[mid] >= x) {
        idx = mid;
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    const count = n - idx;
    if (count === x) return x;
    else if (count > x) left = x + 1;
    else right = x - 1;
  }

  return -1;
}

// --- Test Verification ---
console.assert(specialArray([3, 5]) === 2, "Test 1 failed");
console.assert(specialArray([0, 0]) === -1, "Test 2 failed");
console.assert(specialArray([0, 4, 3, 0, 4]) === 3, "Test 3 failed");
