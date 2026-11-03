/**
 * Problem: Delete Node in a BST (LeetCode 450)
 * Difficulty: Medium
 * Pattern: TR13 - BST search, insertion and deletion
 *
 * Delete a node with given key in BST and return new root.
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

// --- Optimal Approach (Recursive Deletion with Inorder Successor Replacement) ---
// Time Complexity: O(h)
// Space Complexity: O(h)
export function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Node to delete found:
    // Case 1: Leaf or single child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 2: Two children -> find inorder successor (min in right subtree)
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6, null, new TreeNode(7)));
const newRoot = deleteNode(tree, 3);
console.assert(newRoot?.left?.val === 4, "Test 1 failed");
