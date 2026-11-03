/**
 * Problem: Reorder List (LeetCode 143)
 * Difficulty: Medium
 * Pattern: LL9 - Reorder a linked list
 *
 * Reorder list to: L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → … in-place.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Find Mid + Reverse Second Half + Merge Alternating) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reorderList(head: ListNode | null): void {
  if (!head || !head.next) return;

  // 1. Find middle node
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let prev: ListNode | null = null;
  let curr: ListNode | null = slow!.next;
  slow!.next = null; // Split lists

  while (curr) {
    const nextNode: ListNode | null = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
  }

  // 3. Merge two halves alternatingly
  let first: ListNode | null = head;
  let second: ListNode | null = prev;

  while (second) {
    const tmp1: ListNode | null = first!.next;
    const tmp2: ListNode | null = second.next;

    first!.next = second;
    second.next = tmp1;

    first = tmp1;
    second = tmp2;
  }
}

// --- Test Verification ---
const h = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
reorderList(h);
console.assert(h.val === 1 && h.next!.val === 4 && h.next!.next!.val === 2, "Test failed");
