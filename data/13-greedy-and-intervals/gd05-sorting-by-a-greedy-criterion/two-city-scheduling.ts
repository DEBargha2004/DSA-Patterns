/**
 * Pattern: Sorting by a greedy criterion
 * Problem: Two City Scheduling (LeetCode 1029)
 *
 * A company is interviewing 2n people. costs[i] = [aCost_i, bCost_i].
 * Fly exactly n people to city A and n people to city B. Return minimum total cost.
 */

// Brute Force: DP / Backtracking choosing A or B with count tracking
// Time: O(N^2), Space: O(N^2)
export function twoCitySchedCostDP(costs: number[][]): number {
  const n2 = costs.length;
  const n = n2 / 2;
  const memo = new Map<string, number>();

  function dfs(idx: number, countA: number): number {
    if (idx === n2) return 0;
    const countB = idx - countA;
    const key = `${idx},${countA}`;
    if (memo.has(key)) return memo.get(key)!;

    let res = Infinity;
    if (countA < n) {
      res = Math.min(res, costs[idx][0] + dfs(idx + 1, countA + 1));
    }
    if (countB < n) {
      res = Math.min(res, costs[idx][1] + dfs(idx + 1, countA));
    }

    memo.set(key, res);
    return res;
  }

  return dfs(0, 0);
}

// Optimal: Greedy sort by cost difference (costA - costB)
// Sending someone to A instead of B saves (costB - costA), i.e. Minimizes (costA - costB).
// Time: O(N log N), Space: O(1) auxiliary
export function twoCitySchedCostOptimal(costs: number[][]): number {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));

  const n = costs.length / 2;
  let totalCost = 0;

  for (let i = 0; i < n; i++) {
    totalCost += costs[i][0]; // City A for the smallest diffs
  }
  for (let i = n; i < 2 * n; i++) {
    totalCost += costs[i][1]; // City B for the rest
  }

  return totalCost;
}

// Test cases
const cCity = [[10,20],[30,200],[400,50],[30,20]];
if (twoCitySchedCostDP(cCity) !== 110 || twoCitySchedCostOptimal(cCity) !== 110) {
  throw new Error("Expected 110 total cost");
}
console.log("Two City Scheduling passed!");
