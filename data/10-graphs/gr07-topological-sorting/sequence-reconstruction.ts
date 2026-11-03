/**
 * Problem: Sequence Reconstruction (LeetCode 444 analog)
 * Difficulty: Medium
 * Pattern: GR7 - Topological sorting
 *
 * Check whether original sequence org is the unique sequence reconstructed from sequences.
 */

// --- Optimal Approach (Unique Topological Sort / Single Queue Element Check) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)
export function sequenceReconstruction(nums: number[], sequences: number[][]): boolean {
  const n = nums.length;
  const inDegree = new Int32Array(n + 1);
  const adj: Set<number>[] = Array.from({ length: n + 1 }, () => new Set());

  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 1; i++) {
      const u = seq[i];
      const v = seq[i + 1];
      if (!adj[u].has(v)) {
        adj[u].add(v);
        inDegree[v]++;
      }
    }
  }

  const queue: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let idx = 0;
  while (queue.length > 0) {
    if (queue.length > 1) return false; // multiple topological orders possible!

    const u = queue.shift()!;
    if (nums[idx++] !== u) return false;

    for (const v of adj[u]) {
      inDegree[v]--;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  return idx === n;
}

// --- Test Verification ---
console.assert(sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3], [2, 3]]) === true, "Test 1 failed");
console.assert(sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3]]) === false, "Test 2 failed");
