/**
 * Problem: Partition List (LeetCode 86)
 * Difficulty: Medium
 * Pattern: LL9 - Reorder a linked list
 *
 * Partition list such that all nodes < x come before nodes >= x while preserving relative order.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Dummy Lists for Before and After) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function partition(head: ListNode | null, x: number): ListNode | null {
  const beforeHead = new ListNode(0);
  const afterHead = new ListNode(0);
  let before = beforeHead;
  let after = afterHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val < x) {
      before.next = curr;
      before = before.next;
    } else {
      after.next = curr;
      after = after.next;
    }
    curr = curr.next;
  }

  after.next = null;
  before.next = afterHead.next;

  return beforeHead.next;
}

// --- Test Verification ---
const l = new ListNode(1, new ListNode(4, new ListNode(3, new ListNode(2, new ListNode(5, new ListNode(2))))));
const p = partition(l, 3);
console.assert(p!.val === 1 && p!.next!.val === 2 && p!.next!.next!.val === 2 && p!.next!.next!.next!.val === 4, "Test failed");
