/**
 * Problem: Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 * Pattern: TP3 - Fast and slow pointers (Floyd's Tortoise and Hare)
 *
 * Determine if linked list has a cycle.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Floyd's Cycle-Finding Algorithm) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}

// --- Test Verification ---
const n1 = new ListNode(3);
const n2 = new ListNode(2);
const n3 = new ListNode(0);
const n4 = new ListNode(-4);
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2; // cycle at n2
console.assert(hasCycle(n1) === true, "Test 1 failed");

const single = new ListNode(1);
console.assert(hasCycle(single) === false, "Test 2 failed");
