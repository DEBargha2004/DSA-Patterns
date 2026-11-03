/**
 * Problem: Longest Duplicate Substring (LeetCode 1044)
 * Difficulty: Hard
 * Pattern: S11 - String hashing + Binary search
 *
 * Given a string s, consider all duplicated substrings: (contiguous substrings of s that occur 2 or more times).
 * Return any duplicated substring that has the longest possible length. If none, return "".
 */

// --- Optimal Approach (Binary Search on Length + Rabin-Karp Rolling Hash) ---
// Time Complexity: O(N log N)
// Space Complexity: O(N)
export function longestDupSubstring(s: string): string {
  const n = s.length;
  const nums = new Array<number>(n);
  const aCode = 'a'.charCodeAt(0);
  for (let i = 0; i < n; i++) nums[i] = s.charCodeAt(i) - aCode;

  const MOD = 2 ** 31 - 1; // Mersenne prime
  const BASE = 26;

  function search(len: number): number {
    let hash = 0;
    let power = 1;

    for (let i = 0; i < len; i++) {
      hash = (hash * BASE + nums[i]) % MOD;
      if (i < len - 1) power = (power * BASE) % MOD;
    }

    const seen = new Map<number, number[]>();
    seen.set(hash, [0]);

    for (let i = 1; i <= n - len; i++) {
      hash = (hash - ((nums[i - 1] * power) % MOD) + MOD) % MOD;
      hash = (hash * BASE + nums[i + len - 1]) % MOD;

      if (seen.has(hash)) {
        const curSub = s.substring(i, i + len);
        for (const prevStart of seen.get(hash)!) {
          if (s.substring(prevStart, prevStart + len) === curSub) {
            return i;
          }
        }
        seen.get(hash)!.push(i);
      } else {
        seen.set(hash, [i]);
      }
    }

    return -1;
  }

  let left = 1;
  let right = n - 1;
  let bestStart = -1;
  let bestLen = 0;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const start = search(mid);
    if (start !== -1) {
      bestStart = start;
      bestLen = mid;
      left = mid + 1; // Try longer
    } else {
      right = mid - 1; // Try shorter
    }
  }

  return bestStart === -1 ? "" : s.substring(bestStart, bestStart + bestLen);
}

// --- Test Verification ---
console.assert(longestDupSubstring("banana") === "ana", "Test 1 failed");
console.assert(longestDupSubstring("abcd") === "", "Test 2 failed");
