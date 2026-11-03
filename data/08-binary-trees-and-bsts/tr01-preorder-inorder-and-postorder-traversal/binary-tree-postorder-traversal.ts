/**
 * Problem: Binary Tree Postorder Traversal (LeetCode 145)
 * Difficulty: Easy
 * Pattern: TR1 - Preorder, inorder and postorder traversal
 *
 * Given root of a binary tree, return postorder traversal of values.
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

// --- Optimal Approach (Iterative Traversal using Last Visited Pointer) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function postorderTraversal(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr = root;
  let lastVisited: TreeNode | null = null;

  while (curr || stack.length > 0) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    const peekNode = stack[stack.length - 1];
    if (peekNode.right && lastVisited !== peekNode.right) {
      curr = peekNode.right;
    } else {
      result.push(peekNode.val);
      lastVisited = stack.pop()!;
    }
  }

  return result;
}

// --- Test Verification ---
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), null));
console.assert(JSON.stringify(postorderTraversal(tree)) === JSON.stringify([3, 2, 1]), "Test 1 failed");
console.assert(JSON.stringify(postorderTraversal(null)) === JSON.stringify([]), "Test 2 failed");
