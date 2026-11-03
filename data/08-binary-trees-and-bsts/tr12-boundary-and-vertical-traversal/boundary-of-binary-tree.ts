/**
 * Problem: Boundary of Binary Tree (LeetCode 545 analog)
 * Difficulty: Medium
 * Pattern: TR12 - Boundary and vertical traversal
 *
 * Return anti-clockwise boundary: root -> left boundary -> leaves -> right boundary (bottom-up).
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

function isLeaf(node: TreeNode): boolean {
  return !node.left && !node.right;
}

// --- Optimal Approach (Decomposed Traversal: Left + Leaves + Right Reversed) ---
// Time Complexity: O(n)
// Space Complexity: O(h)
export function boundaryOfBinaryTree(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: number[] = [];

  if (!isLeaf(root)) {
    res.push(root.val);
  }

  // 1. Left boundary
  let curr = root.left;
  while (curr) {
    if (!isLeaf(curr)) res.push(curr.val);
    curr = curr.left ? curr.left : curr.right;
  }

  // 2. Leaf nodes
  function addLeaves(node: TreeNode | null): void {
    if (!node) return;
    if (isLeaf(node)) {
      res.push(node.val);
      return;
    }
    addLeaves(node.left);
    addLeaves(node.right);
  }
  addLeaves(root);

  // 3. Right boundary (bottom-up)
  const rightBoundary: number[] = [];
  curr = root.right;
  while (curr) {
    if (!isLeaf(curr)) rightBoundary.push(curr.val);
    curr = curr.right ? curr.right : curr.left;
  }
  while (rightBoundary.length > 0) {
    res.push(rightBoundary.pop()!);
  }

  return res;
}

// --- Test Verification ---
const tree = new TreeNode(1, null, new TreeNode(2, new TreeNode(3), new TreeNode(4)));
console.assert(JSON.stringify(boundaryOfBinaryTree(tree)) === JSON.stringify([1, 3, 4, 2]), "Test 1 failed");
