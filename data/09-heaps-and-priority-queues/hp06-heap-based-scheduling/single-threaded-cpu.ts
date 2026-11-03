/**
 * Problem: Single-Threaded CPU (LeetCode 1834)
 * Difficulty: Medium
 * Pattern: HP6 - Heap-based scheduling
 *
 * Return order of processed task indices scheduled by shortest processing time first.
 */

// --- Optimal Approach (Events Sorted by Enqueue Time + Min-Heap by Processing Time) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function getOrder(tasks: number[][]): number[] {
  const n = tasks.length;
  // task: [enqueueTime, processingTime, originalIndex]
  const indexedTasks = tasks.map((t, idx) => [t[0], t[1], idx]).sort((a, b) => a[0] - b[0]);

  const result: number[] = [];
  const readyQueue: [enqueueTime: number, procTime: number, index: number][] = [];

  const pushQueue = (item: [number, number, number]) => {
    readyQueue.push(item);
    readyQueue.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[2] - b[2]);
  };

  let currentTime = 0;
  let taskIdx = 0;

  while (taskIdx < n || readyQueue.length > 0) {
    if (readyQueue.length === 0 && currentTime < indexedTasks[taskIdx][0]) {
      currentTime = indexedTasks[taskIdx][0];
    }

    while (taskIdx < n && indexedTasks[taskIdx][0] <= currentTime) {
      pushQueue(indexedTasks[taskIdx] as [number, number, number]);
      taskIdx++;
    }

    const nextTask = readyQueue.shift()!;
    currentTime += nextTask[1];
    result.push(nextTask[2]);
  }

  return result;
}

// --- Test Verification ---
const tasks1 = [[1, 2], [2, 4], [3, 2], [4, 1]];
console.assert(JSON.stringify(getOrder(tasks1)) === JSON.stringify([0, 2, 3, 1]), "Test 1 failed");
