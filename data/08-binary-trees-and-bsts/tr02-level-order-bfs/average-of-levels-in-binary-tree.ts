/**
 * Problem: Average of Levels in Binary Tree (LeetCode 637)
 * Difficulty: Easy
 * Pattern: TR2 - Level-order BFS
 *
 * Return average value of nodes on each level in binary tree.
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

// --- Optimal Approach (Level-Order BFS) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function averageOfLevels(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    let sum = 0;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(sum / size);
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(JSON.stringify(averageOfLevels(tree)) === JSON.stringify([3, 14.5, 11]), "Test 1 failed");
