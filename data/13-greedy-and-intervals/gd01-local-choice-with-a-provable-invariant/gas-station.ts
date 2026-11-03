/**
 * Pattern: Local choice with a provable invariant
 * Problem: Gas Station (LeetCode 134)
 *
 * Given two integer arrays gas and cost, return the starting gas station's index
 * if you can travel around the circuit once in the clockwise direction, otherwise -1.
 */

// Brute Force: Simulate the complete circular journey starting from each station i
// Time: O(N^2), Space: O(1)
export function canCompleteCircuitBrute(gas: number[], cost: number[]): number {
  const n = gas.length;
  for (let start = 0; start < n; start++) {
    let tank = 0;
    let possible = true;
    for (let step = 0; step < n; step++) {
      const idx = (start + step) % n;
      tank += gas[idx] - cost[idx];
      if (tank < 0) {
        possible = false;
        break;
      }
    }
    if (possible) return start;
  }
  return -1;
}

// Optimal: Greedy Single-Pass with Invariant Proof:
// Invariant: If total gas >= total cost, a valid starting index MUST exist.
// If tank drops below 0 when traveling from start to i, no station between start and i can be the start.
// Time: O(N), Space: O(1)
export function canCompleteCircuitOptimal(gas: number[], cost: number[]): number {
  let totalSurplus = 0;
  let currentTank = 0;
  let startIndex = 0;

  for (let i = 0; i < gas.length; i++) {
    const diff = gas[i] - cost[i];
    totalSurplus += diff;
    currentTank += diff;

    if (currentTank < 0) {
      // Cannot reach i + 1 from startIndex. Reset start to i + 1.
      startIndex = i + 1;
      currentTank = 0;
    }
  }

  return totalSurplus >= 0 ? startIndex : -1;
}

// Test cases
const gas1 = [1, 2, 3, 4, 5];
const cost1 = [3, 4, 5, 1, 2];
const gs1 = canCompleteCircuitBrute(gas1, cost1);
const gs2 = canCompleteCircuitOptimal(gas1, cost1);
if (gs1 !== 3 || gs2 !== 3) throw new Error("Expected starting station index 3");

const gas2 = [2, 3, 4];
const cost2 = [3, 4, 3];
if (canCompleteCircuitOptimal(gas2, cost2) !== -1) throw new Error("Expected -1");
console.log("Gas Station passed!");
