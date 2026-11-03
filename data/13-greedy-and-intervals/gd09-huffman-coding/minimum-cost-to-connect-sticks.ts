/**
 * Pattern: Huffman coding / Optimal merge pattern
 * Problem: Minimum Cost to Connect Sticks (LeetCode 1167)
 *
 * Connect all sticks into one stick. Cost to connect two sticks is their sum.
 * Return minimum cost to connect all sticks.
 */

// Brute Force: Array sorting repeatedly after every pairwise merge
// Time: O(N^2 log N), Space: O(N)
export function connectSticksBrute(sticks: number[]): number {
  if (sticks.length <= 1) return 0;
  const list = [...sticks];
  let totalCost = 0;

  while (list.length > 1) {
    list.sort((a, b) => a - b);
    const first = list.shift()!;
    const second = list.shift()!;
    const cost = first + second;
    totalCost += cost;
    list.push(cost);
  }

  return totalCost;
}

// Optimal: Min-Heap (Always merge the two smallest sticks - Huffman tree weight property)
// Time: O(N log N), Space: O(N)
export function connectSticksOptimal(sticks: number[]): number {
  if (sticks.length <= 1) return 0;

  // Simple min-heap implementation
  const heap: number[] = [];
  function push(val: number): void {
    heap.push(val);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p] <= heap[i]) break;
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }

  function pop(): number {
    const top = heap[0];
    const bottom = heap.pop()!;
    if (heap.length > 0) {
      heap[0] = bottom;
      let i = 0;
      const len = heap.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let smallest = (right < len && heap[right] < heap[left]) ? right : left;
        if (heap[i] <= heap[smallest]) break;
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        i = smallest;
      }
    }
    return top;
  }

  for (const s of sticks) push(s);

  let totalCost = 0;
  while (heap.length > 1) {
    const s1 = pop();
    const s2 = pop();
    const cost = s1 + s2;
    totalCost += cost;
    push(cost);
  }

  return totalCost;
}

// Test cases
const st1 = [2, 4, 3];
if (connectSticksBrute(st1) !== 14 || connectSticksOptimal(st1) !== 14) throw new Error("Expected 14 cost");
console.log("Minimum Cost to Connect Sticks passed!");
