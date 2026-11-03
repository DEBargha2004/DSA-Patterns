/**
 * Problem: Insertion Sort List (LeetCode 147)
 * Difficulty: Medium
 * Pattern: LL12 - Sorting linked lists
 *
 * Sort a linked list using insertion sort.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Dummy Head Insertion Sort) ---
// Time Complexity: O(n^2) worst case, O(n) best case
// Space Complexity: O(1)
export function insertionSortList(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = head;

  while (curr !== null) {
    const nextNode = curr.next;
    let prev = dummy;

    while (prev.next !== null && prev.next.val < curr.val) {
      prev = prev.next;
    }

    curr.next = prev.next;
    prev.next = curr;
    curr = nextNode;
  }

  return dummy.next;
}

// --- Test Verification ---
const list = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
const s = insertionSortList(list);
console.assert(s!.val === 1 && s!.next!.val === 2 && s!.next!.next!.val === 3, "Test failed");
