/**
 * Problem: Intersection of Linked Lists via Length Difference Method
 * Difficulty: Easy
 * Pattern: LL11 - Intersection of linked lists
 *
 * Alternative canonical solution: Calculate lengths of both lists, advance pointer of longer list by diff.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Length Difference Offset) ---
// Time Complexity: O(m + n)
// Space Complexity: O(1)
export function getIntersectionNodeDiff(headA: ListNode | null, headB: ListNode | null): ListNode | null {
  let lenA = 0, lenB = 0;
  let currA = headA, currB = headB;

  while (currA) { lenA++; currA = currA.next; }
  while (currB) { lenB++; currB = currB.next; }

  currA = headA;
  currB = headB;

  while (lenA > lenB) { currA = currA!.next; lenA--; }
  while (lenB > lenA) { currB = currB!.next; lenB--; }

  while (currA !== currB) {
    currA = currA!.next;
    currB = currB!.next;
  }

  return currA;
}

// --- Test Verification ---
const shared = new ListNode(10);
const a = new ListNode(1, new ListNode(2, shared));
const b = new ListNode(3, shared);
console.assert(getIntersectionNodeDiff(a, b) === shared, "Test failed");
