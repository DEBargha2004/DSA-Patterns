/**
 * Problem: Heaters (LeetCode 475)
 * Difficulty: Medium
 * Pattern: TP9 - Merging two sorted sequences / Two pointers
 *
 * Find minimum radius needed for heaters to warm all houses.
 */

// --- Optimal Approach (Sort Both + Two Pointers Closest Heater Search) ---
// Time Complexity: O(H log H + N log N)
// Space Complexity: O(1)
export function findRadius(houses: number[], heaters: number[]): number {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);

  let radius = 0;
  let j = 0;

  for (let i = 0; i < houses.length; i++) {
    // Advance heater pointer while next heater is closer to current house
    while (j + 1 < heaters.length &&
           Math.abs(heaters[j + 1] - houses[i]) <= Math.abs(heaters[j] - houses[i])) {
      j++;
    }
    radius = Math.max(radius, Math.abs(heaters[j] - houses[i]));
  }

  return radius;
}

// --- Test Verification ---
console.assert(findRadius([1, 2, 3], [2]) === 1, "Test 1 failed");
console.assert(findRadius([1, 2, 3, 4], [1, 4]) === 1, "Test 2 failed");
