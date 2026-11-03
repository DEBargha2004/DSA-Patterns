/**
 * Pattern: Sorting
 * Problem: Sort Colors (LeetCode 75)
 *
 * Given an array nums with n objects colored red (0), white (1), or blue (2),
 * sort them in-place so that objects of the same color are adjacent.
 */

// Brute Force: Two-Pass Counting Sort
// Time: O(N), Space: O(1)
export function sortColorsCounting(nums: number[]): void {
  const counts = [0, 0, 0];
  for (const n of nums) counts[n]++;

  let idx = 0;
  for (let color = 0; color < 3; color++) {
    for (let c = 0; c < counts[color]; c++) {
      nums[idx++] = color;
    }
  }
}

// Optimal: One-Pass Dutch National Flag Algorithm (3 Pointers)
// Invariant: nums[0..low-1] are 0, nums[low..mid-1] are 1, nums[high+1..n-1] are 2
// Time: O(N), Space: O(1)
export function sortColorsOptimal(nums: number[]): void {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
}

// Test cases
const sc1 = [2, 0, 2, 1, 1, 0];
const sc2 = [2, 0, 2, 1, 1, 0];
sortColorsCounting(sc1);
sortColorsOptimal(sc2);
if (sc1.join(",") !== "0,0,1,1,2,2" || sc2.join(",") !== "0,0,1,1,2,2") throw new Error("Sort colors failed");
console.log("Sort Colors passed!");
