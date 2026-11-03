/**
 * Pattern: Huffman coding / Greedy frequency arrangement
 * Problem: Reorganize String (LeetCode 767)
 *
 * Given a string s, rearrange the characters of s so that any two adjacent characters
 * are not the same. Return "" if not possible.
 */

// Brute Force: Backtracking permutation with adjacent check
// Time: O(N!), Space: O(N)
export function reorganizeStringBrute(s: string): string {
  if (s.length > 8) return reorganizeStringOptimal(s); // Guard against factorial explosion

  const chars = s.split("");
  const n = chars.length;
  const used = new Array(n).fill(false);
  const current: string[] = [];

  function backtrack(): string | null {
    if (current.length === n) return current.join("");

    for (let i = 0; i < n; i++) {
      if (used[i]) continue;
      if (current.length > 0 && current[current.length - 1] === chars[i]) continue;

      used[i] = true;
      current.push(chars[i]);
      const res = backtrack();
      if (res !== null) return res;
      current.pop();
      used[i] = false;
    }
    return null;
  }

  return backtrack() || "";
}

// Optimal: Max-Heap Frequency / Even-Odd Index Filling
// Invariant: If max frequency > (n + 1) / 2, impossible. Otherwise place highest frequency characters at even indices first.
// Time: O(N), Space: O(26) = O(1)
export function reorganizeStringOptimal(s: string): string {
  const n = s.length;
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) || 0) + 1);

  const sortedChars = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  if (sortedChars[0][1] > Math.floor((n + 1) / 2)) {
    return ""; // Impossible to place without collision
  }

  const result = new Array(n);
  let idx = 0;

  for (const [char, count] of sortedChars) {
    for (let i = 0; i < count; i++) {
      if (idx >= n) idx = 1; // wrap around to odd indices
      result[idx] = char;
      idx += 2;
    }
  }

  return result.join("");
}

// Test cases
const rs1 = reorganizeStringBrute("aab");
const rs2 = reorganizeStringOptimal("aab");
if (rs1 !== "aba" || rs2 !== "aba") throw new Error("Expected 'aba'");
if (reorganizeStringOptimal("aaab") !== "") throw new Error("Expected empty string for 'aaab'");
console.log("Reorganize String passed!");
