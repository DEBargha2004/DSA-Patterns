/**
 * Problem: Meeting Rooms II (LeetCode 253)
 * Difficulty: Medium
 * Pattern: A19 - Sweep-line processing of array events
 *
 * Given an array of meeting time intervals intervals where intervals[i] = [starti, endi],
 * return the minimum number of conference rooms required.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n * max_time)
// Space Complexity: O(max_time)
export function minMeetingRoomsBruteForce(intervals: number[][]): number {
  if (intervals.length === 0) return 0;
  let maxTime = 0;
  for (const [s, e] of intervals) maxTime = Math.max(maxTime, e);

  const timeline = new Array<number>(maxTime + 1).fill(0);
  for (const [s, e] of intervals) {
    for (let t = s; t < e; t++) {
      timeline[t]++;
    }
  }

  return Math.max(...timeline);
}

// --- 2. Optimal Approach (Sweep-Line Event Processing) ---
// Time Complexity: O(n log n) - sorting events dominates
// Space Complexity: O(n)
// Represents start of meeting as +1 event, end of meeting as -1 event.
// At same timestamp, end events must be processed BEFORE start events.
export function minMeetingRoomsOptimal(intervals: number[][]): number {
  type Event = { time: number; delta: number };
  const events: Event[] = [];

  for (const [start, end] of intervals) {
    events.push({ time: start, delta: 1 });
    events.push({ time: end, delta: -1 });
  }

  events.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.delta - b.delta; // -1 before +1
  });

  let maxRooms = 0;
  let currentRooms = 0;

  for (const event of events) {
    currentRooms += event.delta;
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}

// --- Test Verification ---
console.assert(minMeetingRoomsOptimal([[0, 30], [5, 10], [15, 20]]) === 2, "Test 1 failed");
console.assert(minMeetingRoomsOptimal([[7, 10], [2, 4]]) === 1, "Test 2 failed");
