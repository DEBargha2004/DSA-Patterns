/**
 * Pattern: Design-oriented DSA
 * Problem: LRU Cache (LeetCode 146)
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.
 */

// Brute Force: Array of keys tracking age + object map
// Time: Get O(N), Put O(N), Space: O(Capacity)
export class LRUCacheBrute {
  private capacity: number;
  private map = new Map<number, number>();
  private order: number[] = [];

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    this.order = this.order.filter(k => k !== key);
    this.order.push(key);
    return this.map.get(key)!;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      this.order = this.order.filter(k => k !== key);
    } else if (this.order.length >= this.capacity) {
      const oldest = this.order.shift()!;
      this.map.delete(oldest);
    }
    this.order.push(key);
    this.map.set(key, value);
  }
}

// Optimal: Hash Map + Doubly Linked List for O(1) get and O(1) put
// Time: Get O(1), Put O(1), Space: O(Capacity)
class DNode {
  key: number;
  val: number;
  prev: DNode | null = null;
  next: DNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

export class LRUCacheOptimal {
  private capacity: number;
  private map = new Map<number, DNode>();
  private head: DNode = new DNode(0, 0);
  private tail: DNode = new DNode(0, 0);

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: DNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertToHead(node: DNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) return -1;
    this.remove(node);
    this.insertToHead(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = value;
      this.remove(node);
      this.insertToHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        const lru = this.tail.prev!;
        this.remove(lru);
        this.map.delete(lru.key);
      }
      const newNode = new DNode(key, value);
      this.map.set(key, newNode);
      this.insertToHead(newNode);
    }
  }
}

// Test cases
const lru = new LRUCacheOptimal(2);
lru.put(1, 1);
lru.put(2, 2);
if (lru.get(1) !== 1) throw new Error("Expected 1");
lru.put(3, 3); // evicts 2
if (lru.get(2) !== -1) throw new Error("Expected 2 to be evicted");
console.log("LRU Cache passed!");
