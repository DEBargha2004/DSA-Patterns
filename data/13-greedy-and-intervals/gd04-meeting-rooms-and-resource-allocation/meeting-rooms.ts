/**
 * Pattern: Meeting rooms and resource allocation
 * Problem: Meeting Rooms (LeetCode 252)
 *
 * Given an array of meeting time intervals intervals[i] = [start_i, end_i],
 * determine if a person could attend all meetings.
 */

// Brute Force: Compare every pair of intervals for any overlap
// Time: O(N^2), Space: O(1)
export function canAttendMeetingsBrute(intervals: number[][]): boolean {
  const n = intervals.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (Math.max(intervals[i][0], intervals[j][0]) < Math.min(intervals[i][1], intervals[j][1])) {
        return false;
      }
    }
  }
  return true;
}

// Optimal: Sort by start time and verify no adjacent collision
// Time: O(N log N), Space: O(1) auxiliary
export function canAttendMeetingsOptimal(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }
  return true;
}

// Test cases
const mr1 = [[0, 30], [5, 10], [15, 20]];
if (canAttendMeetingsBrute(mr1) || canAttendMeetingsOptimal(mr1)) throw new Error("Expected false for colliding meetings");
const mr2 = [[7, 10], [2, 4]];
if (!canAttendMeetingsOptimal(mr2)) throw new Error("Expected true for disjoint meetings");
console.log("Meeting Rooms passed!");
