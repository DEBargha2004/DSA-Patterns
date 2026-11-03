/**
 * Problem: Min Stack (LeetCode 155)
 * Difficulty: Medium
 * Pattern: SQ9 - Min stack or max stack
 *
 * Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
 */

// --- Optimal Approach (Dual Stack / Paired Elements) ---
// Time Complexity: O(1) for all operations
// Space Complexity: O(n)
export class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];

  push(val: number): void {
    this.stack.push(val);
    const currentMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

// --- Test Verification ---
const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.assert(minStack.getMin() === -3, "Test 1 failed");
minStack.pop();
console.assert(minStack.top() === 0, "Test 2 failed");
console.assert(minStack.getMin() === -2, "Test 3 failed");
