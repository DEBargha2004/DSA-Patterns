/**
 * Problem: House Robber III (LeetCode 337)
 * Difficulty: Medium
 * Pattern: DP15 - Tree DP
 *
 * Rob binary tree houses: cannot rob directly linked parent and child.
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

// --- Optimal Approach (Post-order Tree DP: [robThisNode, notRobThisNode]) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function robTree(root: TreeNode | null): number {
  function dfs(node: TreeNode | null): [rob: number, notRob: number] {
    if (!node) return [0, 0];

    const [leftRob, leftNotRob] = dfs(node.left);
    const [rightRob, rightNotRob] = dfs(node.right);

    const robCurr = node.val + leftNotRob + rightNotRob;
    const notRobCurr = Math.max(leftRob, leftNotRob) + Math.max(rightRob, rightNotRob);

    return [robCurr, notRobCurr];
  }

  const [r, nr] = dfs(root);
  return Math.max(r, nr);
}

// --- Test Verification ---
const tree1 = new TreeNode(3, new TreeNode(2, null, new TreeNode(3)), new TreeNode(3, null, new TreeNode(1)));
console.assert(robTree(tree1) === 7, "Test 1 failed (3 + 3 + 1 = 7)");

const tree2 = new TreeNode(3, new TreeNode(4, new TreeNode(1), new TreeNode(3)), new TreeNode(5, null, new TreeNode(1)));
console.assert(robTree(tree2) === 9, "Test 2 failed (4 + 5 = 9)");
