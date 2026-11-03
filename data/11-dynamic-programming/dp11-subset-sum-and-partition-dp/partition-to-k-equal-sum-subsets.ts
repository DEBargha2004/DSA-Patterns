/**
 * Problem: Partition to K Equal Sum Subsets (LeetCode 698)
 * Difficulty: Medium
 * Pattern: DP11 - Subset sum and partition DP
 *
 * Partition array into k subsets with equal sum.
 */

// --- Optimal Approach (Backtracking with Descending Sort & Pruning) ---
// Time Complexity: O(k * 2^n)
// Space Complexity: O(n)
export function canPartitionKSubsets(nums: number[], k: number): boolean {
  const sum = nums.reduce((a, b) => a + b, 0);
  if (sum % k !== 0) return false;
  const target = sum / k;

  nums.sort((a, b) => b - a);
  if (nums[0] > target) return false;

  const used = new Uint8Array(nums.length);

  function backtrack(kLeft: number, currentSum: number, startIdx: number): boolean {
    if (kLeft === 1) return true; // remaining elements must equal target

    if (currentSum === target) {
      return backtrack(kLeft - 1, 0, 0);
    }

    for (let i = startIdx; i < nums.length; i++) {
      if (!used[i] && currentSum + nums[i] <= target) {
        used[i] = 1;
        if (backtrack(kLeft, currentSum + nums[i], i + 1)) return true;
        used[i] = 0;

        // Skip identical numbers to prune duplicate permutations
        while (i + 1 < nums.length && nums[i] === nums[i + 1]) i++;
        if (currentSum === 0) break; // if first choice in empty bucket fails, all fail
      }
    }

    return false;
  }

  return backtrack(k, 0, 0);
}

// --- Test Verification ---
console.assert(canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4) === true, "Test 1 failed");
console.assert(canPartitionKSubsets([1, 2, 3, 4], 3) === false, "Test 2 failed");
