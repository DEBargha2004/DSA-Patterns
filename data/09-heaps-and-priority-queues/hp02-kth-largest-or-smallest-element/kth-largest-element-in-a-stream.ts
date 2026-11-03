/**
 * Problem: Kth Largest Element in a Stream (LeetCode 703)
 * Difficulty: Easy
 * Pattern: HP2 - Kth largest or smallest element
 *
 * Maintain kth largest element in stream using min-heap of size k.
 */

// --- Optimal Approach (Min-Heap of Size K) ---
// Time Complexity: O(log k) per add
// Space Complexity: O(k)
export class KthLargest {
  private k: number;
  private heap: number[] = [];

  constructor(k: number, nums: number[]) {
    this.k = k;
    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    if (this.heap.length < this.k) {
      this.pushHeap(val);
    } else if (val > this.heap[0]) {
      this.heap[0] = val;
      this.sinkDown(0);
    }
    return this.heap[0];
  }

  private pushHeap(val: number): void {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i] < this.heap[parent]) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  private sinkDown(i: number): void {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      } else break;
    }
  }
}

// --- Test Verification ---
const kl = new KthLargest(3, [4, 5, 8, 2]);
console.assert(kl.add(3) === 4, "Test 1 failed");
console.assert(kl.add(5) === 5, "Test 2 failed");
console.assert(kl.add(10) === 5, "Test 3 failed");
console.assert(kl.add(9) === 8, "Test 4 failed");
console.assert(kl.add(4) === 8, "Test 5 failed");
