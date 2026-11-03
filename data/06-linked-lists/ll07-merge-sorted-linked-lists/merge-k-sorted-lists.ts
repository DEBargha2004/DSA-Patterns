/**
 * Problem: Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 * Pattern: LL7 - Merge sorted linked lists (Divide and Conquer)
 *
 * Merge all the linked-lists into one sorted linked-list and return it.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Divide and Conquer Pairwise Merging) ---
// Time Complexity: O(N log k) where N is total nodes, k is lists count
// Space Complexity: O(1) auxiliary
export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;

  function mergeTwo(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let tail = dummy;
    while (l1 && l2) {
      if (l1.val <= l2.val) { tail.next = l1; l1 = l1.next; }
      else { tail.next = l2; l2 = l2.next; }
      tail = tail.next;
    }
    tail.next = l1 || l2;
    return dummy.next;
  }

  let interval = 1;
  while (interval < lists.length) {
    for (let i = 0; i + interval < lists.length; i += interval * 2) {
      lists[i] = mergeTwo(lists[i], lists[i + interval]);
    }
    interval *= 2;
  }

  return lists[0];
}

// --- Test Verification ---
const a = new ListNode(1, new ListNode(4, new ListNode(5)));
const b = new ListNode(1, new ListNode(3, new ListNode(4)));
const c = new ListNode(2, new ListNode(6));
const merged = mergeKLists([a, b, c]);
console.assert(merged!.val === 1 && merged!.next!.val === 1 && merged!.next!.next!.val === 2, "Test failed");
