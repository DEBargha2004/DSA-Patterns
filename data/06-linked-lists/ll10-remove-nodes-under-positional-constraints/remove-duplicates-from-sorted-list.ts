/**
 * Problem: Remove Duplicates from Sorted List (LeetCode 83)
 * Difficulty: Easy
 * Pattern: LL10 - Remove nodes under positional constraints
 *
 * Delete all duplicates such that each element appears only once.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Linear Scan) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function deleteDuplicates(head: ListNode | null): ListNode | null {
  let curr = head;
  while (curr && curr.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }
  return head;
}

// --- Test Verification ---
const h = new ListNode(1, new ListNode(1, new ListNode(2)));
const r = deleteDuplicates(h);
console.assert(r!.val === 1 && r!.next!.val === 2 && r!.next!.next === null, "Test failed");
