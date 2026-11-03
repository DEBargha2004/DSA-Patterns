/**
 * Problem: Daily Temperatures (LeetCode 739)
 * Difficulty: Medium
 * Pattern: SQ3 - Monotonic increasing stack
 *
 * Given an array of integers temperatures represents the daily temperatures,
 * return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.
 */

// --- Brute Force Approach ---
// Time Complexity: O(n^2)
// Space Complexity: O(1) auxiliary
export function dailyTemperaturesBrute(temperatures: number[]): number[] {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j] > temperatures[i]) {
        res[i] = j - i;
        break;
      }
    }
  }
  return res;
}

// --- Optimal Approach (Monotonic Decreasing Indices Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const res = new Array(n).fill(0);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop()!;
      res[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }

  return res;
}

// --- Test Verification ---
const t1 = [73, 74, 75, 71, 69, 72, 76, 73];
console.assert(JSON.stringify(dailyTemperaturesBrute(t1)) === JSON.stringify([1, 1, 4, 2, 1, 1, 0, 0]), "Brute failed");
console.assert(JSON.stringify(dailyTemperatures(t1)) === JSON.stringify([1, 1, 4, 2, 1, 1, 0, 0]), "Optimal 1 failed");
console.assert(JSON.stringify(dailyTemperatures([30, 40, 50, 60])) === JSON.stringify([1, 1, 1, 0]), "Optimal 2 failed");
console.assert(JSON.stringify(dailyTemperatures([30, 60, 90])) === JSON.stringify([1, 1, 0]), "Optimal 3 failed");
