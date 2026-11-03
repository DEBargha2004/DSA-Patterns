/**
 * Problem: Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 * Pattern: LL5 - Find the middle node
 *
 * Return second middle node for even lengths.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Fast & Slow Pointers) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function middleNode(head: ListNode | null): ListNode | null {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  return slow;
}

// --- Test Verification ---
const l = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.assert(middleNode(l)!.val === 3, "Test failed");
