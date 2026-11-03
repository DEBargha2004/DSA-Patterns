/**
 * Problem: Serialize and Deserialize BST (LeetCode 449)
 * Difficulty: Medium
 * Pattern: TR17 - Serialize and deserialize a tree
 *
 * Optimize serialization for BST using BST property (no null markers needed).
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

// --- Optimal Approach (Preorder traversal without nulls + Bound Reconstruction) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function serializeBST(root: TreeNode | null): string {
  if (!root) return "";
  const values: number[] = [];

  function preorder(node: TreeNode | null): void {
    if (!node) return;
    values.push(node.val);
    preorder(node.left);
    preorder(node.right);
  }

  preorder(root);
  return values.join(" ");
}

export function deserializeBST(data: string): TreeNode | null {
  if (!data) return null;
  const values = data.split(" ").map(Number);
  let idx = 0;

  function build(low: number, high: number): TreeNode | null {
    if (idx >= values.length || values[idx] <= low || values[idx] >= high) {
      return null;
    }
    const val = values[idx++];
    const node = new TreeNode(val);
    node.left = build(low, val);
    node.right = build(val, high);
    return node;
  }

  return build(-Infinity, Infinity);
}

// --- Test Verification ---
const tree = new TreeNode(2, new TreeNode(1), new TreeNode(3));
const s = serializeBST(tree);
const d = deserializeBST(s);
console.assert(d?.val === 2 && d?.left?.val === 1 && d?.right?.val === 3, "Test 1 failed");
