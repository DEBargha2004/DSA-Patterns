/**
 * Problem: Kth Ancestor of a Tree Node (LeetCode 1483)
 * Difficulty: Hard
 * Pattern: TR19 - Binary lifting for ancestor queries
 *
 * Query kth ancestor of node in O(log k) using binary lifting table.
 */

// --- Optimal Approach (Binary Lifting Jump Table) ---
// Precomputation: O(n log n)
// Query: O(log k)
// Space Complexity: O(n log n)
export class TreeAncestor {
  private up: number[][];
  private maxPower: number;

  constructor(n: number, parent: number[]) {
    this.maxPower = Math.floor(Math.log2(n)) + 1;
    this.up = Array.from({ length: n }, () => new Array(this.maxPower).fill(-1));

    for (let i = 0; i < n; i++) {
      this.up[i][0] = parent[i];
    }

    for (let j = 1; j < this.maxPower; j++) {
      for (let i = 0; i < n; i++) {
        const mid = this.up[i][j - 1];
        if (mid !== -1) {
          this.up[i][j] = this.up[mid][j - 1];
        }
      }
    }
  }

  getKthAncestor(node: number, k: number): number {
    let curr = node;
    for (let j = 0; j < this.maxPower; j++) {
      if ((k & (1 << j)) !== 0) {
        curr = this.up[curr][j];
        if (curr === -1) break;
      }
    }
    return curr;
  }
}

// --- Test Verification ---
const ta = new TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2]);
console.assert(ta.getKthAncestor(3, 1) === 1, "Test 1 failed");
console.assert(ta.getKthAncestor(5, 2) === 0, "Test 2 failed");
console.assert(ta.getKthAncestor(6, 3) === -1, "Test 3 failed");
