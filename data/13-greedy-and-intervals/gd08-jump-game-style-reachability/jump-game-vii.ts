/**
 * Pattern: Jump-game-style reachability
 * Problem: Jump Game VII (LeetCode 1871)
 *
 * Given a binary string s and minJump, maxJump. You can move from i to j if s[j] == '0'
 * and i + minJump <= j <= min(i + maxJump, s.length - 1). Return true if you can reach last index.
 */

// Brute Force: BFS Queue with full range search
// Time: O(N * (maxJump - minJump)), Space: O(N)
export function canReachBrute(s: string, minJump: number, maxJump: number): boolean {
  if (s[s.length - 1] === '1') return false;
  const n = s.length;
  const visited = new Array(n).fill(false);
  const queue = [0];
  visited[0] = true;

  while (queue.length > 0) {
    const curr = queue.shift()!;
    if (curr === n - 1) return true;

    const start = curr + minJump;
    const end = Math.min(curr + maxJump, n - 1);

    for (let j = start; j <= end; j++) {
      if (s[j] === '0' && !visited[j]) {
        visited[j] = true;
        queue.push(j);
      }
    }
  }

  return false;
}

// Optimal: Sliding Window Reachability Count / Furthest Reach Pointer
// Time: O(N), Space: O(N) boolean array
export function canReachOptimal(s: string, minJump: number, maxJump: number): boolean {
  const n = s.length;
  if (s[n - 1] === '1') return false;

  const dp = new Array(n).fill(false);
  dp[0] = true;

  let availableJumps = 0;

  for (let i = 1; i < n; i++) {
    // Add entering dp state to window
    if (i >= minJump && dp[i - minJump]) {
      availableJumps++;
    }
    // Remove exiting dp state from window
    if (i > maxJump && dp[i - maxJump - 1]) {
      availableJumps--;
    }

    if (availableJumps > 0 && s[i] === '0') {
      dp[i] = true;
    }
  }

  return dp[n - 1];
}

// Test cases
if (!canReachBrute("011010", 2, 3) || !canReachOptimal("011010", 2, 3)) throw new Error("Expected true");
if (canReachOptimal("01101110", 2, 3)) throw new Error("Expected false");
console.log("Jump Game VII passed!");
