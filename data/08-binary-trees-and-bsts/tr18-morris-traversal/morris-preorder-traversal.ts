/**
 * Problem: Morris Preorder Traversal
 * Difficulty: Hard
 * Pattern: TR18 - Morris traversal
 *
 * Preorder traversal using Morris threading with O(1) auxiliary space.
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

// --- Optimal Approach (Morris Preorder Traversal) ---
// Time Complexity: O(n)
// Space Complexity: O(1) auxiliary space
export function morrisPreorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  let curr = root;

  while (curr) {
    if (!curr.left) {
      result.push(curr.val);
      curr = curr.right;
    } else {
      let pred = curr.left;
      while (pred.right && pred.right !== curr) {
        pred = pred.right;
      }

      if (!pred.right) {
        result.push(curr.val); // visit before going to left subtree
        pred.right = curr;
        curr = curr.left;
      } else {
        pred.right = null;
        curr = curr.right;
      }
    }
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3));
console.assert(JSON.stringify(morrisPreorder(tree)) === JSON.stringify([1, 2, 4, 5, 3]), "Test 1 failed");
