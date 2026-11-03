/**
 * Problem: Koko Eating Bananas (LeetCode 875)
 * Difficulty: Medium
 * Pattern: BS6 - Binary search on the answer
 *
 * Find minimum integer speed k to eat all bananas within h hours.
 */

// --- Optimal Approach (Binary Search over Eating Speed [1, max(piles)]) ---
// Time Complexity: O(n log(max(piles)))
// Space Complexity: O(1)
export function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);
  let ans = right;

  function canEatAll(speed: number): boolean {
    let hoursNeeded = 0;
    for (const pile of piles) {
      hoursNeeded += Math.ceil(pile / speed);
    }
    return hoursNeeded <= h;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canEatAll(mid)) {
      ans = mid;
      right = mid - 1; // Try slower speed
    } else {
      left = mid + 1; // Speed too slow, increase
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(minEatingSpeed([3, 6, 7, 11], 8) === 4, "Test 1 failed");
console.assert(minEatingSpeed([30, 11, 23, 4, 20], 5) === 30, "Test 2 failed");
console.assert(minEatingSpeed([30, 11, 23, 4, 20], 6) === 23, "Test 3 failed");
