/**
 * Problem: Binary Tree Preorder Traversal (LeetCode 144)
 * Difficulty: Easy
 * Pattern: TR1 - Preorder, inorder and postorder traversal
 *
 * Given root of a binary tree, return preorder traversal of values.
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

// --- Optimal Approach (Iterative Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function preorderTraversal(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.val);

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.assert(JSON.stringify(preorderTraversal(tree)) === JSON.stringify([1, 2, 3]), "Test 1 failed");
console.assert(JSON.stringify(preorderTraversal(null)) === JSON.stringify([]), "Test 2 failed");
