/**
 * Problem: Lowest Common Ancestor of a Binary Search Tree (LeetCode 235)
 * Difficulty: Medium
 * Pattern: TR9 - Lowest common ancestor
 *
 * Find LCA of two nodes in a BST.
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

// --- Optimal Approach (Iterative BST Split Search) ---
// Time Complexity: O(h)
// Space Complexity: O(1)
export function lowestCommonAncestorBST(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  let curr = root;

  while (curr) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } else {
      return curr; // split point is the LCA
    }
  }

  return null;
}

// --- Test Verification ---
const n2 = new TreeNode(2);
const n8 = new TreeNode(8);
const root = new TreeNode(6, n2, n8);
console.assert(lowestCommonAncestorBST(root, n2, n8) === root, "Test 1 failed");
