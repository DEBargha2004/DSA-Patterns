/**
 * Problem: Reverse Linked List (LeetCode 206)
 * Difficulty: Easy
 * Pattern: LL2 - Reverse a linked list
 *
 * Reverse a singly linked list in-place.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Iterative Three Pointers: prev, curr, next) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  return prev;
}

// --- Test Verification ---
const h = new ListNode(1, new ListNode(2, new ListNode(3)));
const rev = reverseList(h);
console.assert(rev!.val === 3 && rev!.next!.val === 2 && rev!.next!.next!.val === 1, "Test failed");
