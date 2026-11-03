/**
 * Problem: Rearrange String k Distance Apart (LeetCode 358 analog)
 * Difficulty: Hard
 * Pattern: HP9 - Custom heap ordering
 *
 * Rearrange string so same characters are at least distance k apart.
 */

// --- Optimal Approach (Max-Heap + Cooldown Queue) ---
// Time Complexity: O(n log(distinct))
// Space Complexity: O(distinct)
export function rearrangeString(s: string, k: number): string {
  if (k <= 1) return s;

  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);

  const heap: [char: string, count: number][] = Array.from(counts.entries());
  const sortHeap = () => heap.sort((a, b) => b[1] - a[1]);
  sortHeap();

  const queue: [char: string, count: number][] = [];
  let result = "";

  while (heap.length > 0) {
    const [char, count] = heap.shift()!;
    result += char;
    queue.push([char, count - 1]);

    if (queue.length >= k) {
      const front = queue.shift()!;
      if (front[1] > 0) {
        heap.push(front);
        sortHeap();
      }
    }
  }

  return result.length === s.length ? result : "";
}

// --- Test Verification ---
console.assert(rearrangeString("aabbcc", 3).length === 6, "Test 1 failed");
console.assert(rearrangeString("aaabc", 3) === "", "Test 2 failed");
console.assert(rearrangeString("aaadbbcc", 2).length === 8, "Test 3 failed");
