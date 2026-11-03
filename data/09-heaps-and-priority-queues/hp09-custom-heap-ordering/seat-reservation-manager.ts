/**
 * Problem: Seat Reservation Manager (LeetCode 1845)
 * Difficulty: Medium
 * Pattern: HP9 - Custom heap ordering
 *
 * System managing n seats from 1 to n with reserve (smallest seat) and unreserve.
 */

// --- Optimal Approach (Min-Heap of Available Seats) ---
// Time Complexity: reserve: O(log n), unreserve: O(log n)
// Space Complexity: O(n)
export class SeatManager {
  private minHeap: number[] = [];

  constructor(n: number) {
    for (let i = 1; i <= n; i++) {
      this.minHeap.push(i);
    }
  }

  reserve(): number {
    return this.minHeap.shift()!;
  }

  unreserve(seatNumber: number): void {
    let low = 0, high = this.minHeap.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (this.minHeap[mid] < seatNumber) low = mid + 1;
      else high = mid - 1;
    }
    this.minHeap.splice(low, 0, seatNumber);
  }
}

// --- Test Verification ---
const sm = new SeatManager(5);
console.assert(sm.reserve() === 1, "Test 1 failed");
console.assert(sm.reserve() === 2, "Test 2 failed");
sm.unreserve(2);
console.assert(sm.reserve() === 2, "Test 3 failed");
console.assert(sm.reserve() === 3, "Test 4 failed");
