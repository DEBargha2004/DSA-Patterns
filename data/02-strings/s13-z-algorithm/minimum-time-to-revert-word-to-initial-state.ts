/**
 * Problem: Minimum Time to Revert Word to Initial State (LeetCode 3029)
 * Difficulty: Medium
 * Pattern: S13 - Z-algorithm
 *
 * You are given a string word and an integer k. Every second, you remove the prefix of length k
 * and add any k characters to the end. Return the minimum number of seconds to revert to initial state.
 */

// --- Optimal Approach (Z-Algorithm Suffix-Prefix Matching) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
// At second t, we have removed t*k characters. If the remaining suffix of length n - t*k
// matches the prefix of word (i.e. z[t*k] >= n - t*k), we can recreate the initial word!
export function minimumTimeToInitialState(word: string, k: number): number {
  const n = word.length;
  const z = new Array<number>(n).fill(0);
  let l = 0, r = 0;

  for (let i = 1; i < n; i++) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < n && word[z[i]] === word[i + z[i]]) z[i]++;
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }

  for (let i = k; i < n; i += k) {
    if (z[i] >= n - i) {
      return i / k;
    }
  }

  return Math.ceil(n / k);
}

// --- Test Verification ---
console.assert(minimumTimeToInitialState("abacaba", 3) === 2, "Test 1 failed");
console.assert(minimumTimeToInitialState("abacaba", 4) === 1, "Test 2 failed");
