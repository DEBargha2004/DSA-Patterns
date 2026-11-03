/**
 * Problem: Validate Binary Search Tree (LeetCode 98)
 * Difficulty: Medium
 * Pattern: TR14 - BST validation
 *
 * Determine if a given binary tree is a valid BST.
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

// --- Optimal Approach (DFS with Valid Range [low, high]) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, low: number, high: number): boolean {
    if (!node) return true;
    if (node.val <= low || node.val >= high) return false;
    return validate(node.left, low, node.val) && validate(node.right, node.val, high);
  }

  return validate(root, -Infinity, Infinity);
}

// --- Test Verification ---
const valid = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.assert(isValidBST(valid) === true, "Test 1 failed");

const invalid = new TreeNode(5, new TreeNode(1), new TreeNode(4, new TreeNode(3), new TreeNode(6)));
console.assert(isValidBST(invalid) === false, "Test 2 failed");
