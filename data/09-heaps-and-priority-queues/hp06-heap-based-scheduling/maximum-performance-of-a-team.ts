/**
 * Problem: Maximum Performance of a Team (LeetCode 1383)
 * Difficulty: Hard
 * Pattern: HP6 - Heap-based scheduling
 *
 * Maximize sum(speed) * min(efficiency) for at most k engineers.
 */

// --- Optimal Approach (Sort by Efficiency Descending + Min-Heap for Speeds) ---
// Time Complexity: O(n log n + n log k)
// Space Complexity: O(n)
export function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
  const MOD = 1_000_000_007n;
  const engineers = speed.map((s, i) => ({ s, e: efficiency[i] }));
  engineers.sort((a, b) => b.e - a.e); // descending efficiency

  const speedHeap: number[] = [];
  let speedSum = 0n;
  let maxPerf = 0n;

  for (const eng of engineers) {
    speedHeap.push(eng.s);
    speedHeap.sort((a, b) => a - b);
    speedSum += BigInt(eng.s);

    if (speedHeap.length > k) {
      speedSum -= BigInt(speedHeap.shift()!);
    }

    const currentPerf = speedSum * BigInt(eng.e);
    if (currentPerf > maxPerf) {
      maxPerf = currentPerf;
    }
  }

  return Number(maxPerf % MOD);
}

// --- Test Verification ---
console.assert(maxPerformance(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 2) === 60, "Test 1 failed");
console.assert(maxPerformance(6, [2, 10, 3, 1, 5, 8], [5, 4, 3, 9, 7, 2], 3) === 68, "Test 2 failed");
