/**
 * Problem: Minimum Absolute Difference in BST (LeetCode 530)
 * Difficulty: Easy
 * Pattern: TR14 - BST validation
 *
 * Return minimum absolute difference between values of any two different nodes in BST.
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

// --- Optimal Approach (Inorder Traversal with Prev Value Tracking) ---
// Inorder traversal of BST visits nodes in strictly ascending order.
// Time Complexity: O(n)
// Space Complexity: O(h)
export function getMinimumDifference(root: TreeNode | null): number {
  let minDiff = Infinity;
  let prev = -Infinity;

  function inorder(node: TreeNode | null): void {
    if (!node) return;
    inorder(node.left);

    if (prev !== -Infinity) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;

    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}

// --- Test Verification ---
const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(6));
console.assert(getMinimumDifference(tree) === 1, "Test 1 failed");
