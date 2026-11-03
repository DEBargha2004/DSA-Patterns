/**
 * Problem: Check If N and Its Double Exist (LeetCode 1346)
 * Difficulty: Easy
 * Pattern: A4 - Complement lookup
 *
 * Given an array arr of integers, check if there exist two indices i and j such that:
 * i != j and arr[i] == 2 * arr[j].
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1)
export function checkIfExistBruteForce(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (i !== j && arr[i] === 2 * arr[j]) {
        return true;
      }
    }
  }
  return false;
}

// --- 2. Optimal Approach (Hash Set Dual-Complement Check) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
// For each x, check if 2*x or (x / 2 when x is even) has already been seen.
export function checkIfExistOptimal(arr: number[]): boolean {
  const seen = new Set<number>();

  for (const num of arr) {
    if (seen.has(num * 2) || (num % 2 === 0 && seen.has(num / 2))) {
      return true;
    }
    seen.add(num);
  }

  return false;
}

// --- Test Verification ---
console.assert(checkIfExistOptimal([10, 2, 5, 3]) === true, "Test 1 failed");
console.assert(checkIfExistOptimal([3, 1, 7, 11]) === false, "Test 2 failed");
