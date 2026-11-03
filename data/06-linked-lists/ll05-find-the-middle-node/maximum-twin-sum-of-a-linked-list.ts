/**
 * Problem: Maximum Twin Sum of a Linked List (LeetCode 2130)
 * Difficulty: Medium
 * Pattern: LL5 - Find the middle node + Reverse second half
 *
 * Twin of node i is (n - 1 - i). Return maximum twin sum.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Find Mid + Reverse Second Half + Twin Sum Comparison) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function pairSum(head: ListNode | null): number {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // Reverse second half starting at slow
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow;
  while (curr) {
    const nextNode: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  // Calculate twin sums
  let p1: ListNode | null = head;
  let p2 = prev;
  let maxSum = 0;

  while (p2) {
    maxSum = Math.max(maxSum, p1!.val + p2.val);
    p1 = p1!.next;
    p2 = p2.next;
  }

  return maxSum;
}

// --- Test Verification ---
const head = new ListNode(5, new ListNode(4, new ListNode(2, new ListNode(1))));
console.assert(pairSum(head) === 6, "Test 1 failed");
