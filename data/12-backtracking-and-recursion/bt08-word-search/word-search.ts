/**
 * Pattern: Word search
 * Problem: Word Search (LeetCode 79)
 *
 * Given an m x n grid of characters board and a string word, return true if word exists in the grid.
 */

// Brute Force: DFS from every cell with separate visited matrix
// Time: O(M * N * 4^L), Space: O(M * N)
export function existBrute(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;
  const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === word.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || visited[r][c] || board[r][c] !== word[idx]) {
      return false;
    }

    visited[r][c] = true;
    const found = dfs(r + 1, c, idx + 1) ||
                  dfs(r - 1, c, idx + 1) ||
                  dfs(r, c + 1, idx + 1) ||
                  dfs(r, c - 1, idx + 1);
    visited[r][c] = false;
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

// Optimal: In-place cell mask + Frequency Count Pruning (reverse search if last char rarer)
// Time: O(M * N * 3^L), Space: O(L) stack
export function existOptimal(board: string[][], word: string): boolean {
  const m = board.length, n = board[0].length;

  // Pruning: check if board contains all characters of word
  const boardCounts = new Map<string, number>();
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      boardCounts.set(board[r][c], (boardCounts.get(board[r][c]) || 0) + 1);
    }
  }

  const wordCounts = new Map<string, number>();
  for (const ch of word) {
    wordCounts.set(ch, (wordCounts.get(ch) || 0) + 1);
    if ((wordCounts.get(ch) || 0) > (boardCounts.get(ch) || 0)) {
      return false; // Character missing or insufficient
    }
  }

  // Reverse search if first character is more common than last character
  let targetWord = word;
  if ((boardCounts.get(word[0]) || 0) > (boardCounts.get(word[word.length - 1]) || 0)) {
    targetWord = word.split("").reverse().join("");
  }

  function dfs(r: number, c: number, idx: number): boolean {
    if (idx === targetWord.length) return true;
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== targetWord[idx]) {
      return false;
    }

    const temp = board[r][c];
    board[r][c] = '#'; // Mark visited

    const found = dfs(r + 1, c, idx + 1) ||
                  dfs(r - 1, c, idx + 1) ||
                  dfs(r, c + 1, idx + 1) ||
                  dfs(r, c - 1, idx + 1);

    board[r][c] = temp; // Restore
    return found;
  }

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === targetWord[0] && dfs(r, c, 0)) {
        return true;
      }
    }
  }
  return false;
}

// Test cases
const board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
];
if (!existBrute(board, "ABCCED") || !existOptimal(board, "ABCCED")) throw new Error("Expected true for ABCCED");
if (existOptimal(board, "ABCB")) throw new Error("Expected false for ABCB");
console.log("Word Search passed!");
