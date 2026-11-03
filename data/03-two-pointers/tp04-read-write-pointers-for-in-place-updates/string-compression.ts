/**
 * Problem: String Compression (LeetCode 443)
 * Difficulty: Medium
 * Pattern: TP4 - Read/write pointers for in-place updates
 *
 * Compress characters in-place using run-length encoding.
 */

// --- Optimal Approach (Read/Write In-Place Replacement) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function compress(chars: string[]): number {
  let write = 0;
  let read = 0;

  while (read < chars.length) {
    const ch = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === ch) {
      read++;
      count++;
    }

    chars[write++] = ch;

    if (count > 1) {
      const s = count.toString();
      for (let i = 0; i < s.length; i++) {
        chars[write++] = s[i];
      }
    }
  }

  return write;
}

// --- Test Verification ---
const c = ["a", "a", "b", "b", "c", "c", "c"];
const l = compress(c);
console.assert(l === 6 && c.slice(0, 6).join('') === "a2b2c3", "Test failed");
