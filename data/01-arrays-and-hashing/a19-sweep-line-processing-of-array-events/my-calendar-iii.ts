/**
 * Problem: My Calendar III (LeetCode 732)
 * Difficulty: Hard
 * Pattern: A19 - Sweep-line processing of array events
 *
 * Implement a MyCalendarThree class to store your events. A new event can always be added.
 * Return an integer k representing the largest integer such that there exists a k-booking.
 */

// --- 1. Optimal Approach (Sweep-Line Coordinate Diff Map) ---
// Time Complexity: O(n^2) over n bookings (each book call scans sorted boundary timestamps)
// Space Complexity: O(n)
export class MyCalendarThree {
  private delta: Map<number, number>;

  constructor() {
    this.delta = new Map<number, number>();
  }

  book(startTime: number, endTime: number): number {
    this.delta.set(startTime, (this.delta.get(startTime) ?? 0) + 1);
    this.delta.set(endTime, (this.delta.get(endTime) ?? 0) - 1);

    const sortedTimes = Array.from(this.delta.keys()).sort((a, b) => a - b);
    let active = 0;
    let maxK = 0;

    for (const time of sortedTimes) {
      active += this.delta.get(time)!;
      maxK = Math.max(maxK, active);
    }

    return maxK;
  }
}

// --- Test Verification ---
const cal = new MyCalendarThree();
console.assert(cal.book(10, 20) === 1, "Test 1 failed");
console.assert(cal.book(50, 60) === 1, "Test 2 failed");
console.assert(cal.book(10, 40) === 2, "Test 3 failed");
console.assert(cal.book(5, 15) === 3, "Test 4 failed");
console.assert(cal.book(5, 10) === 3, "Test 5 failed");
console.assert(cal.book(25, 55) === 3, "Test 6 failed");
