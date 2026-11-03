/**
 * Problem: Linked List Cycle II (LeetCode 142)
 * Difficulty: Medium
 * Pattern: LL3 - Fast and slow pointers
 *
 * Return node where cycle begins. If no cycle, return null.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Floyd's Cycle Entry Finding) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  let hasLoop = false;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      hasLoop = true;
      break;
    }
  }

  if (!hasLoop) return null;

  let ptr1 = head;
  let ptr2 = slow;
  while (ptr1 !== ptr2) {
    ptr1 = ptr1!.next;
    ptr2 = ptr2!.next;
  }

  return ptr1;
}

// --- Test Verification ---
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(0);
const n4 = new ListNode(-4);
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2; // cycle begins at n2
console.assert(detectCycle(n1) === n2, "Test failed");
