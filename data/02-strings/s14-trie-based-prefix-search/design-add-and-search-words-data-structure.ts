/**
 * Problem: Design Add and Search Words Data Structure (LeetCode 211)
 * Difficulty: Medium
 * Pattern: S14 - Trie-based prefix search
 *
 * Design a data structure that supports adding new words and finding if a string matches any previously added string,
 * where '.' can match any letter.
 */

class WordNode {
  children: Map<string, WordNode> = new Map();
  isEnd: boolean = false;
}

export class WordDictionary {
  private root: WordNode = new WordNode();

  addWord(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new WordNode());
      }
      node = node.children.get(ch)!;
    }
    node.isEnd = true;
  }

  search(word: string): boolean {
    function dfs(index: number, node: WordNode): boolean {
      if (index === word.length) return node.isEnd;

      const ch = word[index];
      if (ch === '.') {
        for (const childNode of node.children.values()) {
          if (dfs(index + 1, childNode)) return true;
        }
        return false;
      } else {
        if (!node.children.has(ch)) return false;
        return dfs(index + 1, node.children.get(ch)!);
      }
    }

    return dfs(0, this.root);
  }
}

// --- Test Verification ---
const dict = new WordDictionary();
dict.addWord("bad");
dict.addWord("dad");
dict.addWord("mad");
console.assert(dict.search("pad") === false, "Test 1 failed");
console.assert(dict.search("bad") === true, "Test 2 failed");
console.assert(dict.search(".ad") === true, "Test 3 failed");
console.assert(dict.search("b..") === true, "Test 4 failed");
