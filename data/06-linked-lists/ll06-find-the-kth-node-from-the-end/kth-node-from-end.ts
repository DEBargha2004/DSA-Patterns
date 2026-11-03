/**
 * Problem: Kth Node From End of Linked List
 * Difficulty: Easy
 * Pattern: LL6 - Find the kth node from the end
 *
 * Find value of kth node from end (1-indexed).
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Two Pointers Fast Lead by K Steps) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function getKthFromEnd(head: ListNode | null, k: number): number {
  let fast = head;
  let slow = head;

  for (let i = 0; i < k; i++) {
    if (!fast) return -1;
    fast = fast.next;
  }

  while (fast !== null) {
    fast = fast.next;
    slow = slow!.next;
  }

  return slow ? slow.val : -1;
}

// --- Test Verification ---
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
console.assert(getKthFromEnd(head, 2) === 4, "Test 1 failed");
console.assert(getKthFromEnd(head, 5) === 1, "Test 2 failed");
