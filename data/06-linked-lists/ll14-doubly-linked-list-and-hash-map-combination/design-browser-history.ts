/**
 * Problem: Design Browser History (LeetCode 1472)
 * Difficulty: Medium
 * Pattern: LL14 - Doubly linked list
 *
 * Implement browser history navigation in O(1) step traversal.
 */

class HistoryNode {
  url: string;
  prev: HistoryNode | null = null;
  next: HistoryNode | null = null;
  constructor(url: string) { this.url = url; }
}

export class BrowserHistory {
  private current: HistoryNode;

  constructor(homepage: string) {
    this.current = new HistoryNode(homepage);
  }

  visit(url: string): void {
    const newNode = new HistoryNode(url);
    this.current.next = newNode;
    newNode.prev = this.current;
    this.current = newNode;
  }

  back(steps: number): string {
    while (steps > 0 && this.current.prev !== null) {
      this.current = this.current.prev;
      steps--;
    }
    return this.current.url;
  }

  forward(steps: number): string {
    while (steps > 0 && this.current.next !== null) {
      this.current = this.current.next;
      steps--;
    }
    return this.current.url;
  }
}

// --- Test Verification ---
const bh = new BrowserHistory("leetcode.com");
bh.visit("google.com");
bh.visit("facebook.com");
console.assert(bh.back(1) === "google.com", "Test 1 failed");
console.assert(bh.forward(1) === "facebook.com", "Test 2 failed");
