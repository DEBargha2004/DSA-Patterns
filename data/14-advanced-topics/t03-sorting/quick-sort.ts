/**
 * Pattern: Sorting
 * Problem: Quick Sort
 *
 * Implement Quick Sort with Lomuto or 3-way partition.
 */

// Brute Force: Filter-based partition creating new arrays
// Time: O(N log N) avg, O(N^2) worst; Space: O(N log N)
export function quickSortNaive(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x < pivot && i !== arr.length - 1);
  const mid = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSortNaive(left), ...mid, ...quickSortNaive(right)];
}

// Optimal: In-Place 3-Way Partition (Dutch National Flag) Quick Sort
// Time: O(N log N) avg, Space: O(log N) stack
export function quickSortOptimal(arr: number[]): number[] {
  function sort(low: number, high: number): void {
    if (low >= high) return;

    // Randomized pivot selection
    const randIdx = low + Math.floor(Math.random() * (high - low + 1));
    [arr[low], arr[randIdx]] = [arr[randIdx], arr[low]];

    const pivot = arr[low];
    let lt = low;      // arr[low..lt-1] < pivot
    let i = low + 1;   // arr[lt..i-1] == pivot
    let gt = high;     // arr[gt+1..high] > pivot

    while (i <= gt) {
      if (arr[i] < pivot) {
        [arr[lt], arr[i]] = [arr[i], arr[lt]];
        lt++;
        i++;
      } else if (arr[i] > pivot) {
        [arr[i], arr[gt]] = [arr[gt], arr[i]];
        gt--;
      } else {
        i++;
      }
    }

    sort(low, lt - 1);
    sort(gt + 1, high);
  }

  sort(0, arr.length - 1);
  return arr;
}

// Test cases
const qArr = [3, 6, 8, 10, 1, 2, 1];
const qRes1 = quickSortNaive(qArr);
const qRes2 = quickSortOptimal([...qArr]);
if (qRes1.join(",") !== "1,1,2,3,6,8,10" || qRes2.join(",") !== "1,1,2,3,6,8,10") {
  throw new Error("Quick sort failed");
}
console.log("Quick Sort passed!");
