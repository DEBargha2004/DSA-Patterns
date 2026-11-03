/**
 * Problem: Minimum Depth of Binary Tree (LeetCode 111)
 * Difficulty: Easy
 * Pattern: TR4 - Tree height and depth
 *
 * Find minimum depth from root to nearest leaf node.
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

// --- Optimal Approach (BFS Early Termination) ---
// Time Complexity: O(n) (best case O(minDepth))
// Space Complexity: O(n)
export function minDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const queue: [node: TreeNode, depth: number][] = [[root, 1]];

  while (queue.length > 0) {
    const [node, depth] = queue.shift()!;
    if (!node.left && !node.right) {
      return depth;
    }
    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }

  return 0;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(minDepth(tree) === 2, "Test 1 failed");
console.assert(minDepth(new TreeNode(1, new TreeNode(2))) === 2, "Test 2 failed");
