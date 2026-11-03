/**
 * Problem: Count Complete Tree Nodes (LeetCode 222)
 * Difficulty: Medium
 * Pattern: TR6 - Balanced-tree validation
 *
 * Count nodes in complete binary tree in less than O(n) time.
 */

export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// --- Optimal Approach (Binary Search over Tree Heights) ---
// Time Complexity: O((log n)^2)
// Space Complexity: O(log n) recursion
export function countNodes(root: TreeNode | null): number {
  if (!root) return 0;

  function leftDepth(node: TreeNode | null): number {
    let d = 0;
    while (node) {
      d++;
      node = node.left;
    }
    return d;
  }

  function rightDepth(node: TreeNode | null): number {
    let d = 0;
    while (node) {
      d++;
      node = node.right;
    }
    return d;
  }

  const ld = leftDepth(root);
  const rd = rightDepth(root);

  if (ld === rd) {
    // Perfect binary tree
    return (1 << ld) - 1;
  }

  return 1 + countNodes(root.left) + countNodes(root.right);
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), null));
console.assert(countNodes(tree) === 6, "Test 1 failed");
console.assert(countNodes(null) === 0, "Test 2 failed");
