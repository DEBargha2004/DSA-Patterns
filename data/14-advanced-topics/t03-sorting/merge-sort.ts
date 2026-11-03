/**
 * Pattern: Sorting
 * Problem: Merge Sort
 *
 * Sort an array in ascending order using Divide-and-Conquer Merge Sort.
 */

// Brute Force: Naive recursive split creating new arrays at each step
// Time: O(N log N), Space: O(N log N) allocations
export function mergeSortNaive(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortNaive(arr.slice(0, mid));
  const right = mergeSortNaive(arr.slice(mid));

  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}

// Optimal: In-place index-based Merge Sort with single auxiliary buffer
// Time: O(N log N), Space: O(N) auxiliary buffer
export function mergeSortOptimal(arr: number[]): number[] {
  const buffer = new Array(arr.length);

  function sort(l: number, r: number): void {
    if (l >= r) return;
    const mid = (l + r) >> 1;
    sort(l, mid);
    sort(mid + 1, r);

    // Merge in place
    let i = l, j = mid + 1, k = l;
    while (i <= mid && j <= r) {
      if (arr[i] <= arr[j]) buffer[k++] = arr[i++];
      else buffer[k++] = arr[j++];
    }
    while (i <= mid) buffer[k++] = arr[i++];
    while (j <= r) buffer[k++] = arr[j++];

    for (let p = l; p <= r; p++) {
      arr[p] = buffer[p];
    }
  }

  sort(0, arr.length - 1);
  return arr;
}

// Test cases
const toSort = [5, 2, 3, 1, 4];
const sNaive = mergeSortNaive(toSort);
const sOpt = mergeSortOptimal([...toSort]);
if (sNaive.join(",") !== "1,2,3,4,5" || sOpt.join(",") !== "1,2,3,4,5") throw new Error("Merge sort failed");
console.log("Merge Sort passed!");
