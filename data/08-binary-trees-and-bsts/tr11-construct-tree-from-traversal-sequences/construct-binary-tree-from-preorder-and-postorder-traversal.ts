/**
 * Problem: Construct Binary Tree from Preorder and Postorder Traversal (LeetCode 889)
 * Difficulty: Medium
 * Pattern: TR11 - Construct tree from traversal sequences
 *
 * Construct and return any binary tree with matching preorder and postorder.
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

// --- Optimal Approach (Postorder Index Map + Preorder Iteration) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
  let preIdx = 0;
  let postIdx = 0;

  function construct(): TreeNode | null {
    const root = new TreeNode(preorder[preIdx++]);

    if (root.val !== postorder[postIdx]) {
      root.left = construct();
    }
    if (root.val !== postorder[postIdx]) {
      root.right = construct();
    }

    postIdx++;
    return root;
  }

  return construct();
}

// --- Test Verification ---
const tree = constructFromPrePost([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]);
console.assert(tree?.val === 1 && tree?.left?.val === 2 && tree?.right?.val === 3, "Test 1 failed");
