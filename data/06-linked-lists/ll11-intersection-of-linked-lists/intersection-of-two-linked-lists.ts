/**
 * Problem: Intersection of Two Linked Lists (LeetCode 160)
 * Difficulty: Easy
 * Pattern: LL11 - Intersection of linked lists
 *
 * Find node at which the intersection of two singly linked lists begins in O(1) space and O(m + n) time.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Pointers Alternating List Traversal) ---
// Time Complexity: O(m + n)
// Space Complexity: O(1)
// Pointer A traverses listA then listB; pointer B traverses listB then listA.
// Both traverse identical distance (m + n) and meet at intersection.
export function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  if (!headA || !headB) return null;

  let pA: ListNode | null = headA;
  let pB: ListNode | null = headB;

  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA;
}

// --- Test Verification ---
const common = new ListNode(8, new ListNode(4, new ListNode(5)));
const hA = new ListNode(4, new ListNode(1, common));
const hB = new ListNode(5, new ListNode(6, new ListNode(1, common)));
console.assert(getIntersectionNode(hA, hB) === common, "Test failed");
