/**
 * Problem: Car Pooling (LeetCode 1094)
 * Difficulty: Medium
 * Pattern: A17 - Difference arrays and range updates
 *
 * There is a car with capacity empty seats. The vehicle only drives east.
 * Given an integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi].
 * Return true if it is possible to pick up and drop off all passengers for all the given trips.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n * max_distance)
// Space Complexity: O(max_distance)
export function carPoolingBruteForce(trips: number[][], capacity: number): boolean {
  const stops = new Array<number>(1001).fill(0);
  for (const [passengers, from, to] of trips) {
    for (let i = from; i < to; i++) {
      stops[i] += passengers;
      if (stops[i] > capacity) return false;
    }
  }
  return true;
}

// --- 2. Optimal Approach (Difference Array / Bucket Sweep) ---
// Time Complexity: O(trips.length + max_distance)
// Space Complexity: O(max_distance) = O(1001) = O(1)
// Passenger boarded at `from`, passenger dropped off strictly before `to` (at `to`).
export function carPoolingOptimal(trips: number[][], capacity: number): boolean {
  const diff = new Array<number>(1001).fill(0);

  for (const [passengers, from, to] of trips) {
    diff[from] += passengers;
    diff[to] -= passengers;
  }

  let currentPassengers = 0;
  for (let i = 0; i <= 1000; i++) {
    currentPassengers += diff[i];
    if (currentPassengers > capacity) {
      return false;
    }
  }

  return true;
}

// --- Test Verification ---
console.assert(carPoolingOptimal([[2, 1, 5], [3, 3, 7]], 4) === false, "Test 1 failed");
console.assert(carPoolingOptimal([[2, 1, 5], [3, 3, 7]], 5) === true, "Test 2 failed");
