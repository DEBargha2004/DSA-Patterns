/**
 * Problem: LRU-backed File Cache
 * Difficulty: Medium
 * Pattern: LL15 - LRU cache implementation
 *
 * In-memory file cache storing content with LRU eviction policy.
 */

export class FileCache {
  private capacity: number;
  private cache: Map<string, string>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map<string, string>();
  }

  readFile(path: string): string | null {
    if (!this.cache.has(path)) return null;
    const content = this.cache.get(path)!;
    this.cache.delete(path);
    this.cache.set(path, content); // re-insert at end
    return content;
  }

  writeFile(path: string, content: string): void {
    if (this.cache.has(path)) {
      this.cache.delete(path);
    } else if (this.cache.size >= this.capacity) {
      // Oldest is first key in Map
      const oldestKey = this.cache.keys().next().value!;
      this.cache.delete(oldestKey);
    }
    this.cache.set(path, content);
  }
}

// --- Test Verification ---
const fc = new FileCache(2);
fc.writeFile("/a.txt", "A");
fc.writeFile("/b.txt", "B");
console.assert(fc.readFile("/a.txt") === "A", "Test 1 failed");
fc.writeFile("/c.txt", "C"); // evicts b.txt
console.assert(fc.readFile("/b.txt") === null, "Test 2 failed");
console.assert(fc.readFile("/c.txt") === "C", "Test 3 failed");
