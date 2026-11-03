/**
 * Problem: Lowest Common Ancestor of Deepest Leaves (LeetCode 1123)
 * Difficulty: Medium
 * Pattern: TR9 - Lowest common ancestor
 *
 * Return LCA of the deepest leaves in tree.
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

// --- Optimal Approach (DFS returning (LCA_node, depth)) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function lcaDeepestLeaves(root: TreeNode | null): TreeNode | null {
  function dfs(node: TreeNode | null): [node: TreeNode | null, depth: number] {
    if (!node) return [null, 0];

    const [leftLCA, leftDepth] = dfs(node.left);
    const [rightLCA, rightDepth] = dfs(node.right);

    if (leftDepth === rightDepth) {
      return [node, leftDepth + 1];
    }
    if (leftDepth > rightDepth) {
      return [leftLCA, leftDepth + 1];
    }
    return [rightLCA, rightDepth + 1];
  }

  return dfs(root)[0];
}

// --- Test Verification ---
const tree = new TreeNode(3, new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))), new TreeNode(1, new TreeNode(0), new TreeNode(8)));
const lca = lcaDeepestLeaves(tree);
console.assert(lca?.val === 2, "Test 1 failed (leaves 7 and 4 have LCA 2)");
