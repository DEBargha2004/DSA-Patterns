/**
 * Problem: Fruit Into Baskets (LeetCode 904)
 * Difficulty: Medium
 * Pattern: SW2 - Variable-size window
 *
 * Longest contiguous subarray with at most 2 distinct integers.
 */

// --- Optimal Approach (Variable Sliding Window with 2 Types) ---
// Time Complexity: O(n)
// Space Complexity: O(1) - at most 3 elements in map
export function totalFruit(fruits: number[]): number {
  const basket = new Map<number, number>();
  let left = 0;
  let maxFruits = 0;

  for (let right = 0; right < fruits.length; right++) {
    basket.set(fruits[right], (basket.get(fruits[right]) ?? 0) + 1);

    while (basket.size > 2) {
      const lFruit = fruits[left];
      basket.set(lFruit, basket.get(lFruit)! - 1);
      if (basket.get(lFruit) === 0) {
        basket.delete(lFruit);
      }
      left++;
    }

    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}

// --- Test Verification ---
console.assert(totalFruit([1, 2, 1]) === 3, "Test 1 failed");
console.assert(totalFruit([0, 1, 2, 2]) === 3, "Test 2 failed");
console.assert(totalFruit([1, 2, 3, 2, 2]) === 4, "Test 3 failed");
