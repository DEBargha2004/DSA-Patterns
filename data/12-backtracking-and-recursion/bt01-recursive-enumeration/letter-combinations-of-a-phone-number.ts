/**
 * Pattern: Recursive enumeration
 * Problem: Letter Combinations of a Phone Number (LeetCode 17)
 *
 * Given a string containing digits from 2-9 inclusive, return all possible
 * letter combinations that the number could represent.
 */

// Brute Force: Iterative Cartesian Product
// Time: O(4^N * N), Space: O(4^N * N)
export function letterCombinationsBrute(digits: string): string[] {
  if (!digits.length) return [];
  const map: Record<string, string[]> = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };

  let results: string[] = [""];
  for (const digit of digits) {
    const letters = map[digit];
    if (!letters) continue;
    const next: string[] = [];
    for (const prefix of results) {
      for (const char of letters) {
        next.push(prefix + char);
      }
    }
    results = next;
  }
  return results;
}

// Optimal: Recursive Backtracking with Path Buffer
// Time: O(4^N * N), Space: O(N) call stack auxiliary
export function letterCombinationsOptimal(digits: string): string[] {
  if (!digits.length) return [];
  const map: Record<string, string> = {
    "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
    "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
  };

  const results: string[] = [];
  const path: string[] = [];

  function backtrack(index: number): void {
    if (index === digits.length) {
      results.push(path.join(""));
      return;
    }

    const letters = map[digits[index]];
    for (let i = 0; i < letters.length; i++) {
      path.push(letters[i]);
      backtrack(index + 1);
      path.pop();
    }
  }

  backtrack(0);
  return results;
}

// Test cases
const r1 = letterCombinationsBrute("23");
const r2 = letterCombinationsOptimal("23");
if (JSON.stringify(r1) !== JSON.stringify(r2)) throw new Error("Mismatch in letter combinations");
if (!r2.includes("ad") || !r2.includes("cf") || r2.length !== 9) throw new Error("Invalid output");
console.log("Letter Combinations passed!");
