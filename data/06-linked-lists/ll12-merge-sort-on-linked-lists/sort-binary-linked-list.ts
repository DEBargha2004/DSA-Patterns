/**
 * Problem: Sort Binary Linked List (0s and 1s)
 * Difficulty: Easy
 * Pattern: LL12 - Sorting linked lists
 *
 * Given a linked list containing only 0s and 1s, sort it in O(n) time and O(1) space.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Pointers Zero/One Buckets or In-Place Splice) ---
// Time Complexity: O(n) - single pass
// Space Complexity: O(1)
export function sortBinaryList(head: ListNode | null): ListNode | null {
  const zeroHead = new ListNode(0);
  const oneHead = new ListNode(0);
  let zero = zeroHead;
  let one = oneHead;

  let curr = head;
  while (curr !== null) {
    if (curr.val === 0) {
      zero.next = curr;
      zero = zero.next;
    } else {
      one.next = curr;
      one = one.next;
    }
    curr = curr.next;
  }

  one.next = null;
  zero.next = oneHead.next;

  return zeroHead.next;
}

// --- Test Verification ---
const bin = new ListNode(1, new ListNode(0, new ListNode(1, new ListNode(0, new ListNode(1)))));
const sorted = sortBinaryList(bin);
console.assert(sorted!.val === 0 && sorted!.next!.val === 0 && sorted!.next!.next!.val === 1, "Test failed");
