/**
 * Problem: Swapping Nodes in a Linked List (LeetCode 1721)
 * Difficulty: Medium
 * Pattern: LL6 - Find the kth node from the end
 *
 * Swap values of kth node from beginning and kth node from end.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (One Pass Two Pointers) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function swapNodes(head: ListNode | null, k: number): ListNode | null {
  let curr = head;
  let firstK: ListNode | null = null;
  let secondK = head;

  for (let i = 1; i < k; i++) {
    curr = curr!.next;
  }
  firstK = curr;

  let fast = curr!.next;
  while (fast !== null) {
    fast = fast.next;
    secondK = secondK!.next;
  }

  const temp = firstK!.val;
  firstK!.val = secondK!.val;
  secondK!.val = temp;

  return head;
}

// --- Test Verification ---
const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
swapNodes(list, 2);
console.assert(list.next!.val === 4 && list.next!.next!.next!.val === 2, "Test failed");
