/**
 * Problem: Validate Stack Sequences (LeetCode 946)
 * Difficulty: Medium
 * Pattern: SQ1 - Stack-based matching and validation
 *
 * Given two integer arrays pushed and popped each with distinct values, return true if this could
 * have been the result of a sequence of push and pop operations on an initially empty stack.
 */

// --- Optimal Approach (Greedy Simulation using Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack: number[] = [];
  let popIdx = 0;

  for (const val of pushed) {
    stack.push(val);
    while (stack.length > 0 && popIdx < popped.length && stack[stack.length - 1] === popped[popIdx]) {
      stack.pop();
      popIdx++;
    }
  }

  return popIdx === popped.length;
}

// --- Test Verification ---
console.assert(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]) === true, "Test 1 failed");
console.assert(validateStackSequences([1, 2, 3, 4, 5], [4, 3, 5, 1, 2]) === false, "Test 2 failed");
console.assert(validateStackSequences([1, 0], [1, 0]) === true, "Test 3 failed");
console.assert(validateStackSequences([1, 0], [0, 1]) === true, "Test 4 failed");
