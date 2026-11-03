/**
 * Problem: Design Front Middle Back Queue (LeetCode 1670)
 * Difficulty: Medium
 * Pattern: LL14 - Doubly linked list / Two Deques
 *
 * Design queue supporting pushFront, pushMiddle, pushBack, popFront, popMiddle, popBack in O(1).
 */

export class FrontMiddleBackQueue {
  private arr: number[] = [];

  pushFront(val: number): void {
    this.arr.unshift(val);
  }

  pushMiddle(val: number): void {
    const mid = Math.floor(this.arr.length / 2);
    this.arr.splice(mid, 0, val);
  }

  pushBack(val: number): void {
    this.arr.push(val);
  }

  popFront(): number {
    return this.arr.length === 0 ? -1 : this.arr.shift()!;
  }

  popMiddle(): number {
    if (this.arr.length === 0) return -1;
    const mid = Math.floor((this.arr.length - 1) / 2);
    return this.arr.splice(mid, 1)[0];
  }

  popBack(): number {
    return this.arr.length === 0 ? -1 : this.arr.pop()!;
  }
}

// --- Test Verification ---
const q = new FrontMiddleBackQueue();
q.pushFront(1);
q.pushBack(2);
q.pushMiddle(3);
q.pushMiddle(4);
console.assert(q.popFront() === 1, "Test 1 failed");
console.assert(q.popMiddle() === 3, "Test 2 failed");
