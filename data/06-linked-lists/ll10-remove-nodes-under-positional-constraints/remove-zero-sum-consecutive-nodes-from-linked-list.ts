/**
 * Problem: Remove Zero Sum Consecutive Nodes from Linked List (LeetCode 1171)
 * Difficulty: Medium
 * Pattern: LL10 - Remove nodes under positional constraints
 *
 * Repeatedly delete consecutive sequences of nodes that sum to 0.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Prefix Sum with Hash Map Two-Pass) ---
// Time Complexity: O(n)
// Space Complexity: O(n)
export function removeZeroSumSublists(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  const prefixMap = new Map<number, ListNode>();
  let prefix = 0;

  // Pass 1: Record latest node for each prefix sum
  for (let node: ListNode | null = dummy; node !== null; node = node.next) {
    prefix += node.val;
    prefixMap.set(prefix, node);
  }

  // Pass 2: Skip zero-sum blocks
  prefix = 0;
  for (let node: ListNode | null = dummy; node !== null; node = node.next) {
    prefix += node.val;
    node.next = prefixMap.get(prefix)!.next;
  }

  return dummy.next;
}

// --- Test Verification ---
const list = new ListNode(1, new ListNode(2, new ListNode(-3, new ListNode(3, new ListNode(1)))));
const r = removeZeroSumSublists(list);
console.assert(r!.val === 3 && r!.next!.val === 1, "Test failed");
