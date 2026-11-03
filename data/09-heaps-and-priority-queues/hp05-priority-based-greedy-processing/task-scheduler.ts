/**
 * Problem: Task Scheduler (LeetCode 621)
 * Difficulty: Medium
 * Pattern: HP5 - Priority-based greedy processing
 *
 * Find least intervals to complete all tasks with cooldown n.
 */

// --- Optimal Approach (Greedy Frequency Formula / Max-Heap) ---
// Time Complexity: O(tasks.length)
// Space Complexity: O(1) (26 uppercase letters)
export function leastInterval(tasks: string[], n: number): number {
  const freq = new Array(26).fill(0);
  for (const t of tasks) {
    freq[t.charCodeAt(0) - 65]++;
  }

  const maxFreq = Math.max(...freq);
  let countMaxFreq = 0;
  for (const f of freq) {
    if (f === maxFreq) countMaxFreq++;
  }

  const minTime = (maxFreq - 1) * (n + 1) + countMaxFreq;
  return Math.max(tasks.length, minTime);
}

// --- Test Verification ---
console.assert(leastInterval(["A", "A", "A", "B", "B", "B"], 2) === 8, "Test 1 failed");
console.assert(leastInterval(["A", "A", "A", "B", "B", "B"], 0) === 6, "Test 2 failed");
console.assert(leastInterval(["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2) === 16, "Test 3 failed");
