/**
 * Problem: Balanced Binary Tree (LeetCode 110)
 * Difficulty: Easy
 * Pattern: TR6 - Balanced-tree validation
 *
 * Determine if binary tree is height-balanced.
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

// --- Optimal Approach (Bottom-up DFS with Early Pruning - O(n)) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function isBalanced(root: TreeNode | null): boolean {
  function checkHeight(node: TreeNode | null): number {
    if (!node) return 0;

    const left = checkHeight(node.left);
    if (left === -1) return -1;

    const right = checkHeight(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  }

  return checkHeight(root) !== -1;
}

// --- Test Verification ---
const t1 = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(isBalanced(t1) === true, "Test 1 failed");

const t2 = new TreeNode(1, new TreeNode(2, new TreeNode(3, new TreeNode(4), new TreeNode(4)), new TreeNode(3)), new TreeNode(2));
console.assert(isBalanced(t2) === false, "Test 2 failed");
