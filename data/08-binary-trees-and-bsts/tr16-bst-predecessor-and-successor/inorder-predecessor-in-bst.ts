/**
 * Problem: Inorder Predecessor in BST
 * Difficulty: Medium
 * Pattern: TR16 - BST predecessor and successor
 *
 * Find in-order predecessor of a given node p in BST.
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
export function inorderPredecessor(root: TreeNode | null, p: TreeNode): TreeNode | null {
  let predecessor: TreeNode | null = null;
  let curr = root;

  while (curr) {
    if (p.val > curr.val) {
      predecessor = curr;
      curr = curr.right;
    } else {
      curr = curr.left;
    }
  }

  return predecessor;
}

// --- Test Verification ---
const p = new TreeNode(3);
const tree = new TreeNode(2, new TreeNode(1), p);
console.assert(inorderPredecessor(tree, p)?.val === 2, "Test 1 failed");
