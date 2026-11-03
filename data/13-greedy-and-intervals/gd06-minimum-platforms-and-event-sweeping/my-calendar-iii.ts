/**
 * Pattern: Minimum platforms and event sweeping
 * Problem: My Calendar III (LeetCode 732)
 *
 * Implement a MyCalendarThree class to store events and return the maximum k-booking.
 */

// Brute Force: Array of events scanned completely on every book call
// Time: O(N^2 log N), Space: O(N)
export class MyCalendarThreeBrute {
  private events: [number, number][] = [];

  book(startTime: number, endTime: number): number {
    this.events.push([startTime, 1]);
    this.events.push([endTime, -1]);

    this.events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

    let maxK = 0;
    let active = 0;
    for (const [, delta] of this.events) {
      active += delta;
      maxK = Math.max(maxK, active);
    }
    return maxK;
  }
}

// Optimal: Boundary Event Map (Sweeping Line with delta updates)
// Time: O(N^2) or O(N log N with balanced tree / sorted map), Space: O(N)
export class MyCalendarThreeOptimal {
  private timeline = new Map<number, number>();

  book(startTime: number, endTime: number): number {
    this.timeline.set(startTime, (this.timeline.get(startTime) || 0) + 1);
    this.timeline.set(endTime, (this.timeline.get(endTime) || 0) - 1);

    const sortedTimes = Array.from(this.timeline.keys()).sort((a, b) => a - b);
    let maxK = 0;
    let active = 0;

    for (const time of sortedTimes) {
      active += this.timeline.get(time)!;
      maxK = Math.max(maxK, active);
    }

    return maxK;
  }
}

// Test cases
const cal1 = new MyCalendarThreeBrute();
const cal2 = new MyCalendarThreeOptimal();
const bookings = [[10, 20], [50, 60], [10, 40], [5, 15], [5, 10], [25, 55]];
for (const [s, e] of bookings) {
  const k1 = cal1.book(s, e);
  const k2 = cal2.book(s, e);
  if (k1 !== k2) throw new Error("Mismatch in calendar 3");
}
console.log("My Calendar III passed!");
