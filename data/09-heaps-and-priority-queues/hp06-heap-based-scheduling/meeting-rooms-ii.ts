/**
 * Problem: Meeting Rooms II (LeetCode 253 analog)
 * Difficulty: Medium
 * Pattern: HP6 - Heap-based scheduling
 *
 * Find minimum conference rooms required given an array of meeting intervals.
 */

// --- Optimal Approach (Min-Heap of Meeting End Times) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
export function minMeetingRooms(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  // Sort meetings by start time
  intervals.sort((a, b) => a[0] - b[0]);

  // Min-heap tracking end times of active meetings
  const endTimes: number[] = [];

  const pushHeap = (time: number) => {
    endTimes.push(time);
    endTimes.sort((a, b) => a - b);
  };

  pushHeap(intervals[0][1]);

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    // If the earliest ending meeting finished before current meeting starts, reuse room
    if (start >= endTimes[0]) {
      endTimes.shift();
    }
    pushHeap(end);
  }

  return endTimes.length;
}

// --- Test Verification ---
console.assert(minMeetingRooms([[0, 30], [5, 10], [15, 20]]) === 2, "Test 1 failed");
console.assert(minMeetingRooms([[7, 10], [2, 4]]) === 1, "Test 2 failed");
