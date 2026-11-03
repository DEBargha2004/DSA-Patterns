/**
 * Problem: Sliding Window Median (LeetCode 480)
 * Difficulty: Hard
 * Pattern: HP3 - Two heaps for a running median
 *
 * Find median of sliding window of size k in array nums.
 */

// --- Optimal Approach (Sorted Window / Insertion Binary Search) ---
// Time Complexity: O(n * k) with fast binary search insertion/deletion
// Space Complexity: O(k)
export function medianSlidingWindow(nums: number[], k: number): number[] {
  const window: number[] = [];
  const result: number[] = [];

  function binarySearch(val: number): number {
    let low = 0, high = window.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (window[mid] === val) return mid;
      if (window[mid] < val) low = mid + 1;
      else high = mid - 1;
    }
    return low;
  }

  // Populate first window
  for (let i = 0; i < k; i++) {
    const idx = binarySearch(nums[i]);
    window.splice(idx, 0, nums[i]);
  }

  const getMedian = (): number => {
    if (k % 2 === 1) {
      return window[Math.floor(k / 2)];
    }
    return (window[k / 2 - 1] + window[k / 2]) / 2;
  };

  result.push(getMedian());

  for (let i = k; i < nums.length; i++) {
    // Remove old element
    const removeIdx = binarySearch(nums[i - k]);
    window.splice(removeIdx, 1);

    // Add new element
    const addIdx = binarySearch(nums[i]);
    window.splice(addIdx, 0, nums[i]);

    result.push(getMedian());
  }

  return result;
}

// --- Test Verification ---
const medians = medianSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
console.assert(JSON.stringify(medians) === JSON.stringify([1, -1, -1, 3, 5, 6]), "Test 1 failed");
