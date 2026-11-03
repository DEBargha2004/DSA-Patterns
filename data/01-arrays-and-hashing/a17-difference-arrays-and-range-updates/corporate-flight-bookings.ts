/**
 * Problem: Corporate Flight Bookings (LeetCode 1109)
 * Difficulty: Medium
 * Pattern: A17 - Difference arrays and range updates
 *
 * There are n flights, labeled from 1 to n.
 * You are given an array of flight bookings bookings where bookings[i] = [firsti, lasti, seatsi].
 * Return an array answer of length n, where answer[i] is the total number of seats reserved for flight i.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n * bookings.length)
// Space Complexity: O(1) excluding output
export function corpFlightBookingsBruteForce(bookings: number[][], n: number): number[] {
  const result = new Array<number>(n).fill(0);
  for (const [first, last, seats] of bookings) {
    for (let f = first; f <= last; f++) {
      result[f - 1] += seats;
    }
  }
  return result;
}

// --- 2. Optimal Approach (1-Indexed Difference Array) ---
// Time Complexity: O(n + bookings.length)
// Space Complexity: O(n)
export function corpFlightBookingsOptimal(bookings: number[][], n: number): number[] {
  const diff = new Array<number>(n + 2).fill(0);

  for (const [first, last, seats] of bookings) {
    diff[first] += seats;
    diff[last + 1] -= seats;
  }

  const result = new Array<number>(n);
  let runningSeats = 0;
  for (let i = 1; i <= n; i++) {
    runningSeats += diff[i];
    result[i - 1] = runningSeats;
  }

  return result;
}

// --- Test Verification ---
const bookings = [[1, 2, 10], [2, 3, 20], [2, 5, 25]];
console.assert(JSON.stringify(corpFlightBookingsOptimal(bookings, 5)) === JSON.stringify([10, 55, 45, 25, 25]), "Test failed");
