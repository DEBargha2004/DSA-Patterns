/**
 * Pattern: Duplicate avoidance / Partitioning
 * Problem: Palindrome Partitioning (LeetCode 131)
 *
 * Given a string s, partition s such that every substring of the partition is a palindrome.
 * Return all possible palindrome partitionings of s.
 */

// Brute Force: Recursive partitioning checking isPalindrome each step
// Time: O(2^N * N), Space: O(N) call stack
export function partitionBrute(s: string): string[][] {
  const result: string[][] = [];
  const current: string[] = [];

  function isPalindrome(sub: string): boolean {
    let l = 0, r = sub.length - 1;
    while (l < r) {
      if (sub[l++] !== sub[r--]) return false;
    }
    return true;
  }

  function backtrack(start: number): void {
    if (start === s.length) {
      result.push([...current]);
      return;
    }

    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.slice(start, end);
      if (isPalindrome(sub)) {
        current.push(sub);
        backtrack(end);
        current.pop();
      }
    }
  }

  backtrack(0);
  return result;
}

// Optimal: Precomputed 2D DP Palindrome table + Backtracking
// Time: O(2^N * N), Space: O(N^2) DP table + O(N) recursion stack
export function partitionOptimal(s: string): string[][] {
  const n = s.length;
  const isPal: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));

  for (let right = 0; right < n; right++) {
    for (let left = 0; left <= right; left++) {
      if (s[left] === s[right] && (right - left <= 2 || isPal[left + 1][right - 1])) {
        isPal[left][right] = true;
      }
    }
  }

  const result: string[][] = [];
  const current: string[] = [];

  function backtrack(start: number): void {
    if (start === n) {
      result.push([...current]);
      return;
    }

    for (let end = start; end < n; end++) {
      if (isPal[start][end]) {
        current.push(s.slice(start, end + 1));
        backtrack(end + 1);
        current.pop();
      }
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const pp1 = partitionBrute("aab");
const pp2 = partitionOptimal("aab");
if (pp1.length !== 2 || pp2.length !== 2) throw new Error("Expected 2 partitions for 'aab'");
console.log("Palindrome Partitioning passed!");
