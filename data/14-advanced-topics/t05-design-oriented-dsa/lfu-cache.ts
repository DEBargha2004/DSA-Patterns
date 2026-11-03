/**
 * Pattern: Design-oriented DSA
 * Problem: LFU Cache (LeetCode 460)
 *
 * Design and implement a data structure for a Least Frequently Used (LFU) cache.
 */

// Brute Force: Scan entries to find min frequency with timestamp tie-breaker
// Time: Get O(N), Put O(N), Space: O(Capacity)
export class LFUCacheBrute {
  private capacity: number;
  private time = 0;
  private data = new Map<number, { val: number; freq: number; lastTime: number }>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    this.time++;
    const item = this.data.get(key);
    if (!item) return -1;
    item.freq++;
    item.lastTime = this.time;
    return item.val;
  }

  put(key: number, value: number): void {
    if (this.capacity <= 0) return;
    this.time++;

    if (this.data.has(key)) {
      const item = this.data.get(key)!;
      item.val = value;
      item.freq++;
      item.lastTime = this.time;
      return;
    }

    if (this.data.size >= this.capacity) {
      let minFreq = Infinity;
      let oldestTime = Infinity;
      let evictKey = -1;

      for (const [k, v] of this.data.entries()) {
        if (v.freq < minFreq || (v.freq === minFreq && v.lastTime < oldestTime)) {
          minFreq = v.freq;
          oldestTime = v.lastTime;
          evictKey = k;
        }
      }

      this.data.delete(evictKey);
    }

    this.data.set(key, { val: value, freq: 1, lastTime: this.time });
  }
}

// Optimal: Double Hash Maps (KeyMap + Frequency DLL Map with minFrequency tracking)
// Time: Get O(1), Put O(1), Space: O(Capacity)
class LFUNode {
  key: number;
  val: number;
  freq: number = 1;
  prev: LFUNode | null = null;
  next: LFUNode | null = null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
  }
}

class DLL {
  head: LFUNode = new LFUNode(0, 0);
  tail: LFUNode = new LFUNode(0, 0);
  size: number = 0;
  constructor() {
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  addHead(node: LFUNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
    this.size++;
  }
  remove(node: LFUNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
    this.size--;
  }
  removeTail(): LFUNode {
    const node = this.tail.prev!;
    this.remove(node);
    return node;
  }
}

export class LFUCacheOptimal {
  private capacity: number;
  private minFreq: number = 0;
  private keyMap = new Map<number, LFUNode>();
  private freqMap = new Map<number, DLL>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    const node = this.keyMap.get(key);
    if (!node) return -1;
    this.updateFreq(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.capacity <= 0) return;

    if (this.keyMap.has(key)) {
      const node = this.keyMap.get(key)!;
      node.val = value;
      this.updateFreq(node);
      return;
    }

    if (this.keyMap.size >= this.capacity) {
      const minList = this.freqMap.get(this.minFreq)!;
      const evicted = minList.removeTail();
      this.keyMap.delete(evicted.key);
    }

    const newNode = new LFUNode(key, value);
    this.keyMap.set(key, newNode);
    this.minFreq = 1;

    if (!this.freqMap.has(1)) this.freqMap.set(1, new DLL());
    this.freqMap.get(1)!.addHead(newNode);
  }

  private updateFreq(node: LFUNode): void {
    const oldFreq = node.freq;
    const oldList = this.freqMap.get(oldFreq)!;
    oldList.remove(node);

    if (oldFreq === this.minFreq && oldList.size === 0) {
      this.minFreq++;
    }

    node.freq++;
    if (!this.freqMap.has(node.freq)) this.freqMap.set(node.freq, new DLL());
    this.freqMap.get(node.freq)!.addHead(node);
  }
}

// Test cases
const lfu = new LFUCacheOptimal(2);
lfu.put(1, 1);
lfu.put(2, 2);
if (lfu.get(1) !== 1) throw new Error("Expected 1");
lfu.put(3, 3); // 2 has freq 1, 1 has freq 2, evicts 2
if (lfu.get(2) !== -1) throw new Error("Expected 2 to be evicted");
console.log("LFU Cache passed!");
