/**
 * Problem: Maximum Depth of Binary Tree (LeetCode 104)
 * Difficulty: Easy
 * Pattern: TR4 - Tree height and depth
 *
 * Find maximum depth from root down to furthest leaf node.
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

// --- Optimal Approach (DFS Post-order Height) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(maxDepth(tree) === 3, "Test 1 failed");
console.assert(maxDepth(null) === 0, "Test 2 failed");
