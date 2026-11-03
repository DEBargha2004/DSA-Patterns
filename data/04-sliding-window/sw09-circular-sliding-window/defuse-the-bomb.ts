/**
 * Problem: Defuse the Bomb (LeetCode 1652)
 * Difficulty: Easy
 * Pattern: SW9 - Circular sliding window
 *
 * Decrypt circular array code where each element is replaced by sum of next k (or previous -k) elements.
 */

// --- Optimal Approach (Circular Sliding Window with Modulo) ---
// Time Complexity: O(n)
// Space Complexity: O(1) auxiliary
export function decrypt(code: number[], k: number): number[] {
  const n = code.length;
  const result = new Array<number>(n).fill(0);
  if (k === 0) return result;

  let start = k > 0 ? 1 : n + k;
  let end = k > 0 ? k : n - 1;
  let sum = 0;

  for (let i = start; i <= end; i++) {
    sum += code[i % n];
  }

  for (let i = 0; i < n; i++) {
    result[i] = sum;
    sum -= code[start % n];
    start++;
    end++;
    sum += code[end % n];
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(decrypt([5, 7, 1, 4], 3)) === JSON.stringify([12, 10, 16, 13]), "Test 1 failed");
console.assert(JSON.stringify(decrypt([1, 2, 3, 4], 0)) === JSON.stringify([0, 0, 0, 0]), "Test 2 failed");
