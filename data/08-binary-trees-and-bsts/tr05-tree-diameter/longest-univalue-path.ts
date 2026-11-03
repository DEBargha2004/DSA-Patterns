/**
 * Problem: Longest Univalue Path (LeetCode 687)
 * Difficulty: Medium
 * Pattern: TR5 - Tree diameter
 *
 * Return length of longest path where each node has the same value.
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

// --- Optimal Approach (Bottom-up DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function longestUnivaluePath(root: TreeNode | null): number {
  let maxPath = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;

    const leftLen = dfs(node.left);
    const rightLen = dfs(node.right);

    let leftArrow = 0;
    let rightArrow = 0;

    if (node.left && node.left.val === node.val) {
      leftArrow = leftLen + 1;
    }
    if (node.right && node.right.val === node.val) {
      rightArrow = rightLen + 1;
    }

    maxPath = Math.max(maxPath, leftArrow + rightArrow);
    return Math.max(leftArrow, rightArrow);
  }

  dfs(root);
  return maxPath;
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(4, new TreeNode(1), new TreeNode(1)), new TreeNode(5, null, new TreeNode(5)));
console.assert(longestUnivaluePath(tree) === 2, "Test 1 failed");
console.assert(longestUnivaluePath(null) === 0, "Test 2 failed");
