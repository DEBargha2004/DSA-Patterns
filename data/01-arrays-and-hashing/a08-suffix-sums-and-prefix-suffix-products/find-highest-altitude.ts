/**
 * Problem: Find the Highest Altitude (LeetCode 1732)
 * Difficulty: Easy
 * Pattern: A8 - Suffix sums and prefix/suffix products
 *
 * There is a biker going on a road trip. The road trip consists of n + 1 points at different altitudes.
 * The biker starts at point 0 with altitude 0.
 * Given an integer array gain of length n where gain[i] is the net gain in altitude between points i and i + 1.
 * Return the highest altitude of a point.
 */

// --- 1. Brute Force Approach ---
// Time Complexity: O(n^2) - recalculates sum of gains up to each point
// Space Complexity: O(n)
export function largestAltitudeBruteForce(gain: number[]): number {
  let maxAlt = 0;
  for (let i = 0; i < gain.length; i++) {
    let currentAlt = 0;
    for (let j = 0; j <= i; j++) {
      currentAlt += gain[j];
    }
    maxAlt = Math.max(maxAlt, currentAlt);
  }
  return maxAlt;
}

// --- 2. Optimal Approach (Running Prefix Accumulator) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
export function largestAltitudeOptimal(gain: number[]): number {
  let currentAltitude = 0;
  let maxAltitude = 0;

  for (const g of gain) {
    currentAltitude += g;
    if (currentAltitude > maxAltitude) {
      maxAltitude = currentAltitude;
    }
  }

  return maxAltitude;
}

// --- Test Verification ---
console.assert(largestAltitudeOptimal([-5, 1, 5, 0, -7]) === 1, "Test 1 failed");
console.assert(largestAltitudeOptimal([-4, -3, -2, -1, 4, 3, 2]) === 0, "Test 2 failed");
