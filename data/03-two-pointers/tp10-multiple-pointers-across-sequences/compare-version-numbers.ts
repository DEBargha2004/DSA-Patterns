/**
 * Problem: Compare Version Numbers (LeetCode 165)
 * Difficulty: Medium
 * Pattern: TP10 - Multiple pointers across sequences
 *
 * Compare two version strings version1 and version2.
 */

// --- Optimal Approach (Two Pointers Parsing Revision Numbers Online) ---
// Time Complexity: O(n + m)
// Space Complexity: O(1)
export function compareVersion(version1: string, version2: string): number {
  let i = 0, j = 0;
  const n = version1.length, m = version2.length;

  while (i < n || j < m) {
    let num1 = 0;
    while (i < n && version1[i] !== '.') {
      num1 = num1 * 10 + (version1.charCodeAt(i) - 48);
      i++;
    }

    let num2 = 0;
    while (j < m && version2[j] !== '.') {
      num2 = num2 * 10 + (version2.charCodeAt(j) - 48);
      j++;
    }

    if (num1 < num2) return -1;
    if (num1 > num2) return 1;

    i++; // Skip '.'
    j++;
  }

  return 0;
}

// --- Test Verification ---
console.assert(compareVersion("1.2", "1.10") === -1, "Test 1 failed");
console.assert(compareVersion("1.01", "1.001") === 0, "Test 2 failed");
console.assert(compareVersion("1.0", "1.0.0.0") === 0, "Test 3 failed");
