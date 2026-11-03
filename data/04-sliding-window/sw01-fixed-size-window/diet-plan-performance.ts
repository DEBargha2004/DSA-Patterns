/**
 * Problem: Diet Plan Performance (LeetCode 1176)
 * Difficulty: Easy
 * Pattern: SW1 - Fixed-size window
 *
 * A dieter consumes calories[i] on the ith day. For every consecutive k days:
 * If sum < lower, -1 point; if sum > upper, +1 point. Return total points.
 */

// --- Optimal Approach (Fixed Size-k Sliding Window) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function dietPlanPerformance(calories: number[], k: number, lower: number, upper: number): number {
  let currentSum = 0;
  let points = 0;

  for (let i = 0; i < k; i++) {
    currentSum += calories[i];
  }
  if (currentSum < lower) points--;
  else if (currentSum > upper) points++;

  for (let i = k; i < calories.length; i++) {
    currentSum += calories[i] - calories[i - k];
    if (currentSum < lower) points--;
    else if (currentSum > upper) points++;
  }

  return points;
}

// --- Test Verification ---
console.assert(dietPlanPerformance([1, 2, 3, 4, 5], 1, 3, 3) === 0, "Test 1 failed");
console.assert(dietPlanPerformance([3, 2], 2, 0, 1) === 1, "Test 2 failed");
