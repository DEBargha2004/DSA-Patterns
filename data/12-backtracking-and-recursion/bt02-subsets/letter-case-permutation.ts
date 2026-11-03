/**
 * Pattern: Subsets
 * Problem: Letter Case Permutation (LeetCode 784)
 *
 * Given a string s, you can transform every letter individually to be lowercase
 * or uppercase to create another string. Return a list of all possible strings.
 */

// Brute Force: Iterative BFS queue expansion
// Time: O(2^L * N), Space: O(2^L * N) where L is number of letter characters
export function letterCasePermutationBFS(s: string): string[] {
  let queue: string[] = [""];

  for (const char of s) {
    const next: string[] = [];
    const isLetter = (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
    for (const prefix of queue) {
      if (isLetter) {
        next.push(prefix + char.toLowerCase());
        next.push(prefix + char.toUpperCase());
      } else {
        next.push(prefix + char);
      }
    }
    queue = next;
  }
  return queue;
}

// Optimal: In-place recursive DFS backtracking
// Time: O(2^L * N), Space: O(N) stack
export function letterCasePermutationDFS(s: string): string[] {
  const result: string[] = [];
  const chars = s.split("");

  function backtrack(index: number): void {
    if (index === chars.length) {
      result.push(chars.join(""));
      return;
    }

    const original = chars[index];
    const isLetter = (original >= 'a' && original <= 'z') || (original >= 'A' && original <= 'Z');

    if (isLetter) {
      chars[index] = original.toLowerCase();
      backtrack(index + 1);

      chars[index] = original.toUpperCase();
      backtrack(index + 1);

      chars[index] = original; // restore
    } else {
      backtrack(index + 1);
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const resLCP1 = letterCasePermutationBFS("a1b2").sort();
const resLCP2 = letterCasePermutationDFS("a1b2").sort();
if (JSON.stringify(resLCP1) !== JSON.stringify(resLCP2)) throw new Error("Mismatch in letter case perm");
if (resLCP2.length !== 4) throw new Error("Expected 4 permutations");
console.log("Letter Case Permutation passed!");
