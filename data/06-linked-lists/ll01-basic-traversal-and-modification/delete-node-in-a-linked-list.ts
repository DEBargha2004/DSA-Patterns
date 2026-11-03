/**
 * Problem: Delete Node in a Linked List (LeetCode 237)
 * Difficulty: Medium
 * Pattern: LL1 - Basic traversal and modification
 *
 * Delete a node in a singly-linked list given only access to that node.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Copy Next Node Value and Skip Next) ---
// Time Complexity: O(1)
// Space Complexity: O(1)
export function deleteNode(node: ListNode): void {
  node.val = node.next!.val;
  node.next = node.next!.next;
}

// --- Test Verification ---
const n1 = new ListNode(4);
const n2 = new ListNode(5);
const n3 = new ListNode(1);
const n4 = new ListNode(9);
n1.next = n2; n2.next = n3; n3.next = n4;
deleteNode(n2);
console.assert(n1.next!.val === 1 && n1.next!.next!.val === 9, "Test failed");
