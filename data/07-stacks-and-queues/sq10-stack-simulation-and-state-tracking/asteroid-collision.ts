/**
 * Problem: Asteroid Collision (LeetCode 735)
 * Difficulty: Medium
 * Pattern: SQ10 - Stack simulation and state tracking
 *
 * Find state of asteroids after all collisions.
 */

// --- Optimal Approach (Stack Simulation) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function asteroidCollision(asteroids: number[]): number[] {
  const stack: number[] = [];

  for (const ast of asteroids) {
    let alive = true;

    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];
      if (top < -ast) {
        stack.pop();
      } else if (top === -ast) {
        stack.pop();
        alive = false;
      } else {
        alive = false;
      }
    }

    if (alive) {
      stack.push(ast);
    }
  }

  return stack;
}

// --- Test Verification ---
console.assert(JSON.stringify(asteroidCollision([5, 10, -5])) === JSON.stringify([5, 10]), "Test 1 failed");
console.assert(JSON.stringify(asteroidCollision([8, -8])) === JSON.stringify([]), "Test 2 failed");
console.assert(JSON.stringify(asteroidCollision([10, 2, -5])) === JSON.stringify([10]), "Test 3 failed");
console.assert(JSON.stringify(asteroidCollision([-2, -1, 1, 2])) === JSON.stringify([-2, -1, 1, 2]), "Test 4 failed");
