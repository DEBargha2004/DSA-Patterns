/**
 * Problem: Reverse Nodes in k-Group (LeetCode 25)
 * Difficulty: Hard
 * Pattern: LL8 - Reverse nodes in groups
 *
 * Reverse the nodes of a linked list k at a time, leaving remaining nodes unchanged.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (In-Place K-Group Reversal with Dummy Head) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  if (!head || k <= 1) return head;

  const dummy = new ListNode(0, head);
  let groupPrev = dummy;

  while (true) {
    // Check if k nodes exist ahead
    let kth: ListNode | null = groupPrev;
    for (let i = 0; i < k && kth !== null; i++) {
      kth = kth.next;
    }
    if (!kth) break;

    const groupNext = kth.next;
    // Reverse this group
    let prev = groupNext;
    let curr = groupPrev.next;

    while (curr !== groupNext) {
      const next = curr!.next;
      curr!.next = prev;
      prev = curr;
      curr = next;
    }

    const temp = groupPrev.next;
    groupPrev.next = kth;
    groupPrev = temp!;
  }

  return dummy.next;
}

// --- Test Verification ---
const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));
const r = reverseKGroup(head, 2);
console.assert(r!.val === 2 && r!.next!.val === 1 && r!.next!.next!.val === 4, "Test failed");
