/**
 * Problem: Construct Binary Tree from Inorder and Postorder Traversal (LeetCode 106)
 * Difficulty: Medium
 * Pattern: TR11 - Construct tree from traversal sequences
 *
 * Construct and return binary tree given inorder and postorder traversals.
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

// --- Optimal Approach (Inorder HashMap + Right-first Recursion from Postorder end) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function buildTreeInPost(inorder: number[], postorder: number[]): TreeNode | null {
  const map = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    map.set(inorder[i], i);
  }

  let postIdx = postorder.length - 1;

  function build(inLeft: number, inRight: number): TreeNode | null {
    if (inLeft > inRight) return null;

    const val = postorder[postIdx--];
    const root = new TreeNode(val);
    const inIdx = map.get(val)!;

    // Must build right subtree before left subtree because postorder is Left -> Right -> Root
    root.right = build(inIdx + 1, inRight);
    root.left = build(inLeft, inIdx - 1);

    return root;
  }

  return build(0, inorder.length - 1);
}

// --- Test Verification ---
const tree = buildTreeInPost([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
console.assert(tree?.val === 3 && tree?.left?.val === 9 && tree?.right?.val === 20, "Test 1 failed");
