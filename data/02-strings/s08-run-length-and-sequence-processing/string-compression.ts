/**
 * Problem: String Compression (LeetCode 443)
 * Difficulty: Medium
 * Pattern: S8 - Run-length and sequence processing
 *
 * Given an array of characters chars, compress it using the following algorithm:
 * Begin with an empty string s. For each group of consecutive repeating characters in chars:
 * If the group's length is 1, append the character to s.
 * Otherwise, append the character followed by the group's length.
 * Must modify input array in-place and return new length.
 */

// --- Optimal Approach (Two Pointers Read/Write In-Place) ---
// Time Complexity: O(n) - read pointer visits each char once
// Space Complexity: O(1) in-place
export function compress(chars: string[]): number {
  let write = 0;
  let read = 0;

  while (read < chars.length) {
    const currentChar = chars[read];
    let count = 0;

    while (read < chars.length && chars[read] === currentChar) {
      read++;
      count++;
    }

    chars[write++] = currentChar;

    if (count > 1) {
      const countStr = count.toString();
      for (let i = 0; i < countStr.length; i++) {
        chars[write++] = countStr[i];
      }
    }
  }

  return write;
}

// --- Test Verification ---
const c1 = ["a", "a", "b", "b", "c", "c", "c"];
const len1 = compress(c1);
console.assert(len1 === 6 && c1.slice(0, 6).join('') === "a2b2c3", "Test 1 failed");

const c2 = ["a"];
const len2 = compress(c2);
console.assert(len2 === 1 && c2[0] === "a", "Test 2 failed");
