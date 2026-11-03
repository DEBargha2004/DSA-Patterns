/**
 * Problem: Morris Inorder Traversal
 * Difficulty: Hard
 * Pattern: TR18 - Morris traversal
 *
 * Traverse binary tree inorder with O(1) auxiliary space by creating temporary threaded links.
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

// --- Optimal Approach (Morris Inorder Traversal) ---
// Time Complexity: O(n) - each edge is visited at most 2 times
// Space Complexity: O(1) auxiliary space!
export function morrisInorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  let curr = root;

  while (curr) {
    if (!curr.left) {
      result.push(curr.val);
      curr = curr.right;
    } else {
      // Find inorder predecessor
      let pred = curr.left;
      while (pred.right && pred.right !== curr) {
        pred = pred.right;
      }

      if (!pred.right) {
        // Create temporary thread
        pred.right = curr;
        curr = curr.left;
      } else {
        // Remove temporary thread
        pred.right = null;
        result.push(curr.val);
        curr = curr.right;
      }
    }
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.assert(JSON.stringify(morrisInorder(tree)) === JSON.stringify([1, 3, 2]), "Test 1 failed");
