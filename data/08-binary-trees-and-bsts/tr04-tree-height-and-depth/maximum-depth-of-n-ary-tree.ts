/**
 * Problem: Maximum Depth of N-ary Tree (LeetCode 559)
 * Difficulty: Easy
 * Pattern: TR4 - Tree height and depth
 *
 * Find maximum depth of an N-ary tree.
 */

export class NodeNary {
  val: number;
  children: NodeNary[];
  constructor(val?: number, children?: NodeNary[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

// --- Optimal Approach (Recursive DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function maxDepthNary(root: NodeNary | null): number {
  if (!root) return 0;
  let maxChildDepth = 0;
  for (const child of root.children) {
    maxChildDepth = Math.max(maxChildDepth, maxDepthNary(child));
  }
  return 1 + maxChildDepth;
}

// --- Test Verification ---
const naryTree = new NodeNary(1, [
  new NodeNary(3, [new NodeNary(5), new NodeNary(6)]),
  new NodeNary(2),
  new NodeNary(4)
]);
console.assert(maxDepthNary(naryTree) === 3, "Test 1 failed");
console.assert(maxDepthNary(null) === 0, "Test 2 failed");
