/**
 * Problem: Binary Tree Zigzag Level Order Traversal (LeetCode 103)
 * Difficulty: Medium
 * Pattern: TR2 - Level-order BFS
 *
 * Return zigzag level order traversal (left-to-right, then right-to-left alternate).
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

// --- Optimal Approach (Queue BFS with Left-to-Right Toggle) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function zigzagLevelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  const result: number[][] = [];
  const queue: TreeNode[] = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const size = queue.length;
    const level: number[] = new Array(size);

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      const idx = leftToRight ? i : size - 1 - i;
      level[idx] = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(JSON.stringify(zigzagLevelOrder(tree)) === JSON.stringify([[3], [20, 9], [15, 7]]), "Test 1 failed");
