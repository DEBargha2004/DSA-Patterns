/**
 * Problem: Minimum Speed to Arrive on Time (LeetCode 1870)
 * Difficulty: Medium
 * Pattern: BS7 - Minimum feasible capacity or speed
 *
 * Return minimum positive integer speed you must travel at to reach office on time.
 */

// --- Optimal Approach (Binary Search over Speed [1, 10^7]) ---
// Time Complexity: O(n log(10^7))
// Space Complexity: O(1)
export function minSpeedOnTime(dist: number[], hour: number): number {
  const n = dist.length;
  if (hour <= n - 1) return -1;

  let left = 1;
  let right = 10000000;
  let ans = -1;

  function canReach(speed: number): boolean {
    let totalTime = 0;
    for (let i = 0; i < n - 1; i++) {
      totalTime += Math.ceil(dist[i] / speed);
    }
    totalTime += dist[n - 1] / speed;
    return totalTime <= hour;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canReach(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(minSpeedOnTime([1, 3, 2], 6) === 1, "Test 1 failed");
console.assert(minSpeedOnTime([1, 3, 2], 2.7) === 3, "Test 2 failed");
console.assert(minSpeedOnTime([1, 3, 2], 1.9) === -1, "Test 3 failed");
