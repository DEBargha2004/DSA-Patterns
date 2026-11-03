/**
 * Problem: Middle of the Linked List (LeetCode 876)
 * Difficulty: Easy
 * Pattern: LL3 - Fast and slow pointers
 *
 * Return the middle node of the linked list (if two middle nodes, return second).
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
// Time Complexity: O(n) - fast travels twice as fast as slow
// Space Complexity: O(1)
export function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}

// --- Test Verification ---
const l1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.assert(middleNode(l1)!.val === 3, "Test 1 failed");
const l2 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))));
console.assert(middleNode(l2)!.val === 4, "Test 2 failed");
