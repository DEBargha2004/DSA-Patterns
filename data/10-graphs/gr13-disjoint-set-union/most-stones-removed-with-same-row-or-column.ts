/**
 * Problem: Most Stones Removed with Same Row or Column (LeetCode 947)
 * Difficulty: Medium
 * Pattern: GR13 - Disjoint Set Union
 *
 * Find max stones removed: answer = total stones - connected components.
 */

// --- Optimal Approach (DSU on Coordinates: row and ~col) ---
// Time Complexity: O(n * alpha(n))
// Space Complexity: O(n)
export function removeStones(stones: number[][]): number {
  const parent = new Map<number, number>();

  function find(x: number): number {
    if (!parent.has(x)) parent.set(x, x);
    if (parent.get(x) !== x) {
      parent.set(x, find(parent.get(x)!));
    }
    return parent.get(x)!;
  }

  function union(x: number, y: number): void {
    const rx = find(x);
    const ry = find(y);
    if (rx !== ry) {
      parent.set(rx, ry);
    }
  }

  // Differentiate column from row using bitwise NOT (~c)
  for (const [r, c] of stones) {
    union(r, ~c);
  }

  const roots = new Set<number>();
  for (const [r] of stones) {
    roots.add(find(r));
  }

  return stones.length - roots.size;
}

// --- Test Verification ---
const s1 = [[0, 0], [0, 1], [1, 0], [1, 2], [2, 1], [2, 2]];
console.assert(removeStones(s1) === 5, "Test 1 failed");
const s2 = [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]];
console.assert(removeStones(s2) === 3, "Test 2 failed");
