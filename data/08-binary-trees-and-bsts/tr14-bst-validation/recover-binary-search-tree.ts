/**
 * Problem: Recover Binary Search Tree (LeetCode 99)
 * Difficulty: Medium
 * Pattern: TR14 - BST validation
 *
 * Two elements of a BST were swapped by mistake. Recover the tree without changing structure.
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

// --- Optimal Approach (Inorder Traversal detecting swapped pairs) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function recoverTree(root: TreeNode | null): void {
  let first: TreeNode | null = null;
  let second: TreeNode | null = null;
  let prev: TreeNode | null = null;

  function inorder(node: TreeNode | null): void {
    if (!node) return;
    inorder(node.left);

    if (prev && prev.val > node.val) {
      if (!first) {
        first = prev;
      }
      second = node;
    }
    prev = node;

    inorder(node.right);
  }

  inorder(root);

  if (first && second) {
    const temp: number = (first as TreeNode).val;
    (first as TreeNode).val = (second as TreeNode).val;
    (second as TreeNode).val = temp;
  }
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(3, null, new TreeNode(2)), null);
recoverTree(tree);
console.assert(tree.val === 3 && tree.left?.val === 1, "Test 1 failed");
