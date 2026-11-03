/**
 * Problem: Lowest Common Ancestor of a Binary Tree (LeetCode 236)
 * Difficulty: Medium
 * Pattern: TR9 - Lowest common ancestor
 *
 * Find LCA of two nodes p and q in binary tree.
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

// --- Optimal Approach (Bottom-up Recursive DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  if (!root || root === p || root === q) {
    return root;
  }

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) {
    return root; // p and q are in different subtrees
  }

  return left ?? right;
}

// --- Test Verification ---
const p = new TreeNode(5);
const q = new TreeNode(1);
const root = new TreeNode(3, p, q);
console.assert(lowestCommonAncestor(root, p, q) === root, "Test 1 failed");
