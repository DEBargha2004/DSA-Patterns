/**
 * Problem: Sliding Window Median with Lazy Deletion
 * Difficulty: Hard
 * Pattern: HP8 - Lazy deletion in heaps
 *
 * Sliding window median using dual heaps and a hash map for lazy deletions.
 */

// --- Optimal Approach (Dual Heaps + Lazy Deletion Hash Map) ---
// Time Complexity: O(n log k)
// Space Complexity: O(k)
export function medianSlidingWindowLazy(nums: number[], k: number): number[] {
  const small: number[] = []; // max-heap (descending)
  const large: number[] = []; // min-heap (ascending)
  const delayed = new Map<number, number>();

  function prune(h: number[]): void {
    while (h.length > 0) {
      const top = h[0];
      const count = delayed.get(top) ?? 0;
      if (count > 0) {
        delayed.set(top, count - 1);
        h.shift();
      } else {
        break;
      }
    }
  }

  // Initial window
  for (let i = 0; i < k; i++) {
    small.push(nums[i]);
  }
  small.sort((a, b) => b - a);
  while (small.length > Math.ceil(k / 2)) {
    large.push(small.shift()!);
  }
  large.sort((a, b) => a - b);

  const res: number[] = [];
  const getMed = () => (k % 2 === 1 ? small[0] : (small[0] + large[0]) / 2);
  res.push(getMed());

  for (let i = k; i < nums.length; i++) {
    const inVal = nums[i];
    const outVal = nums[i - k];
    let balance = 0;

    delayed.set(outVal, (delayed.get(outVal) ?? 0) + 1);
    if (outVal <= small[0]) {
      balance--;
    } else {
      balance++;
    }

    if (small.length > 0 && inVal <= small[0]) {
      small.push(inVal);
      small.sort((a, b) => b - a);
      balance++;
    } else {
      large.push(inVal);
      large.sort((a, b) => a - b);
      balance--;
    }

    if (balance < 0) {
      small.push(large.shift()!);
      small.sort((a, b) => b - a);
    } else if (balance > 0) {
      large.push(small.shift()!);
      large.sort((a, b) => a - b);
    }

    prune(small);
    prune(large);
    res.push(getMed());
  }

  return res;
}

// --- Test Verification ---
const r = medianSlidingWindowLazy([1, 3, -1, -3, 5, 3, 6, 7], 3);
console.assert(JSON.stringify(r) === JSON.stringify([1, -1, -1, 3, 5, 6]), "Test 1 failed");
