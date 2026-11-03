/**
 * Problem: Palindrome Linked List (LeetCode 234)
 * Difficulty: Easy
 * Pattern: LL2 - Reverse a linked list / Two pointers
 *
 * Return true if a singly linked list is a palindrome in O(n) time and O(1) space.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Find Middle + Reverse Second Half + Compare) ---
// Time Complexity: O(n)
// Space Complexity: O(1)
export function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 1. Find middle node using slow and fast pointers
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // 2. Reverse second half
  let prev: ListNode | null = null;
  let curr = slow.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Compare halves
  let p1: ListNode | null = head;
  let p2: ListNode | null = prev;
  let isPal = true;

  while (p2) {
    if (p1!.val !== p2.val) {
      isPal = false;
      break;
    }
    p1 = p1!.next;
    p2 = p2.next;
  }

  return isPal;
}

// --- Test Verification ---
const pal = new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))));
console.assert(isPalindrome(pal) === true, "Test 1 failed");
const nonPal = new ListNode(1, new ListNode(2));
console.assert(isPalindrome(nonPal) === false, "Test 2 failed");
