/**
 * Problem: Decode String (LeetCode 394)
 * Difficulty: Medium
 * Pattern: SQ10 - Stack simulation and state tracking
 *
 * Given an encoded string, return its decoded string: k[encoded_string].
 */

// --- Optimal Approach (Stack Storing (PrevString, RepeatCount)) ---
// Time Complexity: O(maxK * n)
// Space Complexity: O(n)
export function decodeString(s: string): string {
  const countStack: number[] = [];
  const stringStack: string[] = [];
  let currentStr = "";
  let currentNum = 0;

  for (const ch of s) {
    if (ch >= "0" && ch <= "9") {
      currentNum = currentNum * 10 + (ch.charCodeAt(0) - 48);
    } else if (ch === "[") {
      countStack.push(currentNum);
      stringStack.push(currentStr);
      currentStr = "";
      currentNum = 0;
    } else if (ch === "]") {
      const repeatTimes = countStack.pop()!;
      const prevStr = stringStack.pop()!;
      currentStr = prevStr + currentStr.repeat(repeatTimes);
    } else {
      currentStr += ch;
    }
  }

  return currentStr;
}

// --- Test Verification ---
console.assert(decodeString("3[a]2[bc]") === "aaabcbc", "Test 1 failed");
console.assert(decodeString("3[a2[c]]") === "accaccacc", "Test 2 failed");
console.assert(decodeString("2[abc]3[cd]ef") === "abcabccdcdcdef", "Test 3 failed");
