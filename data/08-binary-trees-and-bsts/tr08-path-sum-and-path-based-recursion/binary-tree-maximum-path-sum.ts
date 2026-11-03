/**
 * Problem: Binary Tree Maximum Path Sum (LeetCode 124)
 * Difficulty: Hard
 * Pattern: TR8 - Path sum and path-based recursion
 *
 * Find maximum path sum between any two nodes.
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

// --- Optimal Approach (Bottom-up DFS with Global Max) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function maxPathSum(root: TreeNode | null): number {
  let maxSum = -Infinity;

  function maxGain(node: TreeNode | null): number {
    if (!node) return 0;

    // Discard negative gains
    const leftGain = Math.max(0, maxGain(node.left));
    const rightGain = Math.max(0, maxGain(node.right));

    // Path passing through this node as highest point
    const currentPathSum = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, currentPathSum);

    // Return max single branch extension
    return node.val + Math.max(leftGain, rightGain);
  }

  maxGain(root);
  return maxSum;
}

// --- Test Verification ---
const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.assert(maxPathSum(tree1) === 6, "Test 1 failed");

const tree2 = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(maxPathSum(tree2) === 42, "Test 2 failed");
