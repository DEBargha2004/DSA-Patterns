/**
 * Problem: Simplify Path (LeetCode 71)
 * Difficulty: Medium
 * Pattern: S7 - String parsing and tokenization
 *
 * Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.
 */

// --- Optimal Approach (Tokenization with Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function simplifyPath(path: string): string {
  const tokens = path.split('/');
  const stack: string[] = [];

  for (const token of tokens) {
    if (token === '' || token === '.') {
      continue;
    } else if (token === '..') {
      if (stack.length > 0) stack.pop();
    } else {
      stack.push(token);
    }
  }

  return '/' + stack.join('/');
}

// --- Test Verification ---
console.assert(simplifyPath("/home/") === "/home", "Test 1 failed");
console.assert(simplifyPath("/home//foo/") === "/home/foo", "Test 2 failed");
console.assert(simplifyPath("/home/user/Documents/../Pictures") === "/home/user/Pictures", "Test 3 failed");
console.assert(simplifyPath("/../") === "/", "Test 4 failed");
