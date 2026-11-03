/**
 * Problem: Linked List Cycle (LeetCode 141)
 * Difficulty: Easy
 * Pattern: LL3 - Fast and slow pointers
 *
 * Determine if linked list has a cycle in O(1) memory.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Floyd's Tortoise and Hare) ---
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
const a = new ListNode(1);
const b = new ListNode(2);
a.next = b; b.next = a;
console.assert(hasCycle(a) === true, "Test 1 failed");
console.assert(hasCycle(new ListNode(1)) === false, "Test 2 failed");
