/**
 * Problem: Copy List with Random Pointer (LeetCode 138)
 * Difficulty: Medium
 * Pattern: LL13 - Clone a list with random pointers
 *
 * Construct a deep copy of a linked list where each node contains a random pointer.
 */

export class NodeWithRandom {
  val: number;
  next: NodeWithRandom | null;
  random: NodeWithRandom | null;
  constructor(val?: number, next?: NodeWithRandom | null, random?: NodeWithRandom | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
    this.random = random === undefined ? null : random;
  }
}

// --- Optimal Approach (Interweaving Nodes - O(1) Extra Space) ---
// Time Complexity: O(n)
// Space Complexity: O(1) auxiliary (excluding cloned list)
export function copyRandomList(head: NodeWithRandom | null): NodeWithRandom | null {
  if (!head) return null;

  // Step 1: Clone each node and insert it next to original: A -> A' -> B -> B'
  let curr: NodeWithRandom | null = head;
  while (curr) {
    const copy = new NodeWithRandom(curr.val, curr.next, null);
    curr.next = copy;
    curr = copy.next;
  }

  // Step 2: Assign random pointers for cloned nodes
  curr = head;
  while (curr) {
    if (curr.random) {
      curr.next!.random = curr.random.next;
    }
    curr = curr.next!.next;
  }

  // Step 3: Separate original and cloned lists
  curr = head;
  const clonedHead = head.next;
  while (curr) {
    const copyNode: NodeWithRandom = curr.next!;
    curr.next = copyNode.next;
    copyNode.next = copyNode.next ? copyNode.next.next : null;
    curr = curr.next;
  }

  return clonedHead;
}

// --- Test Verification ---
const n1 = new NodeWithRandom(7);
const n2 = new NodeWithRandom(13);
n1.next = n2;
n2.random = n1;
const copied = copyRandomList(n1);
console.assert(copied !== null && copied.val === 7 && copied.next!.random === copied, "Test failed");
