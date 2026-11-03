/**
 * Problem: Divide Chocolate (LeetCode 1231)
 * Difficulty: Hard
 * Pattern: BS10 - Binary search over partition positions
 *
 * Divide chocolate into k + 1 pieces to maximize your minimum sweetness.
 */

// --- Optimal Approach (Binary Search over Sweetness) ---
// Time Complexity: O(n log(sum / (k + 1)))
// Space Complexity: O(1)
export function maximizeSweetness(sweetness: number[], k: number): number {
  let left = Math.min(...sweetness);
  let right = Math.floor(sweetness.reduce((a, b) => a + b, 0) / (k + 1));
  let ans = left;

  function canDivide(target: number): boolean {
    let pieces = 0;
    let currentSweet = 0;

    for (const s of sweetness) {
      currentSweet += s;
      if (currentSweet >= target) {
        pieces++;
        currentSweet = 0;
      }
    }

    return pieces >= k + 1;
  }

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (canDivide(mid)) {
      ans = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return ans;
}

// --- Test Verification ---
console.assert(maximizeSweetness([1, 2, 3, 4, 5, 6, 7, 8, 9], 5) === 6, "Test 1 failed");
console.assert(maximizeSweetness([5, 6, 7, 8, 9, 1, 2, 3, 4], 8) === 1, "Test 2 failed");
