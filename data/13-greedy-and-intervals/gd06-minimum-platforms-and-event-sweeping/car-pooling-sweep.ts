/**
 * Pattern: Minimum platforms and event sweeping
 * Problem: Car Pooling (LeetCode 1094)
 *
 * There is a car with capacity empty seats. Given trips[i] = [numPassengers_i, from_i, to_i],
 * return true if it is possible to pick up and drop off all passengers for all the given trips.
 */

// Brute Force: Array of stops tracking passenger count at every point
// Time: O(N * MaxDist), Space: O(MaxDist)
export function carPoolingBrute(trips: number[][], capacity: number): boolean {
  const stops = new Array(1001).fill(0);
  for (const [passengers, from, to] of trips) {
    for (let i = from; i < to; i++) {
      stops[i] += passengers;
      if (stops[i] > capacity) return false;
    }
  }
  return true;
}

// Optimal: Event Sweep Line (Prefix Difference Array)
// Time: O(N log N), Space: O(N)
export function carPoolingOptimal(trips: number[][], capacity: number): boolean {
  const events: [number, number][] = [];
  for (const [passengers, from, to] of trips) {
    events.push([from, passengers]); // pick up
    events.push([to, -passengers]);  // drop off
  }

  // Sort by location. In case of tie, process drop-offs (-passengers) before pick-ups (+passengers)
  events.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  let currentPassengers = 0;
  for (const [, delta] of events) {
    currentPassengers += delta;
    if (currentPassengers > capacity) return false;
  }

  return true;
}

// Test cases
const cpTrips = [[2, 1, 5], [3, 3, 7]];
if (carPoolingBrute(cpTrips, 4) || carPoolingOptimal(cpTrips, 4)) throw new Error("Expected false for capacity 4");
if (!carPoolingOptimal(cpTrips, 5)) throw new Error("Expected true for capacity 5");
console.log("Car Pooling Sweep passed!");
