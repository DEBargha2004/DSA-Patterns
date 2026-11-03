/**
 * Problem: Container With Most Water (LeetCode 11)
 * Difficulty: Medium
 * Pattern: TP7 - Container and area optimization
 *
 * Find two lines that together with x-axis forms container with maximum water.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function maxAreaBruteForce(height: number[]): number {
  let maxW = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const area = Math.min(height[i], height[j]) * (j - i);
      maxW = Math.max(maxW, area);
    }
  }
  return maxW;
}

// --- 2. Optimal Approach (Two Pointers Colliding Greedy) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
// Invariant: The smaller height limits the container. Move the shorter line inward.
export function maxAreaOptimal(height: number[]): number {
  let left = 0, right = height.length - 1;
  let maxW = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);
    maxW = Math.max(maxW, w * h);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxW;
}

// --- Test Verification ---
console.assert(maxAreaOptimal([1, 8, 6, 2, 5, 4, 8, 3, 7]) === 49, "Test 1 failed");
console.assert(maxAreaOptimal([1, 1]) === 1, "Test 2 failed");
