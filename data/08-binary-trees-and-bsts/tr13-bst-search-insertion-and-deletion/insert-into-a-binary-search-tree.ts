/**
 * Problem: Insert into a Binary Search Tree (LeetCode 701)
 * Difficulty: Medium
 * Pattern: TR13 - BST search, insertion and deletion
 *
 * Insert a value into a BST preserving BST properties.
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

// --- Optimal Approach (Iterative BST Insertion) ---
// Time Complexity: O(h)
// Space Complexity: O(1)
export function insertIntoBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return new TreeNode(val);

  let curr = root;
  while (true) {
    if (val < curr.val) {
      if (!curr.left) {
        curr.left = new TreeNode(val);
        break;
      }
      curr = curr.left;
    } else {
      if (!curr.right) {
        curr.right = new TreeNode(val);
        break;
      }
      curr = curr.right;
    }
  }

  return root;
}

// --- Test Verification ---
const tree = new TreeNode(4, new TreeNode(2), new TreeNode(7));
insertIntoBST(tree, 5);
console.assert(tree.right?.left?.val === 5, "Test 1 failed");
