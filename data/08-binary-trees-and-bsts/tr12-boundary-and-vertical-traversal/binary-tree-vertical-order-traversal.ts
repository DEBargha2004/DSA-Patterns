/**
 * Problem: Binary Tree Vertical Order Traversal (LeetCode 314 analog)
 * Difficulty: Medium
 * Pattern: TR12 - Boundary and vertical traversal
 *
 * Return vertical order traversal from left to right, top to bottom within same col.
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

// --- Optimal Approach (Queue BFS with Column Mapping) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function verticalOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const colMap = new Map<number, number[]>();
  const queue: [node: TreeNode, col: number][] = [[root, 0]];
  let minCol = 0;
  let maxCol = 0;

  while (queue.length > 0) {
    const [node, col] = queue.shift()!;
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);

    if (!colMap.has(col)) colMap.set(col, []);
    colMap.get(col)!.push(node.val);

    if (node.left) queue.push([node.left, col - 1]);
    if (node.right) queue.push([node.right, col + 1]);
  }

  const result: number[][] = [];
  for (let c = minCol; c <= maxCol; c++) {
    if (colMap.has(c)) {
      result.push(colMap.get(c)!);
    }
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(9), new TreeNode(8, new TreeNode(4), new TreeNode(0)));
console.assert(JSON.stringify(verticalOrder(tree)) === JSON.stringify([[9], [3, 4], [8], [0]]), "Test 1 failed");
