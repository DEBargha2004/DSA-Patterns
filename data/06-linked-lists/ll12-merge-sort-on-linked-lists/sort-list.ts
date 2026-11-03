/**
 * Problem: Sort List (LeetCode 148)
 * Difficulty: Medium
 * Pattern: LL12 - Merge sort on linked lists
 *
 * Sort a linked list in O(n log n) time and O(log n) stack / O(1) space.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Top-Down Merge Sort on Linked List) ---
// Time Complexity: O(n log n)
// Space Complexity: O(log n) recursion stack
export function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  // Split list into two halves using fast and slow pointers
  let prev: ListNode | null = null;
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast && fast.next) {
    prev = slow;
    slow = slow!.next;
    fast = fast.next.next;
  }

  prev!.next = null; // Cut list in half

  const left = sortList(head);
  const right = sortList(slow);

  // Merge two sorted linked lists
  const dummy = new ListNode(0);
  let tail = dummy;
  let p1 = left, p2 = right;

  while (p1 && p2) {
    if (p1.val <= p2.val) {
      tail.next = p1;
      p1 = p1.next;
    } else {
      tail.next = p2;
      p2 = p2.next;
    }
    tail = tail.next;
  }

  tail.next = p1 || p2;
  return dummy.next;
}

// --- Test Verification ---
const h = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
const sorted = sortList(h);
console.assert(sorted!.val === 1 && sorted!.next!.val === 2 && sorted!.next!.next!.val === 3, "Test failed");
