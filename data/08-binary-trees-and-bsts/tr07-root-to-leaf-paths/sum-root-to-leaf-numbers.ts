/**
 * Problem: Sum Root to Leaf Numbers (LeetCode 129)
 * Difficulty: Medium
 * Pattern: TR7 - Root-to-leaf paths
 *
 * Return total sum of all root-to-leaf numbers formed by node digits.
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

// --- Optimal Approach (DFS Accumulating Base-10 Numbers) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function sumNumbers(root: TreeNode | null): number {
  function dfs(node: TreeNode | null, currentSum: number): number {
    if (!node) return 0;
    currentSum = currentSum * 10 + node.val;
    if (!node.left && !node.right) {
      return currentSum;
    }
    return dfs(node.left, currentSum) + dfs(node.right, currentSum);
  }

  return dfs(root, 0);
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.assert(sumNumbers(tree) === 25, "Test 1 failed (12 + 13 = 25)");
