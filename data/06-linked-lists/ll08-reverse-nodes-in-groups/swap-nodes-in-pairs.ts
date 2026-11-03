/**
 * Problem: Swap Nodes in Pairs (LeetCode 24)
 * Difficulty: Medium
 * Pattern: LL8 - Reverse nodes in groups (k = 2)
 *
 * Swap every two adjacent nodes and return its head.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Iterative Pair Swap via Dummy Head) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;

    first.next = second.next;
    second.next = first;
    prev.next = second;

    prev = first;
  }

  return dummy.next;
}

// --- Test Verification ---
const h = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
const swapped = swapPairs(h);
console.assert(swapped!.val === 2 && swapped!.next!.val === 1 && swapped!.next!.next!.val === 4, "Test failed");
