/**
 * Problem: Diameter of Binary Tree (LeetCode 543)
 * Difficulty: Easy
 * Pattern: TR5 - Tree diameter
 *
 * Length of longest path between any two nodes in a tree.
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

// --- Optimal Approach (Bottom-up DFS calculating height & updating diameter) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function diameterOfBinaryTree(root: TreeNode | null): number {
  let diameter = 0;

  function height(node: TreeNode | null): number {
    if (!node) return 0;
    const lh = height(node.left);
    const rh = height(node.right);
    diameter = Math.max(diameter, lh + rh);
    return 1 + Math.max(lh, rh);
  }

  height(root);
  return diameter;
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
console.assert(diameterOfBinaryTree(tree) === 3, "Test 1 failed");
console.assert(diameterOfBinaryTree(new TreeNode(1, new TreeNode(2))) === 1, "Test 2 failed");
