/**
 * Problem: Check Completeness of a Binary Tree (LeetCode 958)
 * Difficulty: Medium
 * Pattern: TR6 - Balanced-tree validation
 *
 * Determine if a binary tree is complete (every level fully filled except possibly last).
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

// --- Optimal Approach (BFS tracking first null node) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function isCompleteTree(root: TreeNode | null): boolean {
  if (!root) return true;
  const queue: (TreeNode | null)[] = [root];
  let seenNull = false;

  while (queue.length > 0) {
    const node = queue.shift()!;
    if (node === null) {
      seenNull = true;
    } else {
      if (seenNull) {
        return false; // encountered non-null after null
      }
      queue.push(node.left);
      queue.push(node.right);
    }
  }

  return true;
}

// --- Test Verification ---
const tree1 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, new TreeNode(6), null));
console.assert(isCompleteTree(tree1) === true, "Test 1 failed");

const tree2 = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3, null, new TreeNode(7)));
console.assert(isCompleteTree(tree2) === false, "Test 2 failed");
