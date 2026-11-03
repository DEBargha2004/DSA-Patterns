/**
 * Pattern: Tries
 * Problem: Maximum XOR of Two Numbers in an Array (LeetCode 421)
 *
 * Given an integer array nums, return the maximum result of nums[i] XOR nums[j].
 */

// Brute Force: Check all pairs
// Time: O(N^2), Space: O(1)
export function findMaximumXORBrute(nums: number[]): number {
  let maxXor = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      maxXor = Math.max(maxXor, nums[i] ^ nums[j]);
    }
  }
  return maxXor;
}

// Optimal: Bitwise Trie (31-bit binary tree matching opposite bits greedily)
// Time: O(32 * N) = O(N), Space: O(32 * N) = O(N)
class BinaryTrieNode {
  children: [BinaryTrieNode | null, BinaryTrieNode | null] = [null, null];
}

export function findMaximumXOROptimal(nums: number[]): number {
  const root = new BinaryTrieNode();

  // Insert numbers into Trie
  for (const num of nums) {
    let curr = root;
    for (let bit = 31; bit >= 0; bit--) {
      const b = (num >> bit) & 1;
      if (!curr.children[b]) {
        curr.children[b] = new BinaryTrieNode();
      }
      curr = curr.children[b]!;
    }
  }

  let maxXor = 0;

  // Query each number against opposite bits
  for (const num of nums) {
    let curr = root;
    let currXor = 0;
    for (let bit = 31; bit >= 0; bit--) {
      const b = (num >> bit) & 1;
      const opposite = b ^ 1;
      if (curr.children[opposite]) {
        currXor |= (1 << bit);
        curr = curr.children[opposite]!;
      } else {
        curr = curr.children[b]!;
      }
    }
    maxXor = Math.max(maxXor, currXor);
  }

  return maxXor;
}

// Test cases
const xNums = [3, 10, 5, 25, 2, 8];
if (findMaximumXORBrute(xNums) !== 28 || findMaximumXOROptimal(xNums) !== 28) {
  throw new Error("Expected 28 maxXor");
}
console.log("Maximum XOR of Two Numbers passed!");
