/**
 * Problem: Simplify Path (LeetCode 71)
 * Difficulty: Medium
 * Pattern: SQ1 - Stack-based matching and validation
 *
 * Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.
 */

// --- Optimal Approach (Stack of Path Components) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function simplifyPath(path: string): string {
  const parts = path.split("/");
  const stack: string[] = [];

  for (const part of parts) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      stack.push(part);
    }
  }

  return "/" + stack.join("/");
}

// --- Test Verification ---
console.assert(simplifyPath("/home/") === "/home", "Test 1 failed");
console.assert(simplifyPath("/home//foo/") === "/home/foo", "Test 2 failed");
console.assert(simplifyPath("/home/user/Documents/../Pictures") === "/home/user/Pictures", "Test 3 failed");
console.assert(simplifyPath("/../") === "/", "Test 4 failed");
console.assert(simplifyPath("/.../a/../b/c/../d/./") === "/.../b/d", "Test 5 failed");
