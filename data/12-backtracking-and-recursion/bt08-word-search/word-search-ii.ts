/**
 * Pattern: Word search
 * Problem: Word Search II (LeetCode 212)
 *
 * Given an m x n board of characters and a list of strings words, return all words on the board.
 */

// Brute Force: Run Word Search I for each distinct word individually
// Time: O(W * M * N * 4^L), Space: O(L)
export function findWordsBrute(board: string[][], words: string[]): string[] {
  const m = board.length, n = board[0].length;
  const result: string[] = [];

  function exist(word: string): boolean {
    function dfs(r: number, c: number, idx: number): boolean {
      if (idx === word.length) return true;
      if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== word[idx]) return false;

      const temp = board[r][c];
      board[r][c] = '#';
      const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);
      board[r][c] = temp;
      return found;
    }

    for (let r = 0; r < m; r++) {
      for (let c = 0; c < n; c++) {
        if (dfs(r, c, 0)) return true;
      }
    }
    return false;
  }

  for (const w of words) {
    if (exist(w)) result.push(w);
  }
  return result;
}

// Optimal: Prefix Tree (Trie) + Backtracking with node pruning
// Time: O(M * N * 3^L_max), Space: O(Total characters in words) for Trie
interface TrieNode {
  children: Map<string, TrieNode>;
  word: string | null;
}

export function findWordsOptimal(board: string[][], words: string[]): string[] {
  const root: TrieNode = { children: new Map(), word: null };

  // Build Trie
  for (const w of words) {
    let curr = root;
    for (const ch of w) {
      if (!curr.children.has(ch)) {
        curr.children.set(ch, { children: new Map(), word: null });
      }
      curr = curr.children.get(ch)!;
    }
    curr.word = w;
  }

  const m = board.length, n = board[0].length;
  const result: string[] = [];

  function dfs(r: number, c: number, parentNode: TrieNode): void {
    const ch = board[r][c];
    const currNode = parentNode.children.get(ch);
    if (!currNode) return;

    if (currNode.word !== null) {
      result.push(currNode.word);
      currNode.word = null; // Avoid duplicate collection
    }

    board[r][c] = '#'; // Mark visited

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] !== '#') {
        dfs(nr, nc, currNode);
      }
    }

    board[r][c] = ch; // Restore

    // Prune leaf TrieNode
    if (currNode.children.size === 0) {
      parentNode.children.delete(ch);
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

// Test cases
const boardWS2 = [
  ["o","a","a","n"],
  ["e","t","a","e"],
  ["i","h","k","r"],
  ["i","f","l","v"]
];
const wordsWS2 = ["oath","pea","eat","rain"];
const resWS2_1 = findWordsBrute(boardWS2, wordsWS2).sort();
const resWS2_2 = findWordsOptimal(boardWS2, wordsWS2).sort();
if (JSON.stringify(resWS2_1) !== JSON.stringify(resWS2_2) || resWS2_2.length !== 2) {
  throw new Error("Mismatch in Word Search II");
}
console.log("Word Search II passed!");
