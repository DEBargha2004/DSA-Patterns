/**
 * Problem: Reorganize String (LeetCode 767)
 * Difficulty: Medium
 * Pattern: HP5 - Priority-based greedy processing
 *
 * Rearrange string characters so no two adjacent characters are identical.
 */

// --- Optimal Approach (Max-Heap by Character Frequency) ---
// Time Complexity: O(n log(distinct)) -> O(n)
// Space Complexity: O(distinct) -> O(1)
export function reorganizeString(s: string): string {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);

  const heap: [char: string, count: number][] = Array.from(counts.entries()).map(([char, count]) => [char, count]);
  const sortHeap = () => heap.sort((a, b) => b[1] - a[1]);
  sortHeap();

  if (heap[0][1] > Math.ceil(s.length / 2)) {
    return ""; // impossible
  }

  let result = "";
  while (heap.length >= 2) {
    const [c1, count1] = heap.shift()!;
    const [c2, count2] = heap.shift()!;

    result += c1 + c2;

    if (count1 - 1 > 0) heap.push([c1, count1 - 1]);
    if (count2 - 1 > 0) heap.push([c2, count2 - 1]);
    sortHeap();
  }

  if (heap.length > 0) {
    result += heap[0][0];
  }

  return result;
}

// --- Test Verification ---
console.assert(reorganizeString("aab") === "aba", "Test 1 failed");
console.assert(reorganizeString("aaab") === "", "Test 2 failed");
