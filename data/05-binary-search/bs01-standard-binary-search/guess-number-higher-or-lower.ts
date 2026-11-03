/**
 * Problem: Guess Number Higher or Lower (LeetCode 374)
 * Difficulty: Easy
 * Pattern: BS1 - Standard binary search
 *
 * Guess target number between 1 and n using guess(mid) API.
 */

export function guessNumber(n: number, pick: number): number {
  const guess = (num: number): number => {
    if (num > pick) return -1;
    if (num < pick) return 1;
    return 0;
  };

  let left = 1;
  let right = n;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const res = guess(mid);
    if (res === 0) return mid;
    else if (res === -1) right = mid - 1;
    else left = mid + 1;
  }

  return -1;
}

// --- Test Verification ---
console.assert(guessNumber(10, 6) === 6, "Test 1 failed");
console.assert(guessNumber(1, 1) === 1, "Test 2 failed");
