/**
 * Problem: Maximal Rectangle (LeetCode 85)
 * Difficulty: Hard
 * Pattern: SQ11 - Histogram and boundary contribution
 *
 * Given a rows x cols binary matrix filled with 0's and 1's,
 * find the largest rectangle containing only 1's and return its area.
 */

// --- Optimal Approach (Dynamic Heights + Monotonic Stack for each row) ---
// Time Complexity: O(rows * cols)
// Space Complexity: O(cols)
export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;
  const cols = matrix[0].length;
  const heights = new Array(cols).fill(0);
  let maxArea = 0;

  for (const row of matrix) {
    for (let c = 0; c < cols; c++) {
      heights[c] = row[c] === "1" ? heights[c] + 1 : 0;
    }

    // Monotonic stack on heights
    const stack: number[] = [];
    for (let i = 0; i <= cols; i++) {
      const h = i === cols ? 0 : heights[i];
      while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
        const height = heights[stack.pop()!];
        const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
        maxArea = Math.max(maxArea, height * width);
      }
      stack.push(i);
    }
  }

  return maxArea;
}

// --- Test Verification ---
const mat = [
  ["1", "0", "1", "0", "0"],
  ["1", "0", "1", "1", "1"],
  ["1", "1", "1", "1", "1"],
  ["1", "0", "0", "1", "0"]
];
console.assert(maximalRectangle(mat) === 6, "Test 1 failed");
console.assert(maximalRectangle([["0"]]) === 0, "Test 2 failed");
console.assert(maximalRectangle([["1"]]) === 1, "Test 3 failed");
