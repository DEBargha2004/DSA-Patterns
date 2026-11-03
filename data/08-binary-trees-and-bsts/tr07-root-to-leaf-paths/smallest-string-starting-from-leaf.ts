/**
 * Problem: Smallest String Starting From Leaf (LeetCode 988)
 * Difficulty: Medium
 * Pattern: TR7 - Root-to-leaf paths
 *
 * Find lexicographically smallest string starting at leaf and ending at root.
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

// --- Optimal Approach (DFS Building Reversed String) ---
// Time Complexity: O(n * h)
// Space Complexity: O(h)
export function smallestFromLeaf(root: TreeNode | null): string {
  let smallest = "~"; // sentinel higher than 'z'

  function dfs(node: TreeNode | null, currentStr: string): void {
    if (!node) return;

    const char = String.fromCharCode(97 + node.val);
    currentStr = char + currentStr;

    if (!node.left && !node.right) {
      if (currentStr < smallest) {
        smallest = currentStr;
      }
      return;
    }

    dfs(node.left, currentStr);
    dfs(node.right, currentStr);
  }

  dfs(root, "");
  return smallest;
}

// --- Test Verification ---
const tree = new TreeNode(0, new TreeNode(1, new TreeNode(3), new TreeNode(4)), new TreeNode(2, new TreeNode(3), new TreeNode(4)));
console.assert(smallestFromLeaf(tree) === "dba", "Test 1 failed");
