/**
 * Problem: Merge Two Binary Trees (LeetCode 617)
 * Difficulty: Easy
 * Pattern: TR3 - Recursive tree DFS
 *
 * Merge two binary trees by summing overlapping node values.
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

// --- Optimal Approach (Simultaneous Tree DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1) return root2;
  if (!root2) return root1;

  const merged = new TreeNode(root1.val + root2.val);
  merged.left = mergeTrees(root1.left, root2.left);
  merged.right = mergeTrees(root1.right, root2.right);

  return merged;
}

// --- Test Verification ---
const t1 = new TreeNode(1, new TreeNode(3, new TreeNode(5)), new TreeNode(2));
const t2 = new TreeNode(2, new TreeNode(1, null, new TreeNode(4)), new TreeNode(3, null, new TreeNode(7)));
const merged = mergeTrees(t1, t2);
console.assert(merged!.val === 3 && merged!.left!.val === 4 && merged!.right!.val === 5, "Test 1 failed");
