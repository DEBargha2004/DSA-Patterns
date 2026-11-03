/**
 * Problem: Search in a Binary Search Tree (LeetCode 700)
 * Difficulty: Easy
 * Pattern: TR13 - BST search, insertion and deletion
 *
 * Find node with value val in BST and return subtree rooted with that node.
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

// --- Optimal Approach (Iterative BST Navigation) ---
// Time Complexity: O(h)
// Space Complexity: O(1)
export function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  let curr = root;
  while (curr) {
    if (curr.val === val) return curr;
    curr = val < curr.val ? curr.left : curr.right;
  }
  return null;
}

// --- Test Verification ---
const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(7));
console.assert(searchBST(tree, 2)?.val === 2, "Test 1 failed");
console.assert(searchBST(tree, 5) === null, "Test 2 failed");
