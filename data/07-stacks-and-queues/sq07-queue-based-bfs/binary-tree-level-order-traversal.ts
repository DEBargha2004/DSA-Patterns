/**
 * Problem: Binary Tree Level Order Traversal (LeetCode 102)
 * Difficulty: Medium
 * Pattern: SQ7 - Queue-based BFS
 *
 * Given root of binary tree, return level order traversal of node values.
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

// --- Optimal Approach (Queue BFS) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(JSON.stringify(levelOrder(tree)) === JSON.stringify([[3], [9, 20], [15, 7]]), "Test 1 failed");
console.assert(JSON.stringify(levelOrder(null)) === JSON.stringify([]), "Test 2 failed");
