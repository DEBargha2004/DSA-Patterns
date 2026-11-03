/**
 * Problem: Merge In Between Linked Lists (LeetCode 1669)
 * Difficulty: Medium
 * Pattern: LL7 - Merge sorted linked lists
 *
 * Remove list1's nodes from ath to bth, and put list2 in their place.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Pointer Splice) ---
// Time Complexity: O(list1.length + list2.length)
// Space Complexity: O(1)
export function mergeInBetween(list1: ListNode | null, a: number, b: number, list2: ListNode | null): ListNode | null {
  let prevA = list1;
  for (let i = 0; i < a - 1; i++) {
    prevA = prevA!.next;
  }

  let afterB = prevA;
  for (let i = 0; i < b - a + 2; i++) {
    afterB = afterB!.next;
  }

  let list2Tail = list2;
  while (list2Tail && list2Tail.next) {
    list2Tail = list2Tail.next;
  }

  prevA!.next = list2;
  list2Tail!.next = afterB;

  return list1;
}

// --- Test Verification ---
const l1 = new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))));
const l2 = new ListNode(100, new ListNode(101, new ListNode(102)));
const out = mergeInBetween(l1, 3, 4, l2);
console.assert(out!.next!.next!.next!.val === 100, "Test failed");
