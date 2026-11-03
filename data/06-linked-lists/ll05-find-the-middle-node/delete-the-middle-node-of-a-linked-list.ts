/**
 * Problem: Delete the Middle Node of a Linked List (LeetCode 2095)
 * Difficulty: Medium
 * Pattern: LL5 - Find the middle node
 *
 * Delete middle node of linked list and return head.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Fast and Slow with Prev Pointer) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function deleteMiddle(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return null;

  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  let prev: ListNode | null = null;

  while (fast && fast.next) {
    prev = slow;
    slow = slow!.next;
    fast = fast.next.next;
  }

  prev!.next = slow!.next;
  return head;
}

// --- Test Verification ---
const list = new ListNode(1, new ListNode(3, new ListNode(4, new ListNode(7, new ListNode(1, new ListNode(2, new ListNode(6)))))));
const res = deleteMiddle(list);
console.assert(res!.next!.next!.val === 4 && res!.next!.next!.next!.val === 1, "Test failed");
