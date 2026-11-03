/**
 * Problem: Remove Nth Node From End of List (LeetCode 19)
 * Difficulty: Medium
 * Pattern: LL6 - Find the kth node from the end
 *
 * Remove the nth node from the end of the list and return its head in one pass.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Pointers with N-Gap) ---
// Time Complexity: O(n) - one pass
// Space Complexity: O(1)
export function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let first: ListNode | null = dummy;
  let second: ListNode | null = dummy;

  // Advance first by n + 1 steps
  for (let i = 0; i <= n; i++) {
    first = first!.next;
  }

  // Move both until first reaches end
  while (first !== null) {
    first = first.next;
    second = second!.next;
  }

  second!.next = second!.next!.next;
  return dummy.next;
}

// --- Test Verification ---
const l = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const r = removeNthFromEnd(l, 2);
console.assert(r!.next!.next!.next!.val === 5, "Test failed");
