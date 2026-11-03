/**
 * Problem: Delete and Earn (LeetCode 740)
 * Difficulty: Medium
 * Pattern: DP4 - Take-or-skip decisions
 *
 * Deleting num earns num * count, but destroys num-1 and num+1 (House Robber variant).
 */

// --- Optimal Approach (Frequency Array + Take-or-Skip DP) ---
// Time Complexity: O(n + maxVal)
// Space Complexity: O(maxVal)
export function deleteAndEarn(nums: number[]): number {
  let maxVal = 0;
  for (const x of nums) maxVal = Math.max(maxVal, x);

  const points = new Int32Array(maxVal + 1);
  for (const x of nums) points[x] += x;

  let prev2 = 0;
  let prev1 = 0;

  for (let i = 1; i <= maxVal; i++) {
    const take = prev2 + points[i];
    const skip = prev1;
    const curr = Math.max(take, skip);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// --- Test Verification ---
console.assert(deleteAndEarn([3, 4, 2]) === 6, "Test 1 failed");
console.assert(deleteAndEarn([2, 2, 3, 3, 3, 4]) === 9, "Test 2 failed");
