/**
 * Problem: Clone Multi-Pointer Node List via Hash Map
 * Difficulty: Medium
 * Pattern: LL13 - Clone a list with random pointers
 *
 * Deep copy a complex graph/list using Map<OriginalNode, ClonedNode>.
 */

export class ComplexNode {
  val: number;
  neighbors: ComplexNode[];
  constructor(val?: number, neighbors?: ComplexNode[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// --- Optimal Approach (Hash Map + DFS / BFS Deep Copy) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V)
export function cloneGraph(node: ComplexNode | null): ComplexNode | null {
  if (!node) return null;
  const visited = new Map<ComplexNode, ComplexNode>();

  function dfs(curr: ComplexNode): ComplexNode {
    if (visited.has(curr)) return visited.get(curr)!;

    const clone = new ComplexNode(curr.val);
    visited.set(curr, clone);

    for (const neighbor of curr.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}

// --- Test Verification ---
const c1 = new ComplexNode(1);
const c2 = new ComplexNode(2);
c1.neighbors.push(c2);
c2.neighbors.push(c1);
const cloned = cloneGraph(c1);
console.assert(cloned !== c1 && cloned!.val === 1 && cloned!.neighbors[0].val === 2, "Test failed");
