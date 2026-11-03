/**
 * Pattern: Range-query structures
 * Problem: Range Minimum Query (RMQ) via Sparse Table
 *
 * Compute min(arr[L..R]) in O(1) time after O(N log N) preprocessing.
 */

// Brute Force: Linear scan
// Time: O(N), Space: O(1)
export function rmqBrute(arr: number[], l: number, r: number): number {
  let minVal = Infinity;
  for (let i = l; i <= r; i++) minVal = Math.min(minVal, arr[i]);
  return minVal;
}

// Optimal: Sparse Table (Power-of-two intervals: ST[k][i] = min(arr[i .. i + 2^k - 1]))
// Time: Build O(N log N), Query O(1); Space: O(N log N)
export class SparseTableRMQ {
  private st: number[][];

  constructor(arr: number[]) {
    const n = arr.length;
    const k = Math.floor(Math.log2(n)) + 1;
    this.st = Array.from({ length: k }, () => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      this.st[0][i] = arr[i];
    }

    for (let j = 1; j < k; j++) {
      const len = 1 << (j - 1);
      for (let i = 0; i + (1 << j) <= n; i++) {
        this.st[j][i] = Math.min(this.st[j - 1][i], this.st[j - 1][i + len]);
      }
    }
  }

  query(l: number, r: number): number {
    const len = r - l + 1;
    const k = Math.floor(Math.log2(len));
    return Math.min(this.st[k][l], this.st[k][r - (1 << k) + 1]);
  }
}

// Test cases
const rmqArr = [7, 2, 3, 0, 5, 10, 3, 12, 18];
const stRMQ = new SparseTableRMQ(rmqArr);
if (stRMQ.query(0, 4) !== 0 || stRMQ.query(4, 7) !== 3 || stRMQ.query(1, 2) !== 2) {
  throw new Error("Sparse Table RMQ failed");
}
console.log("Range Minimum Query Sparse Table passed!");
