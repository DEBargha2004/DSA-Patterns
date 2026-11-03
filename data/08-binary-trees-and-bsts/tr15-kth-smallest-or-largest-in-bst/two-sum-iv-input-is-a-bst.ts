/**
 * Problem: Two Sum IV - Input is a BST (LeetCode 653)
 * Difficulty: Easy
 * Pattern: TR15 - Kth smallest or largest in BST
 *
 * Return true if two elements in BST sum to k.
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

// --- Optimal Approach (Two-Pointer Inorder Iterators / Set Lookup) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function findTarget(root: TreeNode | null, k: number): boolean {
  const seen = new Set<number>();

  function dfs(node: TreeNode | null): boolean {
    if (!node) return false;
    if (seen.has(k - node.val)) return true;
    seen.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }

  return dfs(root);
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6, null, new TreeNode(7)));
console.assert(findTarget(tree, 9) === true, "Test 1 failed (5 + 4 or 2 + 7 = 9)");
console.assert(findTarget(tree, 28) === false, "Test 2 failed");
