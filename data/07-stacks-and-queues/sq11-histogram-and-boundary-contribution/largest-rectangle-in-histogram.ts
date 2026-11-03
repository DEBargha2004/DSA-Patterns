/**
 * Problem: Largest Rectangle in Histogram (LeetCode 84)
 * Difficulty: Hard
 * Pattern: SQ11 - Histogram and boundary contribution
 *
 * Find area of largest rectangle in histogram.
 */

// --- Optimal Approach (Monotonic Increasing Stack of Indices) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  const n = heights.length;

  for (let i = 0; i <= n; i++) {
    const currentHeight = i === n ? 0 : heights[i];
    while (stack.length > 0 && currentHeight < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()!];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  return maxArea;
}

// --- Test Verification ---
console.assert(largestRectangleArea([2, 1, 5, 6, 2, 3]) === 10, "Test 1 failed");
console.assert(largestRectangleArea([2, 4]) === 4, "Test 2 failed");
console.assert(largestRectangleArea([1]) === 1, "Test 3 failed");
console.assert(largestRectangleArea([2, 1, 2]) === 3, "Test 4 failed");
