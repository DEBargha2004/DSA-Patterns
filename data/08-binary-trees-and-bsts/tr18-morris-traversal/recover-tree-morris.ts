/**
 * Problem: Recover Binary Search Tree using Morris Traversal
 * Difficulty: Hard
 * Pattern: TR18 - Morris traversal
 *
 * Recover BST in O(1) space using Morris inorder traversal.
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

// --- Optimal Approach (Morris Inorder Traversal - O(1) Space) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function recoverTreeMorris(root: TreeNode | null): void {
  let first: TreeNode | null = null;
  let second: TreeNode | null = null;
  let prev: TreeNode | null = null;
  let curr = root;

  while (curr) {
    if (!curr.left) {
      if (prev && prev.val > curr.val) {
        if (!first) first = prev;
        second = curr;
      }
      prev = curr;
      curr = curr.right;
    } else {
      let pred = curr.left;
      while (pred.right && pred.right !== curr) {
        pred = pred.right;
      }

      if (!pred.right) {
        pred.right = curr;
        curr = curr.left;
      } else {
        pred.right = null;
        if (prev && prev.val > curr.val) {
          if (!first) first = prev;
          second = curr;
        }
        prev = curr;
        curr = curr.right;
      }
    }
  }

  if (first && second) {
    const temp: number = (first as TreeNode).val;
    (first as TreeNode).val = (second as TreeNode).val;
    (second as TreeNode).val = temp;
  }
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(1), new TreeNode(4, new TreeNode(2), null));
recoverTreeMorris(tree);
console.assert(tree.val === 2 && tree.right?.left?.val === 3, "Test 1 failed");
