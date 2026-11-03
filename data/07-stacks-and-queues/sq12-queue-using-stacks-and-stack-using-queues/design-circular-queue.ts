/**
 * Problem: Design Circular Queue (LeetCode 622)
 * Difficulty: Medium
 * Pattern: SQ12 - Queue using stacks and stack using queues
 *
 * Design circular queue using fixed array buffer.
 */

// --- Optimal Approach (Fixed-size Array with Head & Count) ---
// Time Complexity: O(1) for all operations
// Space Complexity: O(k)
export class MyCircularQueue {
  private buffer: number[];
  private capacity: number;
  private head: number;
  private count: number;

  constructor(k: number) {
    this.capacity = k;
    this.buffer = new Array(k);
    this.head = 0;
    this.count = 0;
  }

  enQueue(value: number): boolean {
    if (this.isFull()) return false;
    const tail = (this.head + this.count) % this.capacity;
    this.buffer[tail] = value;
    this.count++;
    return true;
  }

  deQueue(): boolean {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.count--;
    return true;
  }

  Front(): number {
    return this.isEmpty() ? -1 : this.buffer[this.head];
  }

  Rear(): number {
    if (this.isEmpty()) return -1;
    const tail = (this.head + this.count - 1) % this.capacity;
    return this.buffer[tail];
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  isFull(): boolean {
    return this.count === this.capacity;
  }
}

// --- Test Verification ---
const cq = new MyCircularQueue(3);
console.assert(cq.enQueue(1) === true, "Test 1 failed");
console.assert(cq.enQueue(2) === true, "Test 2 failed");
console.assert(cq.enQueue(3) === true, "Test 3 failed");
console.assert(cq.enQueue(4) === false, "Test 4 failed (full)");
console.assert(cq.Rear() === 3, "Test 5 failed");
console.assert(cq.isFull() === true, "Test 6 failed");
console.assert(cq.deQueue() === true, "Test 7 failed");
console.assert(cq.enQueue(4) === true, "Test 8 failed");
console.assert(cq.Rear() === 4, "Test 9 failed");
