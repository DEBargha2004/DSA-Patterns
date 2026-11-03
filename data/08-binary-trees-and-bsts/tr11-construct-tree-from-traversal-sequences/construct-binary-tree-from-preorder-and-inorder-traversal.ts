/**
 * Problem: Construct Binary Tree from Preorder and Inorder Traversal (LeetCode 105)
 * Difficulty: Medium
 * Pattern: TR11 - Construct tree from traversal sequences
 *
 * Construct and return the binary tree given preorder and inorder traversal arrays.
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

// --- Optimal Approach (HashMap for O(1) Inorder Lookups + Recursion) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const inorderMap = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    inorderMap.set(inorder[i], i);
  }

  let preIdx = 0;

  function build(inLeft: number, inRight: number): TreeNode | null {
    if (inLeft > inRight) return null;

    const rootVal = preorder[preIdx++];
    const root = new TreeNode(rootVal);
    const inIndex = inorderMap.get(rootVal)!;

    root.left = build(inLeft, inIndex - 1);
    root.right = build(inIndex + 1, inRight);

    return root;
  }

  return build(0, inorder.length - 1);
}

// --- Test Verification ---
const root = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.assert(root?.val === 3 && root?.left?.val === 9 && root?.right?.val === 20, "Test 1 failed");
console.assert(root?.right?.left?.val === 15 && root?.right?.right?.val === 7, "Test 2 failed");
