/**
 * Problem: Next Greater Element I (LeetCode 496)
 * Difficulty: Easy
 * Pattern: SQ4 - Monotonic decreasing stack
 *
 * Find all the next greater numbers for nums1's elements in the corresponding places of nums2.
 */

// --- Optimal Approach (Monotonic Stack + Hash Map) ---
// Time Complexity: O(n + m) where n = nums1.length, m = nums2.length
// Space Complexity: O(m)
export function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const map = new Map<number, number>();
  const stack: number[] = [];

  for (const num of nums2) {
    while (stack.length > 0 && stack[stack.length - 1] < num) {
      map.set(stack.pop()!, num);
    }
    stack.push(num);
  }

  return nums1.map((num) => map.get(num) ?? -1);
}

// --- Test Verification ---
console.assert(JSON.stringify(nextGreaterElement([4, 1, 2], [1, 3, 4, 2])) === JSON.stringify([-1, 3, -1]), "Test 1 failed");
console.assert(JSON.stringify(nextGreaterElement([2, 4], [1, 2, 3, 4])) === JSON.stringify([3, -1]), "Test 2 failed");
