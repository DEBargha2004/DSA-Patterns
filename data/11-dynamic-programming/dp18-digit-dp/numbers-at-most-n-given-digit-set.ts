/**
 * Problem: Numbers At Most N Given Digit Set (LeetCode 902)
 * Difficulty: Hard
 * Pattern: DP18 - Digit DP
 *
 * Count positive integers <= n formed strictly from given non-zero digits.
 */

// --- Optimal Approach (Digit DP: Smaller length counts + Tight prefix match) ---
// Time Complexity: O(log10(n))
// Space Complexity: O(log10(n))
export function atMostNGivenDigitSet(digits: string[], n: number): number {
  const s = String(n);
  const k = s.length;
  const numDigits = digits.length;
  let total = 0;

  // 1. Numbers with length strictly less than k
  for (let len = 1; len < k; len++) {
    total += Math.pow(numDigits, len);
  }

  // 2. Numbers with exact length k (tight prefix matching)
  for (let i = 0; i < k; i++) {
    let hasSame = false;
    for (const d of digits) {
      if (d < s[i]) {
        total += Math.pow(numDigits, k - i - 1);
      } else if (d === s[i]) {
        hasSame = true;
      }
    }
    if (!hasSame) return total;
  }

  return total + 1; // include n itself
}

// --- Test Verification ---
console.assert(atMostNGivenDigitSet(["1", "3", "5", "7"], 100) === 20, "Test 1 failed");
console.assert(atMostNGivenDigitSet(["1", "4", "9"], 1000000000) === 29523, "Test 2 failed");
console.assert(atMostNGivenDigitSet(["7"], 8) === 1, "Test 3 failed");
