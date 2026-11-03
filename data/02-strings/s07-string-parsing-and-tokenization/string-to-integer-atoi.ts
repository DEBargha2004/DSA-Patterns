/**
 * Problem: String to Integer (atoi) (LeetCode 8)
 * Difficulty: Medium
 * Pattern: S7 - String parsing and tokenization
 *
 * Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.
 */

// --- Optimal Approach (State-based Character Parsing with Overflow Clamping) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function myAtoi(s: string): number {
  let i = 0;
  const n = s.length;

  // 1. Skip leading whitespaces
  while (i < n && s[i] === ' ') i++;
  if (i === n) return 0;

  // 2. Check sign
  let sign = 1;
  if (s[i] === '+') {
    i++;
  } else if (s[i] === '-') {
    sign = -1;
    i++;
  }

  // 3. Read digits and clamp 32-bit signed integer boundaries
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;
  let total = 0;

  while (i < n) {
    const code = s.charCodeAt(i) - 48; // '0' code is 48
    if (code < 0 || code > 9) break;

    // Check for overflow before multiplying
    if (total > Math.floor(INT_MAX / 10) || (total === Math.floor(INT_MAX / 10) && code > 7)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    total = total * 10 + code;
    i++;
  }

  return sign * total;
}

// --- Test Verification ---
console.assert(myAtoi("42") === 42, "Test 1 failed");
console.assert(myAtoi("   -042") === -42, "Test 2 failed");
console.assert(myAtoi("1337c0d3") === 1337, "Test 3 failed");
console.assert(myAtoi("-91283472332") === -2147483648, "Test 4 failed");
