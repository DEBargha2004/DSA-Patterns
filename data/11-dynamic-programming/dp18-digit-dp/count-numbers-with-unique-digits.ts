/**
 * Problem: Count Numbers with Unique Digits (LeetCode 357)
 * Difficulty: Medium
 * Pattern: DP18 - Digit DP
 *
 * Count numbers with unique digits in range 0 <= x < 10^n.
 */

// --- Optimal Approach (Combinatorial Digit DP) ---
// Length 1: 10 (0..9)
// Length 2: 9 * 9 = 81
// Length 3: 9 * 9 * 8 = 648
// Time Complexity: O(n)
// Space Complexity: O(1)
export function countNumbersWithUniqueDigits(n: number): number {
  if (n === 0) return 1;
  if (n === 1) return 10;

  let total = 10;
  let uniqueChoices = 9;
  let currentUnique = 9;

  for (let i = 2; i <= Math.min(n, 10); i++) {
    currentUnique *= (11 - i);
    total += currentUnique;
  }

  return total;
}

// --- Test Verification ---
console.assert(countNumbersWithUniqueDigits(2) === 91, "Test 1 failed");
console.assert(countNumbersWithUniqueDigits(0) === 1, "Test 2 failed");
console.assert(countNumbersWithUniqueDigits(1) === 10, "Test 3 failed");
