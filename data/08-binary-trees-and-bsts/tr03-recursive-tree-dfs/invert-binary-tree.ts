/**
 * Problem: Invert Binary Tree (LeetCode 226)
 * Difficulty: Easy
 * Pattern: TR3 - Recursive tree DFS
 *
 * Invert binary tree and return its root.
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

// --- Optimal Approach (Post-order / DFS Recursion) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);

  root.left = right;
  root.right = left;

  return root;
}

// --- Test Verification ---
const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7, new TreeNode(6), new TreeNode(9)));
invertTree(tree);
console.assert(tree.left!.val === 7 && tree.right!.val === 2, "Test 1 failed");
console.assert(tree.left!.left!.val === 9 && tree.right!.right!.val === 1, "Test 2 failed");
