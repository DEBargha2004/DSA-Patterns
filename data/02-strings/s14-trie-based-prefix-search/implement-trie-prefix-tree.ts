/**
 * Problem: Implement Trie (Prefix Tree) (LeetCode 208)
 * Difficulty: Medium
 * Pattern: S14 - Trie-based prefix search
 *
 * A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.
 */

class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;

  constructor() {
    this.children = new Map<string, TrieNode>();
    this.isEndOfWord = false;
  }
}

// --- Optimal Implementation ---
// Time Complexity: O(m) for insert, search, and startsWith where m is key length
// Space Complexity: O(total chars inserted)
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }
}

// --- Test Verification ---
const trie = new Trie();
trie.insert("apple");
console.assert(trie.search("apple") === true, "Test 1 failed");
console.assert(trie.search("app") === false, "Test 2 failed");
console.assert(trie.startsWith("app") === true, "Test 3 failed");
trie.insert("app");
console.assert(trie.search("app") === true, "Test 4 failed");
