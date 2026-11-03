/**
 * Problem: All O`one Data Structure (LeetCode 432)
 * Difficulty: Hard
 * Pattern: LL14 - Doubly linked list and hash map combination
 *
 * Design a data structure to store string keys with increment and decrement operations,
 * returning key with min/max count in O(1) time.
 */

class Bucket {
  count: number;
  keys: Set<string>;
  prev: Bucket | null = null;
  next: Bucket | null = null;
  constructor(count: number) {
    this.count = count;
    this.keys = new Set<string>();
  }
}

export class AllOne {
  private keyBucket: Map<string, Bucket>;
  private head: Bucket;
  private tail: Bucket;

  constructor() {
    this.keyBucket = new Map();
    this.head = new Bucket(0);
    this.tail = new Bucket(0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private insertAfter(prevBucket: Bucket, newBucket: Bucket): void {
    newBucket.prev = prevBucket;
    newBucket.next = prevBucket.next;
    prevBucket.next!.prev = newBucket;
    prevBucket.next = newBucket;
  }

  private removeBucket(bucket: Bucket): void {
    bucket.prev!.next = bucket.next;
    bucket.next!.prev = bucket.prev;
  }

  inc(key: string): void {
    if (!this.keyBucket.has(key)) {
      if (this.head.next!.count !== 1) {
        this.insertAfter(this.head, new Bucket(1));
      }
      this.head.next!.keys.add(key);
      this.keyBucket.set(key, this.head.next!);
    } else {
      const cur = this.keyBucket.get(key)!;
      const nextCount = cur.count + 1;
      if (cur.next!.count !== nextCount) {
        this.insertAfter(cur, new Bucket(nextCount));
      }
      cur.next!.keys.add(key);
      this.keyBucket.set(key, cur.next!);
      cur.keys.delete(key);
      if (cur.keys.size === 0) this.removeBucket(cur);
    }
  }

  dec(key: string): void {
    const cur = this.keyBucket.get(key)!;
    if (cur.count === 1) {
      this.keyBucket.delete(key);
    } else {
      const prevCount = cur.count - 1;
      if (cur.prev!.count !== prevCount) {
        this.insertAfter(cur.prev!, new Bucket(prevCount));
      }
      cur.prev!.keys.add(key);
      this.keyBucket.set(key, cur.prev!);
    }
    cur.keys.delete(key);
    if (cur.keys.size === 0) this.removeBucket(cur);
  }

  getMaxKey(): string {
    return this.tail.prev === this.head ? "" : this.tail.prev!.keys.values().next().value!;
  }

  getMinKey(): string {
    return this.head.next === this.tail ? "" : this.head.next!.keys.values().next().value!;
  }
}

// --- Test Verification ---
const allOne = new AllOne();
allOne.inc("hello");
allOne.inc("hello");
console.assert(allOne.getMaxKey() === "hello", "Test 1 failed");
console.assert(allOne.getMinKey() === "hello", "Test 2 failed");
allOne.inc("leet");
console.assert(allOne.getMaxKey() === "hello", "Test 3 failed");
console.assert(allOne.getMinKey() === "leet", "Test 4 failed");
