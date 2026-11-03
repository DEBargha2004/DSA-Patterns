/**
 * Problem: Search in Rotated Sorted Array II (LeetCode 81)
 * Difficulty: Medium
 * Pattern: BS4 - Search in rotated sorted array (Duplicates Allowed)
 *
 * Same as LC 33, but nums may contain duplicates.
 */

// --- Optimal Approach (Handling Ambiguity nums[left] === nums[mid] === nums[right]) ---
// Time Complexity: O(log n) average, O(n) worst case
// Space Complexity: O(1)
export function searchRotatedII(nums: number[], target: number): boolean {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return true;

    if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return false;
}

// --- Test Verification ---
console.assert(searchRotatedII([2, 5, 6, 0, 0, 1, 2], 0) === true, "Test 1 failed");
console.assert(searchRotatedII([2, 5, 6, 0, 0, 1, 2], 3) === false, "Test 2 failed");
