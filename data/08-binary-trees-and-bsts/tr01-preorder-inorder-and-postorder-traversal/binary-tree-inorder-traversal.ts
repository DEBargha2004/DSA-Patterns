/**
 * Problem: Binary Tree Inorder Traversal (LeetCode 94)
 * Difficulty: Easy
 * Pattern: TR1 - Preorder, inorder and postorder traversal
 *
 * Given the root of a binary tree, return the inorder traversal of its nodes' values.
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

// --- Brute Force / Recursive Approach ---
// Time Complexity: O(n)
// Space Complexity: O(h) recursion stack
export function inorderTraversalRecursive(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null): void {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }
  dfs(root);
  return result;
}

// --- Optimal Approach (Iterative Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function inorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr = root;

  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop()!;
    result.push(curr.val);
    curr = curr.right;
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.assert(JSON.stringify(inorderTraversalRecursive(tree)) === JSON.stringify([1, 3, 2]), "Recursive failed");
console.assert(JSON.stringify(inorderTraversal(tree)) === JSON.stringify([1, 3, 2]), "Iterative failed");
console.assert(JSON.stringify(inorderTraversal(null)) === JSON.stringify([]), "Empty failed");
