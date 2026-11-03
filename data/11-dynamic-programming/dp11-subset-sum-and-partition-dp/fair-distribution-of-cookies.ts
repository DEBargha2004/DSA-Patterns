/**
 * Problem: Fair Distribution of Cookies (LeetCode 2305)
 * Difficulty: Medium
 * Pattern: DP11 - Subset sum and partition DP
 *
 * Distribute cookies to k children to minimize maximum cookies given to any child.
 */

// --- Optimal Approach (Backtracking with Pruning) ---
// Time Complexity: O(k^n)
// Space Complexity: O(k + n)
export function distributeCookies(cookies: number[], k: number): number {
  cookies.sort((a, b) => b - a); // largest first for aggressive pruning
  const children = new Array(k).fill(0);
  let minMax = Infinity;

  function dfs(cookieIdx: number): void {
    if (cookieIdx === cookies.length) {
      minMax = Math.min(minMax, Math.max(...children));
      return;
    }

    for (let i = 0; i < k; i++) {
      if (children[i] + cookies[cookieIdx] >= minMax) continue; // prune

      children[i] += cookies[cookieIdx];
      dfs(cookieIdx + 1);
      children[i] -= cookies[cookieIdx];

      if (children[i] === 0) break; // break symmetry
    }
  }

  dfs(0);
  return minMax;
}

// --- Test Verification ---
console.assert(distributeCookies([8, 15, 10, 20, 8], 2) === 31, "Test 1 failed");
console.assert(distributeCookies([6, 1, 3, 2, 2, 4, 1, 2], 3) === 7, "Test 2 failed");
