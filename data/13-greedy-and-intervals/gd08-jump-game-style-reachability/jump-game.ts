/**
 * Pattern: Jump-game-style reachability
 * Problem: Jump Game (LeetCode 55)
 *
 * Given an integer array nums, you are initially positioned at index 0.
 * Each element represents maximum jump length at that position. Return true if you can reach the last index.
 */

// Brute Force: Backtracking DFS checking all jumps
// Time: O(2^N), Space: O(N)
export function canJumpBrute(nums: number[]): boolean {
  function canReach(position: number): boolean {
    if (position === nums.length - 1) return true;

    const furthestJump = Math.min(position + nums[position], nums.length - 1);
    for (let nextPos = furthestJump; nextPos > position; nextPos--) {
      if (canReach(nextPos)) return true;
    }
    return false;
  }

  return canReach(0);
}

// Optimal: Greedy Maximum Reach Tracking
// Invariant: Maintain the furthest reachable index. If current index > maxReach, unreachable.
// Time: O(N), Space: O(1)
export function canJumpOptimal(nums: number[]): boolean {
  let maxReach = 0;
  const target = nums.length - 1;

  for (let i = 0; i <= maxReach; i++) {
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= target) return true;
  }

  return false;
}

// Test cases
if (!canJumpBrute([2, 3, 1, 1, 4]) || !canJumpOptimal([2, 3, 1, 1, 4])) throw new Error("Expected true");
if (canJumpOptimal([3, 2, 1, 0, 4])) throw new Error("Expected false");
console.log("Jump Game passed!");
