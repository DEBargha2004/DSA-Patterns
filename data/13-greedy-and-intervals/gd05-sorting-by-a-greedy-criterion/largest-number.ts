/**
 * Pattern: Sorting by a greedy criterion
 * Problem: Largest Number (LeetCode 179)
 *
 * Given a list of non-negative integers nums, arrange them such that they form the largest number.
 */

// Brute Force: Enumerate all permutations of numbers, find max string
// Time: O(N! * N), Space: O(N)
export function largestNumberBrute(nums: number[]): string {
  if (nums.length > 8) return largestNumberOptimal(nums); // Guard against permutation explosion in tests

  let maxStr = "0";
  const used = new Array(nums.length).fill(false);
  const current: number[] = [];

  function backtrack(): void {
    if (current.length === nums.length) {
      const str = current.join("");
      if (str > maxStr) maxStr = str;
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (!used[i]) {
        used[i] = true;
        current.push(nums[i]);
        backtrack();
        current.pop();
        used[i] = false;
      }
    }
  }

  backtrack();
  return maxStr;
}

// Optimal: Custom Greedy Comparator: (b + a) vs (a + b)
// Proof: Total ordering transitive relation ensures global optimality.
// Time: O(N log N * L), Space: O(N * L)
export function largestNumberOptimal(nums: number[]): string {
  const strs = nums.map(String);
  strs.sort((a, b) => (b + a).localeCompare(a + b));

  if (strs[0] === "0") return "0"; // All zeros case
  return strs.join("");
}

// Test cases
const lnNums = [10, 2];
if (largestNumberBrute(lnNums) !== "210" || largestNumberOptimal(lnNums) !== "210") {
  throw new Error("Expected 210");
}
const lnNums2 = [3, 30, 34, 5, 9];
if (largestNumberOptimal(lnNums2) !== "9534330") throw new Error("Expected 9534330");
console.log("Largest Number passed!");
