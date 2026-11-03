/**
 * Problem: Serialize and Deserialize Binary Tree (LeetCode 297)
 * Difficulty: Hard
 * Pattern: TR17 - Serialize and deserialize a tree
 *
 * Design algorithm to serialize and deserialize a binary tree.
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

// --- Optimal Approach (Pre-order DFS serialization with delimiter) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function serialize(root: TreeNode | null): string {
  const parts: string[] = [];

  function dfs(node: TreeNode | null): void {
    if (!node) {
      parts.push("#");
      return;
    }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }

  dfs(root);
  return parts.join(",");
}

export function deserialize(data: string): TreeNode | null {
  const tokens = data.split(",");
  let idx = 0;

  function build(): TreeNode | null {
    if (idx >= tokens.length || tokens[idx] === "#") {
      idx++;
      return null;
    }

    const node = new TreeNode(Number(tokens[idx++]));
    node.left = build();
    node.right = build();
    return node;
  }

  return build();
}

// --- Test Verification ---
const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
const serialized = serialize(tree);
const deserialized = deserialize(serialized);
console.assert(deserialized?.val === 1 && deserialized?.right?.left?.val === 4, "Test 1 failed");
