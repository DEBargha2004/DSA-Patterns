/**
 * Problem: Binary Tree Cameras (LeetCode 968)
 * Difficulty: Hard
 * Pattern: DP15 - Tree DP
 *
 * Find minimum cameras to monitor all nodes of binary tree.
 * States: 0 = unmonitored, 1 = has camera, 2 = monitored without camera
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

// --- Optimal Approach (Greedy Tree DP / Post-order 3-State) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function minCameraCover(root: TreeNode | null): number {
  let cameras = 0;

  function dfs(node: TreeNode | null): number {
    if (!node) return 2; // null nodes are monitored

    const left = dfs(node.left);
    const right = dfs(node.right);

    // If either child is uncovered, parent MUST place camera
    if (left === 0 || right === 0) {
      cameras++;
      return 1;
    }

    // If either child has camera, parent is monitored
    if (left === 1 || right === 1) {
      return 2;
    }

    // Both children are monitored without camera, so current node is uncovered
    return 0;
  }

  if (dfs(root) === 0) {
    cameras++;
  }

  return cameras;
}

// --- Test Verification ---
const t1 = new TreeNode(0, new TreeNode(0, new TreeNode(0), new TreeNode(0)), null);
console.assert(minCameraCover(t1) === 1, "Test 1 failed");

const t2 = new TreeNode(0, new TreeNode(0, new TreeNode(0, new TreeNode(0, null, new TreeNode(0)), null), null), null);
console.assert(minCameraCover(t2) === 2, "Test 2 failed");
