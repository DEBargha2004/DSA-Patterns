/**
 * Problem: Binary Tree Right Side View (LeetCode 199)
 * Difficulty: Medium
 * Pattern: TR2 - Level-order BFS
 *
 * Return values of nodes visible from right side, ordered top to bottom.
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

// --- Optimal Approach (Level-order BFS capturing last element in each level) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      if (i === size - 1) {
        result.push(node.val);
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3, null, new TreeNode(4)));
console.assert(JSON.stringify(rightSideView(tree)) === JSON.stringify([1, 3, 4]), "Test 1 failed");
console.assert(JSON.stringify(rightSideView(null)) === JSON.stringify([]), "Test 2 failed");
