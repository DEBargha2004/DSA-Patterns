/**
 * Problem: Number of Flowers in Full Bloom (LeetCode 2251)
 * Difficulty: Hard
 * Pattern: A19 - Sweep-line processing of array events
 *
 * You are given a 0-indexed 2D integer array flowers, where flowers[i] = [starti, endi].
 * You are also given a 0-indexed integer array people where people[i] is the arrival time of the ith person.
 * Return an integer array answer of size n, where answer[i] is the number of flowers in bloom when person i arrives.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(people.length * flowers.length)
// Space Complexity: O(1) excluding output
export function fullBloomFlowersBruteForce(flowers: number[][], people: number[]): number[] {
  const result: number[] = [];
  for (const p of people) {
    let count = 0;
    for (const [s, e] of flowers) {
      if (p >= s && p <= e) count++;
    }
    result.push(count);
  }
  return result;
}

// --- 2. Optimal Approach (Binary Search over Sorted Starts and Ends) ---
// Time Complexity: O((F + P) log F) where F = flowers.length, P = people.length
// Space Complexity: O(F)
// Number of flowers in bloom at time t = (flowers started <= t) - (flowers ended < t)
export function fullBloomFlowersOptimal(flowers: number[][], people: number[]): number[] {
  const starts = flowers.map((f) => f[0]).sort((a, b) => a - b);
  const ends = flowers.map((f) => f[1]).sort((a, b) => a - b);

  function countStarted(target: number): number {
    let left = 0;
    let right = starts.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (starts[mid] <= target) left = mid + 1;
      else right = mid;
    }
    return left;
  }

  function countEnded(target: number): number {
    let left = 0;
    let right = ends.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (ends[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  }

  return people.map((p) => countStarted(p) - countEnded(p));
}

// --- Test Verification ---
const flowers = [[1, 6], [3, 7], [9, 12], [4, 13]];
const people = [2, 3, 7, 11];
console.assert(JSON.stringify(fullBloomFlowersOptimal(flowers, people)) === JSON.stringify([1, 2, 2, 2]), "Test failed");
