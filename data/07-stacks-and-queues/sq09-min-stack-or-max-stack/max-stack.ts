/**
 * Problem: Max Stack (LeetCode 716 analog)
 * Difficulty: Medium
 * Pattern: SQ9 - Min stack or max stack
 *
 * Design a max stack that supports push, pop, top, peekMax, and popMax.
 */

// --- Optimal Approach (Dual Stack with Buffer for popMax) ---
// Time Complexity: push, pop, top, peekMax: O(1); popMax: O(n)
// Space Complexity: O(n)
export class MaxStack {
  private stack: number[] = [];
  private maxStack: number[] = [];

  push(x: number): void {
    this.stack.push(x);
    const currMax = this.maxStack.length === 0 ? x : Math.max(x, this.maxStack[this.maxStack.length - 1]);
    this.maxStack.push(currMax);
  }

  pop(): number {
    this.maxStack.pop();
    return this.stack.pop()!;
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  peekMax(): number {
    return this.maxStack[this.maxStack.length - 1];
  }

  popMax(): number {
    const maxVal = this.peekMax();
    const buffer: number[] = [];

    while (this.top() !== maxVal) {
      buffer.push(this.pop());
    }
    this.pop(); // remove max

    while (buffer.length > 0) {
      this.push(buffer.pop()!);
    }

    return maxVal;
  }
}

// --- Test Verification ---
const maxStack = new MaxStack();
maxStack.push(5);
maxStack.push(1);
maxStack.push(5);
console.assert(maxStack.top() === 5, "Test 1 failed");
console.assert(maxStack.popMax() === 5, "Test 2 failed");
console.assert(maxStack.top() === 1, "Test 3 failed");
console.assert(maxStack.peekMax() === 5, "Test 4 failed");
console.assert(maxStack.pop() === 1, "Test 5 failed");
console.assert(maxStack.top() === 5, "Test 6 failed");
