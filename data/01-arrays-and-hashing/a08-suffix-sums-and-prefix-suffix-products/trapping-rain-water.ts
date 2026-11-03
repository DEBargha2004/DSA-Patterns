/**
 * Problem: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Pattern: A8 - Suffix sums and prefix/suffix products
 *
 * Given n non-negative integers representing an elevation map where the width of each bar is 1,
 * compute how much water it can trap after raining.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - for each bar, scan left and right max
// Space Complexity: O(1)
export function trapBruteForce(height: number[]): number {
  let water = 0;
  const n = height.length;
  for (let i = 0; i < n; i++) {
    let leftMax = 0;
    let rightMax = 0;
    for (let l = 0; l <= i; l++) leftMax = Math.max(leftMax, height[l]);
    for (let r = i; r < n; r++) rightMax = Math.max(rightMax, height[r]);
    water += Math.min(leftMax, rightMax) - height[i];
  }
  return water;
}

// --- 2. Better Approach (Prefix Max and Suffix Max Arrays) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function trapPrefixSuffix(height: number[]): number {
  const n = height.length;
  if (n <= 2) return 0;

  const leftMax = new Array<number>(n);
  const rightMax = new Array<number>(n);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], height[i]);

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], height[i]);

  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
  }

  return totalWater;
}

// --- 3. Optimal Approach (Two Pointers with Running Boundaries) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
export function trapOptimal(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

// --- Test Verification ---
console.assert(trapOptimal([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6, "Test 1 failed");
console.assert(trapOptimal([4, 2, 0, 3, 2, 5]) === 9, "Test 2 failed");
