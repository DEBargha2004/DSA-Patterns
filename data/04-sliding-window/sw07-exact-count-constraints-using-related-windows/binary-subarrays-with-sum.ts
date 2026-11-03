/**
 * Problem: Binary Subarrays With Sum (LeetCode 930)
 * Difficulty: Medium
 * Pattern: SW7 - Exact-count constraints using related windows
 *
 * Count non-empty subarrays with sum equals goal via atMost(goal) - atMost(goal - 1).
 */

// --- Optimal Approach (Exact Sum = atMost(goal) - atMost(goal - 1)) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function numSubarraysWithSum(nums: number[], goal: number): number {
  function atMost(target: number): number {
    if (target < 0) return 0;
    let left = 0, sum = 0, count = 0;

    for (let right = 0; right < nums.length; right++) {
      sum += nums[right];
      while (sum > target) {
        sum -= nums[left++];
      }
      count += right - left + 1;
    }

    return count;
  }

  return atMost(goal) - atMost(goal - 1);
}

// --- Test Verification ---
console.assert(numSubarraysWithSum([1, 0, 1, 0, 1], 2) === 4, "Test 1 failed");
console.assert(numSubarraysWithSum([0, 0, 0, 0, 0], 0) === 15, "Test 2 failed");
