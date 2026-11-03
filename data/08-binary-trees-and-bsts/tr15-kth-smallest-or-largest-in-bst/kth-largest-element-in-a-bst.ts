/**
 * Problem: Kth Largest Element in a BST
 * Difficulty: Medium
 * Pattern: TR15 - Kth smallest or largest in BST
 *
 * Find kth largest value (1-indexed) in BST.
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

// --- Optimal Approach (Reverse Inorder Traversal: Right -> Root -> Left) ---
// Time Complexity: O(h + k)
// Space Complexity: O(h)
export function kthLargest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let curr = root;

  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.right;
    }
    curr = stack.pop()!;
    k--;
    if (k === 0) {
      return curr.val;
    }
    curr = curr.left;
  }

  return -1;
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6));
console.assert(kthLargest(tree, 1) === 6, "Test 1 failed");
console.assert(kthLargest(tree, 3) === 4, "Test 2 failed");
