/**
 * Problem: Construct String from Binary Tree (LeetCode 606)
 * Difficulty: Medium
 * Pattern: TR17 - Serialize and deserialize a tree
 *
 * Construct string consisting of parenthesis and integers from binary tree with 1-to-1 mapping.
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

// --- Optimal Approach (Pre-order DFS with conditional parentheses) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function tree2str(root: TreeNode | null): string {
  if (!root) return "";

  let result = String(root.val);

  if (root.left || root.right) {
    result += `(${tree2str(root.left)})`;
  }
  if (root.right) {
    result += `(${tree2str(root.right)})`;
  }

  return result;
}

// --- Test Verification ---
const t1 = new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3));
console.assert(tree2str(t1) === "1(2(4))(3)", "Test 1 failed");

const t2 = new TreeNode(1, new TreeNode(2, null, new TreeNode(4)), new TreeNode(3));
console.assert(tree2str(t2) === "1(2()(4))(3)", "Test 2 failed");
