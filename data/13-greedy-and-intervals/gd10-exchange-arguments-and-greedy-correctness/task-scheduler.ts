/**
 * Pattern: Exchange arguments and greedy correctness
 * Problem: Task Scheduler (LeetCode 621)
 *
 * Given tasks array and cooldown n between identical tasks. Return least intervals to finish all tasks.
 */

// Brute Force: Simulation using queue tracking cooldown timestamps
// Time: O(Total Intervals * 26), Space: O(26)
export function leastIntervalSim(tasks: string[], n: number): number {
  const counts = new Map<string, number>();
  for (const t of tasks) counts.set(t, (counts.get(t) || 0) + 1);

  const lastUsed = new Map<string, number>();
  let time = 0;
  let finished = 0;
  const total = tasks.length;

  while (finished < total) {
    time++;
    let bestTask: string | null = null;
    let maxCount = 0;

    for (const [task, count] of counts.entries()) {
      if (count > 0) {
        const canRun = !lastUsed.has(task) || time - lastUsed.get(task)! > n;
        if (canRun && count > maxCount) {
          maxCount = count;
          bestTask = task;
        }
      }
    }

    if (bestTask) {
      counts.set(bestTask, counts.get(bestTask)! - 1);
      lastUsed.set(bestTask, time);
      finished++;
    }
  }

  return time;
}

// Optimal: Mathematical Formula (Slot allocation based on maximum frequency task)
// Max intervals = max((maxFreq - 1) * (n + 1) + countOfMaxFreqTasks, tasks.length)
// Time: O(N), Space: O(26) = O(1)
export function leastIntervalOptimal(tasks: string[], n: number): number {
  const counts = new Array(26).fill(0);
  for (const t of tasks) counts[t.charCodeAt(0) - 65]++;

  let maxFreq = 0;
  for (const c of counts) maxFreq = Math.max(maxFreq, c);

  let maxFreqCount = 0;
  for (const c of counts) {
    if (c === maxFreq) maxFreqCount++;
  }

  const emptySlots = (maxFreq - 1) * (n + 1) + maxFreqCount;
  return Math.max(emptySlots, tasks.length);
}

// Test cases
const tasks = ["A","A","A","B","B","B"];
const nCool = 2;
if (leastIntervalSim(tasks, nCool) !== 8 || leastIntervalOptimal(tasks, nCool) !== 8) {
  throw new Error("Expected 8 intervals");
}
console.log("Task Scheduler passed!");
