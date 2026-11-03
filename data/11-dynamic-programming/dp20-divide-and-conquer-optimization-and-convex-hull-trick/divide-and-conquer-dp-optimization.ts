/**
 * Problem: Divide-and-Conquer DP Optimization
 * Difficulty: Hard
 * Pattern: DP20 - Divide-and-conquer optimization and convex hull trick
 *
 * Optimize 2D DP satisfying quadrangle inequality opt(i, j) <= opt(i, j+1) from O(k * n^2) to O(k * n log n).
 */

// --- Optimal Approach (D&C DP Optimization) ---
// Time Complexity: O(k * n log n)
// Space Complexity: O(n)
export function divideAndConquerDP(n: number, k: number, costFn: (i: number, j: number) => number): number {
  let prevDP = new Array(n + 1).fill(Infinity);
  prevDP[0] = 0;

  for (let g = 1; g <= k; g++) {
    const curDP = new Array(n + 1).fill(Infinity);

    function compute(l: number, r: number, optL: number, optR: number): void {
      if (l > r) return;
      const mid = Math.floor((l + r) / 2);
      let bestOpt = optL;
      curDP[mid] = Infinity;

      for (let p = optL; p <= Math.min(mid - 1, optR); p++) {
        const val = prevDP[p] + costFn(p, mid);
        if (val < curDP[mid]) {
          curDP[mid] = val;
          bestOpt = p;
        }
      }

      compute(l, mid - 1, optL, bestOpt);
      compute(mid + 1, r, bestOpt, optR);
    }

    compute(1, n, 0, n - 1);
    prevDP = curDP;
  }

  return prevDP[n];
}

// --- Test Verification ---
// Simple test: cost(i, j) = (j - i)^2
const res = divideAndConquerDP(4, 2, (i, j) => (j - i) * (j - i));
console.assert(res === 8, "Test 1 failed (split into [0,2] and [2,4] -> 4 + 4 = 8)");
