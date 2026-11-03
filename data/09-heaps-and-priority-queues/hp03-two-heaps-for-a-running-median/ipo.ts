/**
 * Problem: IPO (LeetCode 502)
 * Difficulty: Hard
 * Pattern: HP3 - Two heaps for a running median
 *
 * Maximize capital after choosing at most k projects.
 */

// --- Optimal Approach (Min-Capital Array + Max-Profit Heap) ---
// Time Complexity: O(n log n + k log n)
// Space Complexity: O(n)
export function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  const n = profits.length;
  const projects = Array.from({ length: n }, (_, i) => ({ cap: capital[i], pro: profits[i] }));
  projects.sort((a, b) => a.cap - b.cap);

  const profitHeap: number[] = []; // max heap (negated numbers)
  let projIdx = 0;

  function pushMax(val: number): void {
    profitHeap.push(-val);
    let i = profitHeap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (profitHeap[i] < profitHeap[p]) {
        [profitHeap[i], profitHeap[p]] = [profitHeap[p], profitHeap[i]];
        i = p;
      } else break;
    }
  }

  function popMax(): number {
    const min = profitHeap[0];
    const end = profitHeap.pop()!;
    if (profitHeap.length > 0) {
      profitHeap[0] = end;
      let i = 0;
      const len = profitHeap.length;
      while (true) {
        let s = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < len && profitHeap[l] < profitHeap[s]) s = l;
        if (r < len && profitHeap[r] < profitHeap[s]) s = r;
        if (s !== i) {
          [profitHeap[i], profitHeap[s]] = [profitHeap[s], profitHeap[i]];
          i = s;
        } else break;
      }
    }
    return -min;
  }

  for (let step = 0; step < k; step++) {
    while (projIdx < n && projects[projIdx].cap <= w) {
      pushMax(projects[projIdx].pro);
      projIdx++;
    }

    if (profitHeap.length === 0) break;
    w += popMax();
  }

  return w;
}

// --- Test Verification ---
console.assert(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]) === 4, "Test 1 failed");
console.assert(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 2]) === 6, "Test 2 failed");
