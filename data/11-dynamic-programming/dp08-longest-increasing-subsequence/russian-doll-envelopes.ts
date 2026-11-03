/**
 * Problem: Russian Doll Envelopes (LeetCode 354)
 * Difficulty: Hard
 * Pattern: DP8 - Longest increasing subsequence
 *
 * Find max envelopes you can Russian doll (width and height must both be strictly greater).
 */

// --- Optimal Approach (Sort width ascending + height descending, then LIS on height) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function maxEnvelopes(envelopes: number[][]): number {
  // Sort width ascending; tie-break height descending to avoid using same width twice
  envelopes.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);

  const tails: number[] = [];
  for (const [, h] of envelopes) {
    let low = 0, high = tails.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (tails[mid] < h) low = mid + 1;
      else high = mid - 1;
    }
    if (low === tails.length) tails.push(h);
    else tails[low] = h;
  }

  return tails.length;
}

// --- Test Verification ---
const env1 = [[5, 4], [6, 4], [6, 7], [2, 3]];
console.assert(maxEnvelopes(env1) === 3, "Test 1 failed ([2,3] => [5,4] => [6,7])");
const env2 = [[1, 1], [1, 1], [1, 1]];
console.assert(maxEnvelopes(env2) === 1, "Test 2 failed");
