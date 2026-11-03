/**
 * Problem: LRU Cache (LeetCode 146)
 * Difficulty: Medium
 * Pattern: LL15 - LRU cache implementation
 *
 * Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get & put.
 */

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

// --- Optimal Approach (Hash Map + Doubly Linked List with Sentinel Head & Tail) ---
// Time Complexity: O(1) for both get and put
// Space Complexity: O(capacity)
export class LRUCache {
  private capacity: number;
  private map: Map<number, DNode>;
  private head: DNode;
  private tail: DNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map<number, DNode>();
    this.head = new DNode(0, 0);
    this.tail = new DNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: DNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private addToHead(node: DNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.remove(node);
    this.addToHead(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = value;
      this.remove(node);
      this.addToHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        // Evict LRU element before tail
        const lru = this.tail.prev!;
        this.remove(lru);
        this.map.delete(lru.key);
      }
      const newNode = new DNode(key, value);
      this.map.set(key, newNode);
      this.addToHead(newNode);
    }
  }
}

// --- Test Verification ---
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.assert(lru.get(1) === 1, "Test 1 failed");
lru.put(3, 3); // evicts 2
console.assert(lru.get(2) === -1, "Test 2 failed");
lru.put(4, 4); // evicts 1
console.assert(lru.get(1) === -1, "Test 3 failed");
console.assert(lru.get(3) === 3, "Test 4 failed");
console.assert(lru.get(4) === 4, "Test 5 failed");
