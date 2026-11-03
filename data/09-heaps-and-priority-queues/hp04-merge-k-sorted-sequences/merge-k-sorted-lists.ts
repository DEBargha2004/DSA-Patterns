/**
 * Problem: Merge k Sorted Lists (LeetCode 23)
 * Difficulty: Hard
 * Pattern: HP4 - Merge K sorted sequences
 *
 * Merge k sorted linked lists using a min-heap or divide-and-conquer.
 */

export class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

// --- Optimal Approach (Min-Heap of List Heads) ---
// Time Complexity: O(N log k) where N is total nodes, k is number of lists
// Space Complexity: O(k)
export function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;

  // Active nodes in heap
  const heap: ListNode[] = [];
  for (const node of lists) {
    if (node) heap.push(node);
  }

  function heapify(): void {
    heap.sort((a, b) => a.val - b.val);
  }
  heapify();

  while (heap.length > 0) {
    const smallest = heap.shift()!;
    tail.next = smallest;
    tail = tail.next;

    if (smallest.next) {
      heap.push(smallest.next);
      heapify();
    }
  }

  return dummy.next;
}

// --- Test Verification ---
const l1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const l3 = new ListNode(2, new ListNode(6));
const res = mergeKLists([l1, l2, l3]);
const vals: number[] = [];
let c = res;
while (c) { vals.push(c.val); c = c.next; }
console.assert(JSON.stringify(vals) === JSON.stringify([1, 1, 2, 3, 4, 4, 5, 6]), "Test 1 failed");
