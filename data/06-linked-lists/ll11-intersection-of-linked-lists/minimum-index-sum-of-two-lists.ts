/**
 * Problem: Minimum Index Sum of Two Lists (LeetCode 599)
 * Difficulty: Easy
 * Pattern: LL11 - Intersection / Alignment
 *
 * Find common strings with least index sum.
 */

// --- Optimal Approach (Hash Map First List + Single Pass Second List) ---
// Time Complexity: O(l1 + l2)
// Space Complexity: O(l1)
export function findRestaurant(list1: string[], list2: string[]): string[] {
  const map = new Map<string, number>();
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i);
  }

  let minSum = Infinity;
  let result: string[] = [];

  for (let j = 0; j < list2.length; j++) {
    const item = list2[j];
    if (map.has(item)) {
      const sum = j + map.get(item)!;
      if (sum < minSum) {
        minSum = sum;
        result = [item];
      } else if (sum === minSum) {
        result.push(item);
      }
    }
  }

  return result;
}

// --- Test Verification ---
const out = findRestaurant(["Shogun", "Tapioca Express", "Burger King", "KFC"], ["Piatti", "The Grill at Torrey Pines", "Hungry Hunter Steakhouse", "Shogun"]);
console.assert(JSON.stringify(out) === JSON.stringify(["Shogun"]), "Test failed");
