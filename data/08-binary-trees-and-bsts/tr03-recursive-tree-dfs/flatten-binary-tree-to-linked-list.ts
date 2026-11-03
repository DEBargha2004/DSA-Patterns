/**
 * Problem: Flatten Binary Tree to Linked List (LeetCode 114)
 * Difficulty: Medium
 * Pattern: TR3 - Recursive tree DFS
 *
 * Flatten tree into a single right-leaning linked list following preorder sequence.
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

// --- Optimal Approach (Morris-like / O(1) space pointer rewiring) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function flatten(root: TreeNode | null): void {
  let curr = root;

  while (curr) {
    if (curr.left) {
      let rightmost = curr.left;
      while (rightmost.right) {
        rightmost = rightmost.right;
      }
      rightmost.right = curr.right;
      curr.right = curr.left;
      curr.left = null;
    }
    curr = curr.right;
  }
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, new TreeNode(3), new TreeNode(4)), new TreeNode(5, null, new TreeNode(6)));
flatten(tree);
console.assert(tree.left === null && tree.right!.val === 2, "Test 1 failed");
console.assert(tree.right!.right!.val === 3, "Test 2 failed");
