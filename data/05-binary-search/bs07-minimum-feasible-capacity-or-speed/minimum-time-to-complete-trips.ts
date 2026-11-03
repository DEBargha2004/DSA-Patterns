/**
 * Problem: Minimum Time to Complete Trips (LeetCode 2187)
 * Difficulty: Medium
 * Pattern: BS7 - Minimum feasible capacity or speed
 *
 * Find minimum time required for all buses to complete totalTrips.
 */

// --- Optimal Approach (Binary Search over Time [1, min(time) * totalTrips]) ---
// Time Complexity: O(n log(min(time) * totalTrips))
// Space Complexity: O(1)
export function minimumTime(time: number[], totalTrips: number): number {
  let left = 1;
  const minTime = Math.min(...time);
  let right = minTime * totalTrips;
  let ans = right;

  function countTrips(t: number): boolean {
    let trips = 0;
    for (const bus of time) {
      trips += Math.floor(t / bus);
      if (trips >= totalTrips) return true;
    }
    return false;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (countTrips(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(minimumTime([1, 2, 3], 5) === 3, "Test 1 failed");
console.assert(minimumTime([2], 1) === 2, "Test 2 failed");
