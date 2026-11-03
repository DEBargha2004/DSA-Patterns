/**
 * Problem: Implement Stack using Queues (LeetCode 225)
 * Difficulty: Easy
 * Pattern: SQ12 - Queue using stacks and stack using queues
 *
 * Implement LIFO stack using only queues.
 */

// --- Optimal Approach (Single Queue with Rotation on Push) ---
// Time Complexity: Push O(n), Pop/Top O(1)
// Space Complexity: O(n)
export class MyStack {
  private queue: number[] = [];

  push(x: number): void {
    this.queue.push(x);
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift()!);
    }
  }

  pop(): number {
    return this.queue.shift()!;
  }

  top(): number {
    return this.queue[0];
  }

  empty(): boolean {
    return this.queue.length === 0;
  }
}

// --- Test Verification ---
const st = new MyStack();
st.push(1);
st.push(2);
console.assert(st.top() === 2, "Test 1 failed");
console.assert(st.pop() === 2, "Test 2 failed");
console.assert(st.empty() === false, "Test 3 failed");
console.assert(st.pop() === 1, "Test 4 failed");
console.assert(st.empty() === true, "Test 5 failed");
