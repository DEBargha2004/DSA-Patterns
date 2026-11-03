/**
 * Problem: Symmetric Tree (LeetCode 101)
 * Difficulty: Easy
 * Pattern: TR10 - Tree symmetry and structural comparison
 *
 * Check whether a binary tree is a mirror of itself.
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

// --- Optimal Approach (Recursive Mirror Comparison) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function isSymmetric(root: TreeNode | null): boolean {
  if (!root) return true;

  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
    if (!t1 && !t2) return true;
    if (!t1 || !t2) return false;
    return t1.val === t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);
  }

  return isMirror(root.left, root.right);
}

// --- Test Verification ---
const symTree = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(4), new TreeNode(3)));
console.assert(isSymmetric(symTree) === true, "Test 1 failed");

const asymTree = new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), new TreeNode(2, null, new TreeNode(3)));
console.assert(isSymmetric(asymTree) === false, "Test 2 failed");
