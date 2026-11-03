/**
 * Problem: Happy Number (LeetCode 202)
 * Difficulty: Easy
 * Pattern: LL4 - Cycle detection
 *
 * Check if digit square sum sequence reaches 1 or falls into cycle.
 */

// --- Optimal Approach (Cycle Detection) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function isHappy(n: number): boolean {
  const getSum = (num: number) => {
    let s = 0;
    while (num > 0) {
      const d = num % 10;
      s += d * d;
      num = Math.floor(num / 10);
    }
    return s;
  };

  let slow = n;
  let fast = getSum(n);

  while (fast !== 1 && slow !== fast) {
    slow = getSum(slow);
    fast = getSum(getSum(fast));
  }

  return fast === 1;
}

// --- Test Verification ---
console.assert(isHappy(19) === true, "Test 1 failed");
console.assert(isHappy(2) === false, "Test 2 failed");
