/**
 * Problem: Majority Element II (LeetCode 229)
 * Difficulty: Medium
 * Pattern: A14 - Boyer–Moore majority vote
 *
 * Given an integer array of size n, find all elements that appear more than floor(n / 3) times.
 * Must run in linear time and in O(1) space.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function majorityElementIIBruteForce(nums: number[]): number[] {
  const threshold = Math.floor(nums.length / 3);
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (result.includes(nums[i])) continue;
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === nums[i]) count++;
    }
    if (count > threshold) {
      result.push(nums[i]);
    }
  }

  return result;
}

// --- 2. Optimal Approach (Boyer-Moore 2-Candidate Extension) ---
// Time Complexity: O(n) - two passes
// Space Complexity: O(1)
// At most 2 elements can appear > floor(n / 3) times.
export function majorityElementIIOptimal(nums: number[]): number[] {
  let candidate1: number | null = null;
  let candidate2: number | null = null;
  let count1 = 0;
  let count2 = 0;

  // Pass 1: Identify top 2 potential candidates
  for (const num of nums) {
    if (candidate1 !== null && num === candidate1) {
      count1++;
    } else if (candidate2 !== null && num === candidate2) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  // Pass 2: Verify candidate frequencies
  const result: number[] = [];
  const threshold = Math.floor(nums.length / 3);
  let actual1 = 0;
  let actual2 = 0;

  for (const num of nums) {
    if (candidate1 !== null && num === candidate1) actual1++;
    else if (candidate2 !== null && num === candidate2) actual2++;
  }

  if (candidate1 !== null && actual1 > threshold) result.push(candidate1);
  if (candidate2 !== null && actual2 > threshold) result.push(candidate2);

  return result;
}

// --- Test Verification ---
console.assert(JSON.stringify(majorityElementIIOptimal([3, 2, 3])) === JSON.stringify([3]), "Test 1 failed");
console.assert(JSON.stringify(majorityElementIIOptimal([1, 2])) === JSON.stringify([1, 2]), "Test 2 failed");
