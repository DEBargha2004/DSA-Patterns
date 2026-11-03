/**
 * Problem: Backspace String Compare (LeetCode 844)
 * Difficulty: Easy
 * Pattern: TP5 - Backward two pointers
 *
 * Given two strings s and t, return true if they are equal when both are typed into empty text editors.
 * '#' means backspace.
 */

// --- Optimal Approach (Two Pointers Scanning Backwards) ---
// Time Complexity: O(n + m)
// Space Complexity: O(1)
export function backspaceCompare(s: string, t: string): boolean {
  let i = s.length - 1;
  let j = t.length - 1;
  let skipS = 0;
  let skipT = 0;

  while (i >= 0 || j >= 0) {
    // Find next valid character in s
    while (i >= 0) {
      if (s[i] === '#') { skipS++; i--; }
      else if (skipS > 0) { skipS--; i--; }
      else break;
    }

    // Find next valid character in t
    while (j >= 0) {
      if (t[j] === '#') { skipT++; j--; }
      else if (skipT > 0) { skipT--; j--; }
      else break;
    }

    if (i >= 0 && j >= 0 && s[i] !== t[j]) return false;
    if ((i >= 0) !== (j >= 0)) return false;

    i--;
    j--;
  }

  return true;
}

// --- Test Verification ---
console.assert(backspaceCompare("ab#c", "ad#c") === true, "Test 1 failed");
console.assert(backspaceCompare("ab##", "c#d#") === true, "Test 2 failed");
console.assert(backspaceCompare("a#c", "b") === false, "Test 3 failed");
