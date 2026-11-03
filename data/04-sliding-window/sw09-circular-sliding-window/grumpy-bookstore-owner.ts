/**
 * Problem: Grumpy Bookstore Owner (LeetCode 1052)
 * Difficulty: Medium
 * Pattern: SW9 - Circular sliding window / Fixed window
 *
 * Use secret technique for minutes to keep owner not grumpy and maximize satisfied customers.
 */

// --- Optimal Approach (Base Satisfied + Sliding Window Max Extra Satisfied) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function maxSatisfied(customers: number[], grumpy: number[], minutes: number): number {
  let baseSatisfied = 0;
  for (let i = 0; i < customers.length; i++) {
    if (grumpy[i] === 0) baseSatisfied += customers[i];
  }

  let extra = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i] === 1) extra += customers[i];
  }

  let maxExtra = extra;

  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i] === 1) extra += customers[i];
    if (grumpy[i - minutes] === 1) extra -= customers[i - minutes];
    maxExtra = Math.max(maxExtra, extra);
  }

  return baseSatisfied + maxExtra;
}

// --- Test Verification ---
console.assert(maxSatisfied([1, 0, 1, 2, 1, 1, 7, 5], [0, 1, 0, 1, 0, 1, 0, 1], 3) === 16, "Test 1 failed");
console.assert(maxSatisfied([1], [0], 1) === 1, "Test 2 failed");
