/**
 * Problem: Diameter of N-ary Tree (LeetCode 1522 analog)
 * Difficulty: Medium
 * Pattern: TR5 - Tree diameter
 *
 * Return diameter of an N-ary tree.
 */

export class NodeNary {
  val: number;
  children: NodeNary[];
  constructor(val?: number, children?: NodeNary[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

// --- Optimal Approach (Top 2 Maximum Heights DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function diameterOfNaryTree(root: NodeNary | null): number {
  let diameter = 0;

  function height(node: NodeNary | null): number {
    if (!node) return 0;

    let max1 = 0;
    let max2 = 0;

    for (const child of node.children) {
      const h = height(child);
      if (h > max1) {
        max2 = max1;
        max1 = h;
      } else if (h > max2) {
        max2 = h;
      }
    }

    diameter = Math.max(diameter, max1 + max2);
    return 1 + max1;
  }

  height(root);
  return diameter;
}

// --- Test Verification ---
const tree = new NodeNary(1, [
  new NodeNary(3, [new NodeNary(5), new NodeNary(6)]),
  new NodeNary(2),
  new NodeNary(4)
]);
console.assert(diameterOfNaryTree(tree) === 3, "Test 1 failed");
