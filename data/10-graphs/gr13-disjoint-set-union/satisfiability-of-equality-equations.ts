/**
 * Problem: Satisfiability of Equality Equations (LeetCode 990)
 * Difficulty: Medium
 * Pattern: GR13 - Disjoint Set Union
 *
 * Determine if equation constraints like "a==b" and "b!=c" can be satisfied.
 */

// --- Optimal Approach (DSU: Union equals first, then check inequalities) ---
// Time Complexity: O(n * alpha(26))
// Space Complexity: O(1)
export function equationsPossible(equations: string[]): boolean {
  const parent = Array.from({ length: 26 }, (_, i) => i);

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }

  function union(x: number, y: number): void {
    parent[find(x)] = find(y);
  }

  // Pass 1: Union all "==" equations
  for (const eq of equations) {
    if (eq[1] === "=") {
      const u = eq.charCodeAt(0) - 97;
      const v = eq.charCodeAt(3) - 97;
      union(u, v);
    }
  }

  // Pass 2: Verify all "!=" equations
  for (const eq of equations) {
    if (eq[1] === "!") {
      const u = eq.charCodeAt(0) - 97;
      const v = eq.charCodeAt(3) - 97;
      if (find(u) === find(v)) {
        return false; // contradiction!
      }
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(equationsPossible(["a==b", "b!=a"]) === false, "Test 1 failed");
console.assert(equationsPossible(["b==a", "a==b"]) === true, "Test 2 failed");
console.assert(equationsPossible(["a==b", "b==c", "a==c"]) === true, "Test 3 failed");
console.assert(equationsPossible(["a==b", "b!=c", "c==a"]) === false, "Test 4 failed");
