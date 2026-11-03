/**
 * Pattern: Meeting rooms and resource allocation
 * Problem: Meeting Rooms II (LeetCode 253)
 *
 * Given an array of meeting time intervals intervals[i] = [start_i, end_i],
 * return the minimum number of conference rooms required.
 */

// Brute Force: Chronological Event Sweep with sorted points
// Time: O(N log N), Space: O(N)
export function minMeetingRoomsSweep(intervals: number[][]): number {
  const events: [number, number][] = []; // [time, +1 for start, -1 for end]
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }

  // If time is equal, process end (-1) before start (+1)
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let maxRooms = 0;
  let currentRooms = 0;
  for (const [, delta] of events) {
    currentRooms += delta;
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}

// Optimal: Min-Heap Tracking Earliest Available Room End Time
// Time: O(N log N), Space: O(N)
class MinHeap {
  private data: number[] = [];
  size(): number { return this.data.length; }
  peek(): number | undefined { return this.data[0]; }

  push(val: number): void {
    this.data.push(val);
    let idx = this.data.length - 1;
    while (idx > 0) {
      const p = (idx - 1) >> 1;
      if (this.data[p] <= this.data[idx]) break;
      [this.data[p], this.data[idx]] = [this.data[idx], this.data[p]];
      idx = p;
    }
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;
    const top = this.data[0];
    const last = this.data.pop()!;
    if (this.data.length > 0) {
      this.data[0] = last;
      let idx = 0;
      const len = this.data.length;
      while ((idx << 1) + 1 < len) {
        let left = (idx << 1) + 1;
        let right = left + 1;
        let smallest = (right < len && this.data[right] < this.data[left]) ? right : left;
        if (this.data[idx] <= this.data[smallest]) break;
        [this.data[idx], this.data[smallest]] = [this.data[smallest], this.data[idx]];
        idx = smallest;
      }
    }
    return top;
  }
}

export function minMeetingRoomsOptimal(intervals: number[][]): number {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);

  const heap = new MinHeap();
  heap.push(intervals[0][1]);

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];
    if (heap.peek()! <= start) {
      heap.pop(); // Reuse room
    }
    heap.push(end);
  }

  return heap.size();
}

// Test cases
const roomsTest = [[0, 30], [5, 10], [15, 20]];
if (minMeetingRoomsSweep(roomsTest) !== 2 || minMeetingRoomsOptimal(roomsTest) !== 2) {
  throw new Error("Expected 2 meeting rooms");
}
console.log("Meeting Rooms II passed!");
