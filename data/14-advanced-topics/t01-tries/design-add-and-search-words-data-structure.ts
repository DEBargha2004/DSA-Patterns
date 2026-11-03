/**
 * Pattern: Tries
 * Problem: Design Add and Search Words Data Structure (LeetCode 211)
 *
 * Design a data structure that supports adding new words and finding if a string
 * matches any previously added string, supporting '.' as a wildcard matching any letter.
 */

// Brute Force: Array of regex expressions
// Time: Insert O(1), Search O(N * L), Space: O(N * L)
export class WordDictionaryBrute {
  private words: string[] = [];

  addWord(word: string): void {
    this.words.push(word);
  }

  search(word: string): boolean {
    const reg = new RegExp(`^${word}$`);
    return this.words.some(w => reg.test(w));
  }
}

// Optimal: Trie with DFS on '.' wildcard
// Time: Add O(L), Search O(26^dots * L), Space: O(Total characters)
class WordNode {
  children: (WordNode | null)[] = new Array(26).fill(null);
  isEnd: boolean = false;
}

export class WordDictionaryOptimal {
  private root: WordNode = new WordNode();

  addWord(word: string): void {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const idx = word.charCodeAt(i) - 97;
      if (!curr.children[idx]) {
        curr.children[idx] = new WordNode();
      }
      curr = curr.children[idx]!;
    }
    curr.isEnd = true;
  }

  search(word: string): boolean {
    function dfs(node: WordNode, index: number): boolean {
      if (index === word.length) return node.isEnd;

      const ch = word[index];
      if (ch === '.') {
        for (let i = 0; i < 26; i++) {
          if (node.children[i] && dfs(node.children[i]!, index + 1)) {
            return true;
          }
        }
        return false;
      } else {
        const idx = ch.charCodeAt(0) - 97;
        if (!node.children[idx]) return false;
        return dfs(node.children[idx]!, index + 1);
      }
    }

    return dfs(this.root, 0);
  }
}

// Test cases
const wd = new WordDictionaryOptimal();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");
if (wd.search("pad")) throw new Error("Expected pad to be false");
if (!wd.search("bad") || !wd.search(".ad") || !wd.search("b..")) throw new Error("Expected matches");
console.log("Design Add and Search Words passed!");
