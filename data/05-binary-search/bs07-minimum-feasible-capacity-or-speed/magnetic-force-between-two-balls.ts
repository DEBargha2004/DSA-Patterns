/**
 * Problem: Magnetic Force Between Two Balls (LeetCode 1552)
 * Difficulty: Medium
 * Pattern: BS7 - Minimum feasible capacity or speed (Aggressive Cows variant)
 *
 * Distribute m balls in baskets at position[i] such that the minimum magnetic force between any two balls is maximized.
 */

// --- Optimal Approach (Sort + Binary Search on Max Minimum Distance) ---
// Time Complexity: O(n log n + n log(max - min))
// Space Complexity: O(1) auxiliary
export function maxDistance(position: number[], m: number): number {
  position.sort((a, b) => a - b);
  let left = 1;
  let right = position[position.length - 1] - position[0];
  let ans = 1;

  function canPlace(force: number): boolean {
    let count = 1;
    let lastPos = position[0];

    for (let i = 1; i < position.length; i++) {
      if (position[i] - lastPos >= force) {
        count++;
        lastPos = position[i];
      }
      if (count === m) return true;
    }

    return false;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canPlace(mid)) {
      ans = mid;
      left = mid + 1; // Try larger distance
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(maxDistance([1, 2, 3, 4, 7], 3) === 3, "Test 1 failed");
console.assert(maxDistance([5, 4, 3, 2, 1, 1000000000], 2) === 999999999, "Test 2 failed");
