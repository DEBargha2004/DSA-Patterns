/**
 * Problem: Path Sum (LeetCode 112)
 * Difficulty: Easy
 * Pattern: TR8 - Path sum and path-based recursion
 *
 * Determine if tree has a root-to-leaf path summing to targetSum.
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

// --- Optimal Approach (Recursive Subtraction) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false;

  if (!root.left && !root.right) {
    return targetSum === root.val;
  }

  const remainder = targetSum - root.val;
  return hasPathSum(root.left, remainder) || hasPathSum(root.right, remainder);
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))), new TreeNode(8));
console.assert(hasPathSum(tree, 22) === true, "Test 1 failed (5 + 4 + 11 + 2 = 22)");
console.assert(hasPathSum(tree, 100) === false, "Test 2 failed");
console.assert(hasPathSum(null, 0) === false, "Test 3 failed");
