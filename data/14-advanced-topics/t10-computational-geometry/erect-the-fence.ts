/**
 * Pattern: Computational geometry
 * Problem: Erect the Fence (LeetCode 587) - Convex Hull including Collinear Points
 */

// Optimal: Monotone Chain handling collinear boundary points (crossProduct < 0 instead of <= 0)
// Time: O(N log N), Space: O(N)
export function outerTrees(trees: number[][]): number[][] {
  if (trees.length <= 3) return trees;

  trees.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  function cross(o: number[], a: number[], b: number[]): number {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  }

  const lower: number[][] = [];
  for (const p of trees) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) < 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: number[][] = [];
  for (let i = trees.length - 1; i >= 0; i--) {
    const p = trees[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) < 0) {
      upper.pop();
    }
    upper.push(p);
  }

  const seen = new Set<string>();
  const result: number[][] = [];
  for (const p of [...lower, ...upper]) {
    const key = `${p[0]},${p[1]}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(p);
    }
  }

  return result;
}

// Test cases
const trees = [[1,1],[2,2],[2,0],[2,4],[3,3],[4,2]];
const hullFence = outerTrees(trees);
if (hullFence.length !== 5) throw new Error("Expected 5 fence points");
console.log("Erect the Fence passed!");
