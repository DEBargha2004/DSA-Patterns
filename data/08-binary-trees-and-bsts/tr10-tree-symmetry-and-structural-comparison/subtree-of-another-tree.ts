/**
 * Problem: Subtree of Another Tree (LeetCode 572)
 * Difficulty: Easy
 * Pattern: TR10 - Tree symmetry and structural comparison
 *
 * Return true if subRoot is a subtree of root.
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

function isIdentical(a: TreeNode | null, b: TreeNode | null): boolean {
  if (!a && !b) return true;
  if (!a || !b || a.val !== b.val) return false;
  return isIdentical(a.left, b.left) && isIdentical(a.right, b.right);
}

// --- Optimal Approach (DFS Matching) ---
// Time Complexity: O(n * m) worst-case
// Space Complexity: O(h)
export function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  if (!root) return false;
  if (isIdentical(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}

// --- Test Verification ---
const sub = new TreeNode(2, new TreeNode(4), new TreeNode(5));
const tree = new TreeNode(1, sub, new TreeNode(3));
console.assert(isSubtree(tree, sub) === true, "Test 1 failed");
console.assert(isSubtree(tree, new TreeNode(99)) === false, "Test 2 failed");
