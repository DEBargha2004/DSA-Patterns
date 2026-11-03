/**
 * Problem: Trapping Rain Water (LeetCode 42)
 * Difficulty: Hard
 * Pattern: SQ11 - Histogram and boundary contribution
 *
 * Compute how much water it can trap after raining using monotonic stack.
 */

// --- Optimal Approach (Monotonic Decreasing Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function trap(height: number[]): number {
  let totalWater = 0;
  const stack: number[] = []; // stores indices

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const bottomIdx = stack.pop()!;
      if (stack.length === 0) break;

      const leftIdx = stack[stack.length - 1];
      const distance = i - leftIdx - 1;
      const boundedHeight = Math.min(height[leftIdx], height[i]) - height[bottomIdx];
      totalWater += distance * boundedHeight;
    }
    stack.push(i);
  }

  return totalWater;
}

// --- Test Verification ---
console.assert(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) === 6, "Test 1 failed");
console.assert(trap([4, 2, 0, 3, 2, 5]) === 9, "Test 2 failed");
console.assert(trap([3, 0, 2, 0, 4]) === 7, "Test 3 failed");
