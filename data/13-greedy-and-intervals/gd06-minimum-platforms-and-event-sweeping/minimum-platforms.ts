/**
 * Pattern: Minimum platforms and event sweeping
 * Problem: Minimum Platforms for Railway Station
 *
 * Given arrival and departure times of all trains that reach a railway station,
 * find the minimum number of platforms required so that no train is kept waiting.
 */

// Brute Force: Check maximum overlapping trains at any arrival time
// Time: O(N^2), Space: O(1)
export function findPlatformBrute(arr: number[], dep: number[]): number {
  const n = arr.length;
  let maxPlatforms = 1;

  for (let i = 0; i < n; i++) {
    let count = 1;
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        if (arr[i] >= arr[j] && arr[i] <= dep[j]) {
          count++;
        }
      }
    }
    maxPlatforms = Math.max(maxPlatforms, count);
  }

  return maxPlatforms;
}

// Optimal: Two Pointers on Sorted Arrivals and Departures (Event Sweeping)
// Invariant: Sorting arrival and departure independently preserves concurrency count.
// Time: O(N log N), Space: O(1) auxiliary
export function findPlatformOptimal(arr: number[], dep: number[]): number {
  const n = arr.length;
  const sortedArr = [...arr].sort((a, b) => a - b);
  const sortedDep = [...dep].sort((a, b) => a - b);

  let platformsNeeded = 0;
  let maxPlatforms = 0;
  let i = 0, j = 0;

  while (i < n && j < n) {
    if (sortedArr[i] <= sortedDep[j]) {
      platformsNeeded++;
      maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
      i++;
    } else {
      platformsNeeded--;
      j++;
    }
  }

  return maxPlatforms;
}

// Test cases
const arr = [900, 940, 950, 1100, 1500, 1800];
const dep = [910, 1200, 1120, 1130, 1900, 2000];
const p1 = findPlatformBrute(arr, dep);
const p2 = findPlatformOptimal(arr, dep);
if (p1 !== 3 || p2 !== 3) throw new Error("Expected 3 platforms");
console.log("Minimum Platforms passed!");
