/**
 * Problem: Reverse Linked List II (LeetCode 92)
 * Difficulty: Medium
 * Pattern: LL2 - Reverse a linked list
 *
 * Reverse the nodes of the list from position left to position right in one pass.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (One Pass In-Place Head Insertion) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head || left === right) return head;

  const dummy = new ListNode(0, head);
  let pre = dummy;

  for (let i = 1; i < left; i++) {
    pre = pre.next!;
  }

  const start = pre.next!;
  let then = start.next;

  for (let i = 0; i < right - left; i++) {
    start.next = then!.next;
    then!.next = pre.next;
    pre.next = then;
    then = start.next;
  }

  return dummy.next;
}

// --- Test Verification ---
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const r = reverseBetween(list, 2, 4);
console.assert(r!.next!.val === 4 && r!.next!.next!.val === 3 && r!.next!.next!.next!.val === 2, "Test failed");
