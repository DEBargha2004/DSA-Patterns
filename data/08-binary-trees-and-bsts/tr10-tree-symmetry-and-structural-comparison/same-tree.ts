/**
 * Problem: Same Tree (LeetCode 100)
 * Difficulty: Easy
 * Pattern: TR10 - Tree symmetry and structural comparison
 *
 * Given roots of two binary trees p and q, check if they are the same.
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

// --- Optimal Approach (Recursive Structural Comparison) ---
// Time Complexity: O(min(n, m))
// Space Complexity: O(min(h1, h2))
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}

// --- Test Verification ---
const t1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const t2 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
console.assert(isSameTree(t1, t2) === true, "Test 1 failed");
console.assert(isSameTree(t1, new TreeNode(1, null, new TreeNode(2))) === false, "Test 2 failed");
