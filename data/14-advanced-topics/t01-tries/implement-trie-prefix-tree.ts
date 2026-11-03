/**
 * Pattern: Tries
 * Problem: Implement Trie / Prefix Tree (LeetCode 208)
 *
 * Implement a trie with insert, search, and startsWith methods.
 */

// Brute Force: Array of strings with linear scan and startsWith check
// Time: Insert O(1), Search O(N * L), StartsWith O(N * L); Space: O(N * L)
export class TrieBrute {
  private words: string[] = [];

  insert(word: string): void {
    this.words.push(word);
  }

  search(word: string): boolean {
    return this.words.includes(word);
  }

  startsWith(prefix: string): boolean {
    return this.words.some(w => w.startsWith(prefix));
  }
}

// Optimal: 26-way or Map-based Trie Node
// Time: Insert O(L), Search O(L), StartsWith O(L); Space: O(Total characters)
class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEnd: boolean = false;
}

export class TrieOptimal {
  private root: TrieNode = new TrieNode();

  insert(word: string): void {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, new TrieNode());
      }
      curr = curr.children.get(ch)!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    let curr = this.root;
    for (const ch of word) {
      if (!curr.children.has(ch)) return false;
      curr = curr.children.get(ch)!;
    }
    return curr.isEnd;
  }

  startsWith(prefix: string): boolean {
    let curr = this.root;
    for (const ch of prefix) {
      if (!curr.children.has(ch)) return false;
      curr = curr.children.get(ch)!;
    }
    return true;
  }
}

// Test cases
const tb = new TrieBrute();
const to = new TrieOptimal();
tb.insert("apple"); to.insert("apple");
if (!tb.search("apple") || !to.search("apple")) throw new Error("Expected apple in trie");
if (to.search("app")) throw new Error("Expected app to not be full word");
if (!to.startsWith("app")) throw new Error("Expected startsWith app to be true");
console.log("Implement Trie passed!");
