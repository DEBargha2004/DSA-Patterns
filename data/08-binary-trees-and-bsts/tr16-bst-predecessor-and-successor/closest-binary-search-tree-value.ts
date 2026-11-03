/**
 * Problem: Closest Binary Search Tree Value (LeetCode 270)
 * Difficulty: Easy
 * Pattern: TR16 - BST predecessor and successor
 *
 * Find value in BST that is closest to given target.
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

// --- Optimal Approach (Binary Search Navigation) ---
// Time Complexity: O(h)
// Space Complexity: O(1)
export function closestValue(root: TreeNode | null, target: number): number {
  let closest = root!.val;
  let curr = root;

  while (curr) {
    const currDiff = Math.abs(curr.val - target);
    const closestDiff = Math.abs(closest - target);

    if (currDiff < closestDiff || (currDiff === closestDiff && curr.val < closest)) {
      closest = curr.val;
    }

    curr = target < curr.val ? curr.left : curr.right;
  }

  return closest;
}

// --- Test Verification ---
const tree = new TreeNode(4, new TreeNode(2, new TreeNode(1), new TreeNode(3)), new TreeNode(5));
console.assert(closestValue(tree, 3.714286) === 4, "Test 1 failed");
console.assert(closestValue(tree, 2.5) === 2, "Test 2 failed");
