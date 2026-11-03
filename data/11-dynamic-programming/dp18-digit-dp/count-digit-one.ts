/**
 * Problem: Number of Digit One (LeetCode 233)
 * Difficulty: Hard
 * Pattern: DP18 - Digit DP
 *
 * Count total number of digit 1 appearing in all non-negative integers <= n.
 */

// --- Optimal Approach (Digit Position Contribution) ---
// Count occurrences of 1 at each place value (units, tens, hundreds...)
// Time Complexity: O(log10(n))
// Space Complexity: O(1)
export function countDigitOne(n: number): number {
  let count = 0;
  let place = 1;

  while (place <= n) {
    const higher = Math.floor(n / (place * 10));
    const current = Math.floor((n / place) % 10);
    const lower = n % place;

    if (current === 0) {
      count += higher * place;
    } else if (current === 1) {
      count += higher * place + (lower + 1);
    } else {
      count += (higher + 1) * place;
    }

    place *= 10;
  }

  return count;
}

// --- Test Verification ---
console.assert(countDigitOne(13) === 6, "Test 1 failed (1, 10, 11, 12, 13 contains six 1s)");
console.assert(countDigitOne(0) === 0, "Test 2 failed");
