/**
 * Problem: Boats to Save People (LeetCode 881)
 * Difficulty: Medium
 * Pattern: TP7 - Container and area optimization (Greedy pairing)
 *
 * Return minimum number of boats to carry every person, where each boat carries at most 2 people
 * and total weight <= limit.
 */

// --- Optimal Approach (Sort + Two Pointers Greedy Heaviest & Lightest) ---
// Time Complexity: O(n log n)
// Space Complexity: O(1)
export function numRescueBoats(people: number[], limit: number): number {
  people.sort((a, b) => a - b);
  let l = 0, r = people.length - 1;
  let boats = 0;

  while (l <= r) {
    // If lightest person fits with heaviest, pair them
    if (people[l] + people[r] <= limit) {
      l++;
    }
    // Heaviest person always takes a boat
    r--;
    boats++;
  }

  return boats;
}

// --- Test Verification ---
console.assert(numRescueBoats([1, 2], 3) === 1, "Test 1 failed");
console.assert(numRescueBoats([3, 2, 2, 1], 3) === 3, "Test 2 failed");
console.assert(numRescueBoats([3, 5, 3, 4], 5) === 4, "Test 3 failed");
