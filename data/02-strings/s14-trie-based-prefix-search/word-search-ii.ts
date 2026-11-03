/**
 * Problem: Word Search II (LeetCode 212)
 * Difficulty: Hard
 * Pattern: S14 - Trie-based prefix search
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 */

class TrieNode2 {
  children: Map<string, TrieNode2> = new Map();
  word: string | null = null;
}

export function findWords(board: string[][], words: string[]): string[] {
  const root = new TrieNode2();
  for (const w of words) {
    let node = root;
    for (const ch of w) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode2());
      node = node.children.get(ch)!;
    }
    node.word = w;
  }

  const m = board.length;
  const n = board[0].length;
  const result: string[] = [];

  function dfs(r: number, c: number, parent: TrieNode2): void {
    const ch = board[r][c];
    const currNode = parent.children.get(ch);
    if (!currNode) return;

    if (currNode.word !== null) {
      result.push(currNode.word);
      currNode.word = null; // Prevent duplicate additions
    }

    board[r][c] = '#'; // Mark visited
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      const nr = r + dr[i];
      const nc = c + dc[i];
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] !== '#') {
        dfs(nr, nc, currNode);
      }
    }

    board[r][c] = ch; // Backtrack

    // Prune leaf node
    if (currNode.children.size === 0) {
      parent.children.delete(ch);
    }
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (root.children.has(board[r][c])) {
        dfs(r, c, root);
      }
    }
  }

  return result;
}

// --- Test Verification ---
const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"]
];
const found = findWords(board, ["oath", "pea", "eat", "rain"]);
console.assert(found.includes("oath") && found.includes("eat"), "Test failed");
