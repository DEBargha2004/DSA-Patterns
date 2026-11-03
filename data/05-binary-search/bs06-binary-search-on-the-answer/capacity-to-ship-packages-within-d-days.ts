/**
 * Problem: Capacity To Ship Packages Within D Days (LeetCode 1011)
 * Difficulty: Medium
 * Pattern: BS6 - Binary search on the answer
 *
 * Return least weight capacity of ship that will result in all packages being shipped within days.
 */

// --- Optimal Approach (Binary Search over Capacity [max(weights), sum(weights)]) ---
// Time Complexity: O(n log(sum - max))
// Space Complexity: O(1)
export function shipWithinDays(weights: number[], days: number): number {
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b, 0);
  let ans = right;

  function feasible(cap: number): boolean {
    let dayCount = 1;
    let currentLoad = 0;

    for (const w of weights) {
      if (currentLoad + w > cap) {
        dayCount++;
        currentLoad = 0;
      }
      currentLoad += w;
    }

    return dayCount <= days;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (feasible(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5) === 15, "Test 1 failed");
console.assert(shipWithinDays([3, 2, 2, 4, 1, 4], 3) === 6, "Test 2 failed");
