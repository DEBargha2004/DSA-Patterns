/**
 * Problem: LFU Cache (LeetCode 460)
 * Difficulty: Hard
 * Pattern: LL15 - LRU cache implementation (LFU variant)
 *
 * Design and implement a Least Frequently Used (LFU) cache in O(1) time complexity for get and put.
 */

class LFUDNode {
  key: number;
  val: number;
  freq: number = 1;
  prev: LFUDNode | null = null;
  next: LFUDNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

class DoubleLinkedList {
  head: LFUDNode = new LFUDNode(0, 0);
  tail: LFUDNode = new LFUDNode(0, 0);
  size: number = 0;

  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNode(node: LFUDNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
    this.size++;
  }

  removeNode(node: LFUDNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    this.size--;
  }

  popTail(): LFUDNode {
    const node = this.tail.prev!;
    this.removeNode(node);
    return node;
  }
}

export class LFUCache {
  private capacity: number;
  private minFreq: number = 0;
  private keyMap: Map<number, LFUDNode> = new Map();
  private freqMap: Map<number, DoubleLinkedList> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  private updateFreq(node: LFUDNode): void {
    const curList = this.freqMap.get(node.freq)!;
    curList.removeNode(node);

    if (node.freq === this.minFreq && curList.size === 0) {
      this.minFreq++;
    }

    node.freq++;
    if (!this.freqMap.has(node.freq)) {
      this.freqMap.set(node.freq, new DoubleLinkedList());
    }
    this.freqMap.get(node.freq)!.addNode(node);
  }

  get(key: number): number {
    if (!this.keyMap.has(key)) return -1;
    const node = this.keyMap.get(key)!;
    this.updateFreq(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.capacity <= 0) return;

    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key)!;
      node.val = value;
      this.updateFreq(node);
    } else {
      if (this.keyMap.size >= this.capacity) {
        const minList = this.freqMap.get(this.minFreq)!;
        const evicted = minList.popTail();
        this.keyMap.delete(evicted.key);
      }

      const newNode = new LFUDNode(key, value);
      this.keyMap.set(key, newNode);
      this.minFreq = 1;
      if (!this.freqMap.has(1)) this.freqMap.set(1, new DoubleLinkedList());
      this.freqMap.get(1)!.addNode(newNode);
    }
  }
}

// --- Test Verification ---
const lfu = new LFUCache(2);
lfu.put(1, 1);
lfu.put(2, 2);
console.assert(lfu.get(1) === 1, "Test 1 failed");
lfu.put(3, 3); // evicts 2
console.assert(lfu.get(2) === -1, "Test 2 failed");
console.assert(lfu.get(3) === 3, "Test 3 failed");
