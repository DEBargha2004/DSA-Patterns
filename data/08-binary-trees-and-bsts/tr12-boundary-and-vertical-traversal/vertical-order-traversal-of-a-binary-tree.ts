/**
 * Problem: Vertical Order Traversal of a Binary Tree (LeetCode 987)
 * Difficulty: Hard
 * Pattern: TR12 - Boundary and vertical traversal
 *
 * Sort nodes by column (col ascending), then row (row ascending), then value ascending.
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

// --- Optimal Approach (BFS with Coordinate Tracking & Multi-key Sort) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function verticalTraversal(root: TreeNode | null): number[][] {
  if (!root) return [];

  interface NodeCoord {
    val: number;
    row: number;
    col: number;
  }

  const nodes: NodeCoord[] = [];
  const queue: [node: TreeNode, row: number, col: number][] = [[root, 0, 0]];

  while (queue.length > 0) {
    const [node, row, col] = queue.shift()!;
    nodes.push({ val: node.val, row, col });

    if (node.left) queue.push([node.left, row + 1, col - 1]);
    if (node.right) queue.push([node.right, row + 1, col + 1]);
  }

  // Sort by col, then row, then value
  nodes.sort((a, b) => {
    if (a.col !== b.col) return a.col - b.col;
    if (a.row !== b.row) return a.row - b.row;
    return a.val - b.val;
  });

  const result: number[][] = [];
  let currentCol = nodes[0].col;
  let currentGroup: number[] = [];

  for (const n of nodes) {
    if (n.col !== currentCol) {
      result.push(currentGroup);
      currentGroup = [];
      currentCol = n.col;
    }
    currentGroup.push(n.val);
  }
  if (currentGroup.length > 0) {
    result.push(currentGroup);
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
console.assert(JSON.stringify(verticalTraversal(tree)) === JSON.stringify([[9], [3, 15], [20], [7]]), "Test 1 failed");
