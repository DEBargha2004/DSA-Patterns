/**
 * Problem: Path Sum II (LeetCode 113)
 * Difficulty: Medium
 * Pattern: TR8 - Path sum and path-based recursion
 *
 * Find all root-to-leaf paths where sum equals targetSum.
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

// --- Optimal Approach (Backtracking DFS) ---
// Time Complexity: O(n * h)
// Space Complexity: O(h) recursion depth
export function pathSum(root: TreeNode | null, targetSum: number): number[][] {
  const result: number[][] = [];
  const currentPath: number[] = [];

  function dfs(node: TreeNode | null, remaining: number): void {
    if (!node) return;

    currentPath.push(node.val);
    remaining -= node.val;

    if (!node.left && !node.right && remaining === 0) {
      result.push([...currentPath]);
    } else {
      dfs(node.left, remaining);
      dfs(node.right, remaining);
    }

    currentPath.pop();
  }

  dfs(root, targetSum);
  return result;
}

// --- Test Verification ---
const tree = new TreeNode(5, new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))), new TreeNode(8, new TreeNode(13), new TreeNode(4, new TreeNode(5), new TreeNode(1))));
const res = pathSum(tree, 22);
console.assert(res.length === 2, "Test 1 failed");
console.assert(JSON.stringify(res[0]) === JSON.stringify([5, 4, 11, 2]), "Test 2 failed");
