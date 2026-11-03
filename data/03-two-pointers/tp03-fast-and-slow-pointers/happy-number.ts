/**
 * Problem: Happy Number (LeetCode 202)
 * Difficulty: Easy
 * Pattern: TP3 - Fast and slow pointers
 *
 * Determine if number n reaches 1 when repeatedly replacing it with the sum of squares of its digits.
 */

// --- Optimal Approach (Cycle Detection via Fast & Slow) ---
// Time Complexity: O(log n)
// Space Complexity: O(1)
export function isHappy(n: number): boolean {
  function getNext(num: number): number {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
}

// --- Test Verification ---
console.assert(isHappy(19) === true, "Test 1 failed");
console.assert(isHappy(2) === false, "Test 2 failed");
