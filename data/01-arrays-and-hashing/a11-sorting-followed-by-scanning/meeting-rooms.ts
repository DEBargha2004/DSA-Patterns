/**
 * Problem: Meeting Rooms (LeetCode 252)
 * Difficulty: Easy
 * Pattern: A11 - Sorting followed by scanning
 *
 * Given an array of meeting time intervals where intervals[i] = [starti, endi],
 * determine if a person could attend all meetings.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - pairwise overlap check
// Space Complexity: O(1)
export function canAttendMeetingsBruteForce(intervals: number[][]): boolean {
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      const [s1, e1] = intervals[i];
      const [s2, e2] = intervals[j];
      // Overlap exists if max(s1, s2) < min(e1, e2)
      if (Math.max(s1, s2) < Math.min(e1, e2)) {
        return false;
      }
    }
  }
  return true;
}

// --- 2. Optimal Approach (Sort by Start Time + Adjacent Scan) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1) or O(log n)
export function canAttendMeetingsOptimal(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) {
      return false;
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(canAttendMeetingsOptimal([[0, 30], [5, 10], [15, 20]]) === false, "Test 1 failed");
console.assert(canAttendMeetingsOptimal([[7, 10], [2, 4]]) === true, "Test 2 failed");
