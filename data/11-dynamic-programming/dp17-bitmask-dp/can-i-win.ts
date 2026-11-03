/**
 * Problem: Can I Win (LeetCode 464)
 * Difficulty: Medium
 * Pattern: DP17 - Bitmask DP
 *
 * Determine if first player can force a win in Game of Sum choosing from 1...maxChoosableInteger.
 */

// --- Optimal Approach (Minimax with Bitmask DP) ---
// Time Complexity: O(2^maxChoosableInteger)
// Space Complexity: O(2^maxChoosableInteger)
export function canIWin(maxChoosableInteger: number, desiredTotal: number): boolean {
  const sumTotal = (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;
  if (sumTotal < desiredTotal) return false;
  if (desiredTotal <= 0) return true;

  const memo = new Map<number, boolean>();

  function canWin(mask: number, currentTotal: number): boolean {
    if (memo.has(mask)) return memo.get(mask)!;

    for (let i = 1; i <= maxChoosableInteger; i++) {
      if ((mask & (1 << i)) === 0) {
        if (currentTotal + i >= desiredTotal || !canWin(mask | (1 << i), currentTotal + i)) {
          memo.set(mask, true);
          return true;
        }
      }
    }

    memo.set(mask, false);
    return false;
  }

  return canWin(0, 0);
}

// --- Test Verification ---
console.assert(canIWin(10, 11) === false, "Test 1 failed");
console.assert(canIWin(10, 0) === true, "Test 2 failed");
console.assert(canIWin(10, 1) === true, "Test 3 failed");
