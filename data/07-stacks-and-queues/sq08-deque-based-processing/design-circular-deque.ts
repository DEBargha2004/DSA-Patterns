/**
 * Problem: Design Circular Deque (LeetCode 641)
 * Difficulty: Medium
 * Pattern: SQ8 - Deque-based processing
 *
 * Design circular deque supporting front/rear insertions and deletions.
 */

// --- Optimal Approach (Circular Buffer Array) ---
// Time Complexity: O(1) for all operations
// Space Complexity: O(k)
export class MyCircularDeque {
  private buffer: number[];
  private capacity: number;
  private head: number;
  private tail: number;
  private size: number;

  constructor(k: number) {
    this.capacity = k;
    this.buffer = new Array(k);
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }

  insertFront(value: number): boolean {
    if (this.isFull()) return false;
    this.head = (this.head - 1 + this.capacity) % this.capacity;
    this.buffer[this.head] = value;
    this.size++;
    return true;
  }

  insertLast(value: number): boolean {
    if (this.isFull()) return false;
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
    return true;
  }

  deleteFront(): boolean {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return true;
  }

  deleteLast(): boolean {
    if (this.isEmpty()) return false;
    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    this.size--;
    return true;
  }

  getFront(): number {
    return this.isEmpty() ? -1 : this.buffer[this.head];
  }

  getRear(): number {
    return this.isEmpty() ? -1 : this.buffer[(this.tail - 1 + this.capacity) % this.capacity];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }
}

// --- Test Verification ---
const cd = new MyCircularDeque(3);
console.assert(cd.insertLast(1) === true, "Test 1 failed");
console.assert(cd.insertLast(2) === true, "Test 2 failed");
console.assert(cd.insertFront(3) === true, "Test 3 failed");
console.assert(cd.insertFront(4) === false, "Test 4 failed (full)");
console.assert(cd.getRear() === 2, "Test 5 failed");
console.assert(cd.isFull() === true, "Test 6 failed");
console.assert(cd.deleteLast() === true, "Test 7 failed");
console.assert(cd.insertFront(4) === true, "Test 8 failed");
console.assert(cd.getFront() === 4, "Test 9 failed");
