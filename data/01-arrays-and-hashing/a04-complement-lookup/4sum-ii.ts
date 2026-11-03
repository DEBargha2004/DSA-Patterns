/**
 * Problem: 4Sum II (LeetCode 454)
 * Difficulty: Medium
 * Pattern: A4 - Complement lookup
 *
 * Given four integer arrays nums1, nums2, nums3, and nums4 each of length n,
 * return the number of tuples (i, j, k, l) such that:
 * nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^4)
// Space Complexity: O(1)
export function fourSumIIBruteForce(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  let count = 0;
  for (const a of nums1) {
    for (const b of nums2) {
      for (const c of nums3) {
        for (const d of nums4) {
          if (a + b + c + d === 0) count++;
        }
      }
    }
  }
  return count;
}

// --- 2. Optimal Approach (Pairwise Sum Hash Map Complement) ---
// Time Complexity: O(n^2) - split into two groups of 2 arrays
// Space Complexity: O(n^2) to store sums of pairs from nums1 and nums2
export function fourSumIIOptimal(
  nums1: number[],
  nums2: number[],
  nums3: number[],
  nums4: number[]
): number {
  const sumCount = new Map<number, number>();

  for (const a of nums1) {
    for (const b of nums2) {
      const sum = a + b;
      sumCount.set(sum, (sumCount.get(sum) ?? 0) + 1);
    }
  }

  let totalTuples = 0;
  for (const c of nums3) {
    for (const d of nums4) {
      const complement = -(c + d);
      const count = sumCount.get(complement);
      if (count !== undefined) {
        totalTuples += count;
      }
    }
  }

  return totalTuples;
}

// --- Test Verification ---
const ans = fourSumIIOptimal([1, 2], [-2, -1], [-1, 2], [0, 2]);
console.assert(ans === 2, `Test failed: expected 2, got ${ans}`);
