/**
 * Problem: Open the Lock (LeetCode 752)
 * Difficulty: Medium
 * Pattern: GR2 - BFS for shortest paths in unweighted graphs
 *
 * Find minimum total turns required to open lock avoiding deadends.
 */

// --- Optimal Approach (BFS over 4-Digit Wheel States) ---
// Time Complexity: O(10^4 * 8)
// Space Complexity: O(10^4)
export function openLock(deadends: string[], target: string): number {
  const dead = new Set(deadends);
  if (dead.has("0000")) return -1;
  if (target === "0000") return 0;

  const visited = new Set<string>(["0000"]);
  const queue: [state: string, turns: number][] = [["0000", 0]];

  while (queue.length > 0) {
    const [state, turns] = queue.shift()!;
    if (state === target) return turns;

    for (let i = 0; i < 4; i++) {
      const digit = Number(state[i]);
      const up = (digit + 1) % 10;
      const down = (digit + 9) % 10;

      for (const d of [up, down]) {
        const nextState = state.slice(0, i) + d + state.slice(i + 1);
        if (!dead.has(nextState) && !visited.has(nextState)) {
          visited.add(nextState);
          queue.push([nextState, turns + 1]);
        }
      }
    }
  }

  return -1;
}

// --- Test Verification ---
console.assert(openLock(["0201", "0101", "0102", "1212", "2002"], "0202") === 6, "Test 1 failed");
console.assert(openLock(["8888"], "0009") === 1, "Test 2 failed");
console.assert(openLock(["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"], "8888") === -1, "Test 3 failed");
