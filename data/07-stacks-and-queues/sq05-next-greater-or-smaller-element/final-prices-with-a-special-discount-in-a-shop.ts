/**
 * Problem: Final Prices With a Special Discount in a Shop (LeetCode 1475)
 * Difficulty: Easy
 * Pattern: SQ5 - Next greater or smaller element
 *
 * Find next smaller or equal element in prices array.
 */

// --- Optimal Approach (Monotonic Stack for Next Smaller or Equal Element) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function finalPrices(prices: number[]): number[] {
  const res = [...prices];
  const stack: number[] = []; // stores indices of prices

  for (let i = 0; i < prices.length; i++) {
    while (stack.length > 0 && prices[stack[stack.length - 1]] >= prices[i]) {
      const idx = stack.pop()!;
      res[idx] -= prices[i];
    }
    stack.push(i);
  }

  return res;
}

// --- Test Verification ---
console.assert(JSON.stringify(finalPrices([8, 4, 6, 2, 3])) === JSON.stringify([4, 2, 4, 2, 3]), "Test 1 failed");
console.assert(JSON.stringify(finalPrices([1, 2, 3, 4, 5])) === JSON.stringify([1, 2, 3, 4, 5]), "Test 2 failed");
console.assert(JSON.stringify(finalPrices([10, 1, 1, 6])) === JSON.stringify([9, 0, 1, 6]), "Test 3 failed");
