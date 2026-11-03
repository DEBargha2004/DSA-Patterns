/**
 * Problem: Maximum Subarray Sum with One Deletion (LeetCode 1186)
 * Difficulty: Medium
 * Pattern: A16 - Maximum subarray and subarray optimization
 *
 * Given an array of integers, return the maximum sum for a non-empty subarray with at most one element deletion.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function maximumSumBruteForce(arr: number[]): number {
  let maxSum = -Infinity;
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let sum = 0;
    let minElem = Infinity;
    for (let j = i; j < n; j++) {
      sum += arr[j];
      minElem = Math.min(minElem, arr[j]);
      // Case 1: no deletion
      maxSum = Math.max(maxSum, sum);
      // Case 2: delete one element (if length >= 2)
      if (j > i) {
        maxSum = Math.max(maxSum, sum - minElem);
      }
    }
  }

  return maxSum;
}

// --- 2. Optimal Approach (State Machine Dynamic Programming) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// State 0 (noDel): max subarray ending at i without deletion
// State 1 (oneDel): max subarray ending at i with exactly one deletion
export function maximumSumOptimal(arr: number[]): number {
  let noDel = arr[0];
  let oneDel = -Infinity;
  let result = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const val = arr[i];
    // oneDel at i is either:
    // 1. Delete current element: previous noDel
    // 2. Already deleted earlier element: previous oneDel + val
    oneDel = Math.max(noDel, oneDel + val);

    // noDel at i is standard Kadane: start fresh with val or extend previous noDel
    noDel = Math.max(val, noDel + val);

    result = Math.max(result, noDel, oneDel);
  }

  return result;
}

// --- Test Verification ---
console.assert(maximumSumOptimal([1, -2, 0, 3]) === 4, "Test 1 failed");
console.assert(maximumSumOptimal([1, -2, -2, 3]) === 3, "Test 2 failed");
console.assert(maximumSumOptimal([-1, -1, -1, -1]) === -1, "Test 3 failed");
