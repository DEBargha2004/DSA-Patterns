/**
 * Problem: Odd Even Linked List (LeetCode 328)
 * Difficulty: Medium
 * Pattern: LL9 - Reorder a linked list
 *
 * Group all odd nodes together followed by the even nodes in O(1) extra space and O(n) time.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Separate Odd & Even Pointer Chains) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function oddEvenList(head: ListNode | null): ListNode | null {
  if (!head) return null;

  let odd: ListNode | null = head;
  let even: ListNode | null = head.next;
  const evenHead = even;

  while (even && even.next) {
    odd!.next = even.next;
    odd = odd!.next;
    even.next = odd.next;
    even = even.next;
  }

  odd!.next = evenHead;
  return head;
}

// --- Test Verification ---
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const r = oddEvenList(list);
console.assert(r!.val === 1 && r!.next!.val === 3 && r!.next!.next!.val === 5 && r!.next!.next!.next!.val === 2, "Test failed");
