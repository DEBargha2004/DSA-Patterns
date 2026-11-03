/**
 * Problem: Parallel Binary Search (Canonical Multi-Query Optimization)
 * Difficulty: Hard
 * Pattern: BS12 - Parallel binary search
 *
 * Solve multi-query threshold state queries in O((N + Q) log Q) by running binary search on all queries simultaneously.
 */

export interface Query {
  id: number;
  threshold: number;
}

// --- Optimal Approach (Parallel Binary Search Batch Partitioning) ---
// Time Complexity: O((N + Q) * log(numEvents))
// Space Complexity: O(N + Q)
export function parallelBinarySearch(
  queries: Query[],
  events: number[],
  numRounds: number
): number[] {
  const qCount = queries.length;
  const left = new Array<number>(qCount).fill(1);
  const right = new Array<number>(qCount).fill(numRounds);
  const ans = new Array<number>(qCount).fill(numRounds + 1);

  let active = true;

  while (active) {
    active = false;
    const midGroups = new Map<number, number[]>();

    for (let i = 0; i < qCount; i++) {
      if (left[i] <= right[i]) {
        active = true;
        const mid = Math.floor((left[i] + right[i]) / 2);
        if (!midGroups.has(mid)) midGroups.set(mid, []);
        midGroups.get(mid)!.push(i);
      }
    }

    if (!active) break;

    // Simulate events up to mid and update query bounds
    for (const [mid, qIndices] of midGroups.entries()) {
      let currentSum = 0;
      for (let e = 0; e < mid && e < events.length; e++) {
        currentSum += events[e];
      }

      for (const qIdx of qIndices) {
        if (currentSum >= queries[qIdx].threshold) {
          ans[qIdx] = mid;
          right[qIdx] = mid - 1;
        } else {
          left[qIdx] = mid + 1;
        }
      }
    }
  }

  return ans;
}

// --- Test Verification ---
const qs = [{ id: 0, threshold: 5 }, { id: 1, threshold: 12 }];
const evts = [2, 3, 4, 5];
const res = parallelBinarySearch(qs, evts, 4);
console.assert(res[0] === 2, "Query 0 reached 5 at round 2");
console.assert(res[1] === 4, "Query 1 reached 12 at round 4");
