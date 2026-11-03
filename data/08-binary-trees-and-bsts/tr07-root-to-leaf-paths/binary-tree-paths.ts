/**
 * Problem: Binary Tree Paths (LeetCode 257)
 * Difficulty: Easy
 * Pattern: TR7 - Root-to-leaf paths
 *
 * Given root, return all root-to-leaf paths formatted as "1->2->5".
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

// --- Optimal Approach (Backtracking / Pre-order DFS) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function binaryTreePaths(root: TreeNode | null): string[] {
  if (!root) return [];
  const paths: string[] = [];

  function dfs(node: TreeNode, path: string): void {
    path += node.val;
    if (!node.left && !node.right) {
      paths.push(path);
      return;
    }
    if (node.left) dfs(node.left, path + "->");
    if (node.right) dfs(node.right, path + "->");
  }

  dfs(root, "");
  return paths;
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3));
console.assert(JSON.stringify(binaryTreePaths(tree)) === JSON.stringify(["1->2->5", "1->3"]), "Test 1 failed");
