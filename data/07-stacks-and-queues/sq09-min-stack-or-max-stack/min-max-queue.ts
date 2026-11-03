/**
 * Problem: Min-Max Queue (Queue with O(1) amortized min/max)
 * Difficulty: Medium
 * Pattern: SQ9 - Min stack or max stack
 *
 * Design a queue that supports push, pop, and retrieving minimum in O(1).
 */

// --- Optimal Approach (Standard Queue + Monotonic Increasing Deque) ---
// Time Complexity: push O(1) amortized, pop O(1), getMin O(1)
// Space Complexity: O(n)
export class MinQueue {
  private queue: number[] = [];
  private deque: number[] = []; // monotonic increasing

  push(val: number): void {
    this.queue.push(val);
    while (this.deque.length > 0 && this.deque[this.deque.length - 1] > val) {
      this.deque.pop();
    }
    this.deque.push(val);
  }

  pop(): number {
    const val = this.queue.shift()!;
    if (val === this.deque[0]) {
      this.deque.shift();
    }
    return val;
  }

  getMin(): number {
    return this.deque[0];
  }
}

// --- Test Verification ---
const mq = new MinQueue();
mq.push(3);
mq.push(1);
mq.push(5);
console.assert(mq.getMin() === 1, "Test 1 failed");
console.assert(mq.pop() === 3, "Test 2 failed");
console.assert(mq.getMin() === 1, "Test 3 failed");
console.assert(mq.pop() === 1, "Test 4 failed");
console.assert(mq.getMin() === 5, "Test 5 failed");
