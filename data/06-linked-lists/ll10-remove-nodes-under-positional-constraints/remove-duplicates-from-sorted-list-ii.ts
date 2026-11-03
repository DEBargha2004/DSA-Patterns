/**
 * Problem: Remove Duplicates from Sorted List II (LeetCode 82)
 * Difficulty: Medium
 * Pattern: LL10 - Remove nodes under positional constraints
 *
 * Delete all nodes that have duplicate numbers, leaving only distinct numbers from original list.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Sentinel Dummy Node + Lookahead Check) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function deleteDuplicatesII(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (head !== null) {
    if (head.next !== null && head.val === head.next.val) {
      while (head.next !== null && head.val === head.next.val) {
        head = head.next;
      }
      prev.next = head.next;
    } else {
      prev = prev.next!;
    }
    head = head.next;
  }

  return dummy.next;
}

// --- Test Verification ---
const l = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(4, new ListNode(4, new ListNode(5)))))));
const res = deleteDuplicatesII(l);
console.assert(res!.val === 1 && res!.next!.val === 2 && res!.next!.next!.val === 5, "Test failed");
