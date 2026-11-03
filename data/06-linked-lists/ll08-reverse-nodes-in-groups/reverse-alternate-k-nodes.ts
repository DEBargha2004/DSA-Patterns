/**
 * Problem: Reverse Alternate K Nodes in a Linked List
 * Difficulty: Medium
 * Pattern: LL8 - Reverse nodes in groups
 *
 * Reverse alternate k nodes: reverse k nodes, skip k nodes, reverse k nodes...
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Reverse K, Skip K Iteratively) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function kAltReverse(head: ListNode | null, k: number): ListNode | null {
  let curr = head;
  let prev: ListNode | null = null;
  let count = 0;

  // 1. Reverse first k nodes
  while (curr !== null && count < k) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
    count++;
  }

  // 2. Original head is now tail of reversed group
  if (head !== null) {
    head.next = curr;
  }

  // 3. Skip next k nodes
  count = 0;
  while (curr !== null && count < k - 1) {
    curr = curr.next;
    count++;
  }

  // 4. Recursively process rest
  if (curr !== null) {
    curr.next = kAltReverse(curr.next, k);
  }

  return prev;
}

// --- Test Verification ---
const l = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6))))));
const out = kAltReverse(l, 2);
console.assert(out!.val === 2 && out!.next!.val === 1 && out!.next!.next!.val === 3, "Test failed");
