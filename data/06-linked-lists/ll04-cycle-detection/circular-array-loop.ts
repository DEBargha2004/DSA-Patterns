/**
 * Problem: Circular Array Loop (LeetCode 457)
 * Difficulty: Medium
 * Pattern: LL4 - Cycle detection
 *
 * Determine if there is a cycle in array where cycle consists of only one direction and length > 1.
 */

// --- Optimal Approach (Fast & Slow Pointers with In-Place Visited Marking) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function circularArrayLoop(nums: number[]): boolean {
  const n = nums.length;

  function next(i: number): number {
    return (((i + nums[i]) % n) + n) % n;
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) continue;

    let slow = i;
    let fast = next(i);

    // Direction must be consistent (same sign)
    while (nums[slow] * nums[fast] > 0 && nums[slow] * nums[next(fast)] > 0) {
      if (slow === fast) {
        // Cycle of length 1 is invalid
        if (slow === next(slow)) break;
        return true;
      }
      slow = next(slow);
      fast = next(next(fast));
    }

    // Mark all elements in this traversal as 0 (visited)
    slow = i;
    const val = nums[i];
    while (nums[slow] * val > 0) {
      const nxt = next(slow);
      nums[slow] = 0;
      slow = nxt;
    }
  }

  return false;
}

// --- Test Verification ---
console.assert(circularArrayLoop([2, -1, 1, 2, 2]) === true, "Test 1 failed");
console.assert(circularArrayLoop([-1, 2]) === false, "Test 2 failed");
