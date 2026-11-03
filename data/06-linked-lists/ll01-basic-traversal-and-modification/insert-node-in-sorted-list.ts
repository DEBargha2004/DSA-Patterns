/**
 * Problem: Insert Node in a Sorted Linked List
 * Difficulty: Easy
 * Pattern: LL1 - Basic traversal and modification
 *
 * Insert a new node with value x into an already sorted linked list.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Dummy Head Traversal to Insertion Point) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function insertSorted(head: ListNode | null, val: number): ListNode {
  const newNode = new ListNode(val);
  const dummy = new ListNode(-Infinity, head);
  let curr = dummy;

  while (curr.next !== null && curr.next.val < val) {
    curr = curr.next;
  }

  newNode.next = curr.next;
  curr.next = newNode;

  return dummy.next!;
}

// --- Test Verification ---
const h = new ListNode(1, new ListNode(3, new ListNode(5)));
const updated = insertSorted(h, 4);
console.assert(updated.next!.next!.val === 4, "Test failed");
