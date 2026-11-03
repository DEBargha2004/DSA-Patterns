/**
 * Problem: Deep Copy Doubly Linked List with Child Pointers (Flatten Multilevel List)
 * Difficulty: Medium
 * Pattern: LL13 - Clone a list with random pointers (LeetCode 430)
 */

export class MultiNode {
  val: number;
  prev: MultiNode | null = null;
  next: MultiNode | null = null;
  child: MultiNode | null = null;
  constructor(val: number) { this.val = val; }
}

// --- Optimal Approach (Iterative Flattening using Stack) ---
// Time Complexity: O(n)
// Space Complexity: O(n) stack
export function flatten(head: MultiNode | null): MultiNode | null {
  if (!head) return null;

  let curr: MultiNode | null = head;
  while (curr !== null) {
    if (curr.child !== null) {
      let nextNode = curr.next;
      let childTail: MultiNode = curr.child;

      while (childTail.next !== null) {
        childTail = childTail.next;
      }

      curr.next = curr.child;
      curr.child.prev = curr;
      curr.child = null;

      if (nextNode !== null) {
        childTail.next = nextNode;
        nextNode.prev = childTail;
      }
    }
    curr = curr.next;
  }

  return head;
}

// --- Test Verification ---
const p1 = new MultiNode(1);
const p2 = new MultiNode(2);
const child1 = new MultiNode(3);
p1.next = p2; p2.prev = p1;
p1.child = child1;
flatten(p1);
console.assert(p1.next!.val === 3 && p1.next!.next!.val === 2, "Test failed");
