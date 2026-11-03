/**
 * Problem: Partition Labels (LeetCode 763)
 * Difficulty: Medium
 * Pattern: TP8 - Partitioning around a condition
 *
 * Partition string into as many parts as possible so that each letter appears in at most one part.
 */

// --- Optimal Approach (Last Occurrence Map + Two Pointers Boundary) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - 26 lowercase letters
export function partitionLabels(s: string): number[] {
  const last = new Array<number>(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - aCode] = i;
  }

  const result: number[] = [];
  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - aCode]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(partitionLabels("ababcbacadefegdehijhklij")) === JSON.stringify([9, 7, 8]), "Test 1 failed");
console.assert(JSON.stringify(partitionLabels("eccbbbbdec")) === JSON.stringify([10]), "Test 2 failed");
