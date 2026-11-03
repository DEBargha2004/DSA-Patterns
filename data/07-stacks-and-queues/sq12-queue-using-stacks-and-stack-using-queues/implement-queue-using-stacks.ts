/**
 * Problem: Implement Queue using Stacks (LeetCode 232)
 * Difficulty: Easy
 * Pattern: SQ12 - Queue using stacks and stack using queues
 *
 * Implement FIFO queue using only two LIFO stacks.
 */

// --- Optimal Approach (Two Stacks - In and Out) ---
// Time Complexity: Push O(1), Pop/Peek O(1) amortized
// Space Complexity: O(n)
export class MyQueue {
  private inStack: number[] = [];
  private outStack: number[] = [];

  push(x: number): void {
    this.inStack.push(x);
  }

  pop(): number {
    this.shiftStacks();
    return this.outStack.pop()!;
  }

  peek(): number {
    this.shiftStacks();
    return this.outStack[this.outStack.length - 1];
  }

  empty(): boolean {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }

  private shiftStacks(): void {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop()!);
      }
    }
  }
}

// --- Test Verification ---
const q = new MyQueue();
q.push(1);
q.push(2);
console.assert(q.peek() === 1, "Test 1 failed");
console.assert(q.pop() === 1, "Test 2 failed");
console.assert(q.empty() === false, "Test 3 failed");
console.assert(q.pop() === 2, "Test 4 failed");
console.assert(q.empty() === true, "Test 5 failed");
