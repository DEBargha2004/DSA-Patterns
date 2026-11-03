/**
 * Pattern: Greedy assignment and pairing
 * Problem: Boats to Save People (LeetCode 881)
 *
 * Given people[i] weight and limit. Each boat carries at most 2 people whose sum <= limit.
 * Return minimum boats to carry every given person.
 */

// Brute Force: Array search matching heaviest person with heaviest possible companion <= limit
// Time: O(N^2), Space: O(N)
export function numRescueBoatsBrute(people: number[], limit: number): number {
  const p = [...people].sort((a, b) => b - a); // descending
  const used = new Array(p.length).fill(false);
  let boats = 0;

  for (let i = 0; i < p.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    boats++;

    const rem = limit - p[i];
    for (let j = i + 1; j < p.length; j++) {
      if (!used[j] && p[j] <= rem) {
        used[j] = true;
        break; // pair found
      }
    }
  }

  return boats;
}

// Optimal: Two Pointers Greedy (Pair heaviest with lightest if possible)
// Invariant: The heaviest person must take a boat. Pairing with the lightest leaves maximum headroom for others.
// Time: O(N log N), Space: O(1) auxiliary
export function numRescueBoatsOptimal(people: number[], limit: number): number {
  people.sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;
  let boats = 0;

  while (left <= right) {
    if (people[left] + people[right] <= limit) {
      left++; // lightest joins heaviest
    }
    right--; // heaviest always boards
    boats++;
  }

  return boats;
}

// Test cases
const bPeople = [3, 2, 2, 1];
if (numRescueBoatsBrute(bPeople, 3) !== 3 || numRescueBoatsOptimal(bPeople, 3) !== 3) {
  throw new Error("Expected 3 boats");
}
console.log("Boats to Save People passed!");
