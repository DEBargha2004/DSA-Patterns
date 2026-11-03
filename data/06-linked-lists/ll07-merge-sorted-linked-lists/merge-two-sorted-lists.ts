/**
 * Problem: Merge Two Sorted Lists (LeetCode 21)
 * Difficulty: Easy
 * Pattern: LL7 - Merge sorted linked lists
 *
 * Merge two sorted linked lists and return it as a sorted list.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Iterative Merge with Dummy Head) ---
// Time Complexity: O(n + m)
// Space Complexity: O(1)
export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }

  tail.next = list1 !== null ? list1 : list2;
  return dummy.next;
}

// --- Test Verification ---
const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const res = mergeTwoLists(l1, l2);
console.assert(res!.val === 1 && res!.next!.val === 1 && res!.next!.next!.val === 2, "Test failed");
