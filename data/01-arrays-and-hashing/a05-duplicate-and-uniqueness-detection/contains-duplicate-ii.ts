/**
 * Problem: Contains Duplicate II (LeetCode 219)
 * Difficulty: Easy
 * Pattern: A5 - Duplicate and uniqueness detection
 *
 * Given an integer array nums and an integer k, return true if there are two distinct indices
 * i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n * min(n, k))
// Space Complexity: O(1)
export function containsNearbyDuplicateBruteForce(nums: number[], k: number): boolean {
  for (let i = 0; i < nums.length; i++) {
    const limit = Math.min(nums.length, i + k + 1);
    for (let j = i + 1; j < limit; j++) {
      if (nums[i] === nums[j]) return true;
    }
  }
  return false;
}

// --- 2. Optimal Approach (Hash Map Storing Last Seen Index) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function containsNearbyDuplicateMap(nums: number[], k: number): boolean {
  const lastIndex = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const prev = lastIndex.get(nums[i]);
    if (prev !== undefined && i - prev <= k) {
      return true;
    }
    lastIndex.set(nums[i], i);
  }

  return false;
}

// --- 3. Optimal Alternative (Sliding Window Hash Set of Size k) ---
// Time Complexity: O(n)
// Space Complexity: O(min(n, k))
export function containsNearbyDuplicateOptimal(nums: number[], k: number): boolean {
  const window = new Set<number>();

  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);

    if (window.size > k) {
      window.delete(nums[i - k]);
    }
  }

  return false;
}

// --- Test Verification ---
console.assert(containsNearbyDuplicateOptimal([1, 2, 3, 1], 3) === true, "Test 1 failed");
console.assert(containsNearbyDuplicateOptimal([1, 2, 3, 1, 2, 3], 2) === false, "Test 2 failed");
