/**
 * Problem: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Pattern: TP7 - Container and area optimization
 *
 * Compute how much water elevation map can trap after raining.
 */

// --- Optimal Approach (Two Pointers with Left/Right Max Boundary Tracking) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function trap(height: number[]): number {
  let l = 0, r = height.length - 1;
  let lMax = 0, rMax = 0;
  let water = 0;

  while (l < r) {
    if (height[l] < height[r]) {
      if (height[l] >= lMax) lMax = height[l];
      else water += lMax - height[l];
      l++;
    } else {
      if (height[r] >= rMax) rMax = height[r];
      else water += rMax - height[r];
      r--;
    }
  }

  return water;
}

// --- Test Verification ---
console.assert(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6, "Test 1 failed");
console.assert(trap([4, 2, 0, 3, 2, 5]) === 9, "Test 2 failed");
