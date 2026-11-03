/**
 * Problem: Clone Graph (LeetCode 133)
 * Difficulty: Medium
 * Pattern: GR1 - Graph representation and traversal
 *
 * Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
 */

export class NodeGraph {
  val: number;
  neighbors: NodeGraph[];
  constructor(val?: number, neighbors?: NodeGraph[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// --- Optimal Approach (DFS with Clone Map) ---
// Time Complexity: O(V + E)
// Space Complexity: O(V)
export function cloneGraph(node: NodeGraph | null): NodeGraph | null {
  if (!node) return null;
  const visited = new Map<NodeGraph, NodeGraph>();

  function dfs(curr: NodeGraph): NodeGraph {
    if (visited.has(curr)) {
      return visited.get(curr)!;
    }

    const copy = new NodeGraph(curr.val);
    visited.set(curr, copy);

    for (const neighbor of curr.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}

// --- Test Verification ---
const n1 = new NodeGraph(1);
const n2 = new NodeGraph(2);
n1.neighbors.push(n2);
n2.neighbors.push(n1);

const cloned = cloneGraph(n1);
console.assert(cloned !== null && cloned !== n1 && cloned.val === 1, "Test 1 failed");
console.assert(cloned?.neighbors[0].val === 2 && cloned.neighbors[0] !== n2, "Test 2 failed");
console.assert(cloneGraph(null) === null, "Test 3 failed");
