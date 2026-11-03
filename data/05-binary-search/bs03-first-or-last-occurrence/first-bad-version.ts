/**
 * Problem: First Bad Version (LeetCode 278)
 * Difficulty: Easy
 * Pattern: BS3 - First or last occurrence
 *
 * Find first bad version using isBadVersion(version) API.
 */

export function solution(isBadVersion: (version: number) => boolean) {
  return function (n: number): number {
    let left = 1;
    let right = n;
    let firstBad = n;

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      if (isBadVersion(mid)) {
        firstBad = mid;
        right = mid - 1; // Look left for earlier bad versions
      } else {
        left = mid + 1;
      }
    }

    return firstBad;
  };
}

// --- Test Verification ---
const checker = (v: number) => v >= 4;
console.assert(solution(checker)(5) === 4, "Test failed");
