/**
 * Problem: Remove Linked List Elements (LeetCode 203)
 * Difficulty: Easy
 * Pattern: LL1 - Basic traversal and modification
 *
 * Remove all nodes of the linked list that has Node.val == val.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Sentinel / Dummy Head Traversal) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function removeElements(head: ListNode | null, val: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let curr = dummy;

  while (curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next;
    } else {
      curr = curr.next;
    }
  }

  return dummy.next;
}

// --- Test Verification ---
const head = new ListNode(1, new ListNode(2, new ListNode(6, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))))));
const res = removeElements(head, 6);
let curr = res;
let has6 = false;
while (curr) {
  if (curr.val === 6) has6 = true;
  curr = curr.next;
}
console.assert(!has6, "Test failed");
