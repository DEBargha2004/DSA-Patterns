/**
 * Problem: Inorder Successor in BST (LeetCode 285)
 * Difficulty: Medium
 * Pattern: TR16 - BST predecessor and successor
 *
 * Find in-order successor of a given node p in BST.
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

// --- Optimal Approach (Binary Search Navigation - O(h)) ---
// Time Complexity: O(h)
// Space Complexity: O(1)
export function inorderSuccessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  let successor: TreeNode | null = null;
  let curr = root;

  while (curr) {
    if (p.val < curr.val) {
      successor = curr;
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }

  return successor;
}

// --- Test Verification ---
const p = new TreeNode(1);
const tree = new TreeNode(2, p, new TreeNode(3));
console.assert(inorderSuccessor(tree, p)?.val === 2, "Test 1 failed");
