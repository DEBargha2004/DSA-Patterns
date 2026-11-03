/**
 * Pattern: Local choice with a provable invariant
 * Problem: Lemonade Change (LeetCode 860)
 *
 * Each lemonade costs $5. Customers pay with $5, $10, or $20 bills.
 * Return true if you can provide every customer with correct change.
 */

// Brute Force: Array of available change with linear search
// Time: O(N^2), Space: O(N)
export function lemonadeChangeBrute(bills: number[]): boolean {
  const changePool: number[] = [];

  for (const bill of bills) {
    if (bill === 5) {
      changePool.push(5);
    } else if (bill === 10) {
      const idx5 = changePool.indexOf(5);
      if (idx5 === -1) return false;
      changePool.splice(idx5, 1);
      changePool.push(10);
    } else {
      // 20: prefer 10 + 5 over 5 + 5 + 5
      const idx10 = changePool.indexOf(10);
      const idx5 = changePool.indexOf(5);
      if (idx10 !== -1 && idx5 !== -1) {
        changePool.splice(idx10, 1);
        const newIdx5 = changePool.indexOf(5);
        changePool.splice(newIdx5, 1);
      } else {
        let count5 = 0;
        for (let i = 0; i < changePool.length; i++) {
          if (changePool[i] === 5) count5++;
        }
        if (count5 < 3) return false;
        let removed = 0;
        for (let i = changePool.length - 1; i >= 0 && removed < 3; i--) {
          if (changePool[i] === 5) {
            changePool.splice(i, 1);
            removed++;
          }
        }
      }
      changePool.push(20);
    }
  }
  return true;
}

// Optimal: Greedy Bill Counter (Invariant: $5 bills are strictly more versatile than $10 bills)
// Always give one $10 and one $5 before three $5 bills for change of $20.
// Time: O(N), Space: O(1)
export function lemonadeChangeOptimal(bills: number[]): boolean {
  let fives = 0;
  let tens = 0;

  for (const bill of bills) {
    if (bill === 5) {
      fives++;
    } else if (bill === 10) {
      if (fives === 0) return false;
      fives--;
      tens++;
    } else {
      // bill === 20
      if (tens > 0 && fives > 0) {
        tens--;
        fives--;
      } else if (fives >= 3) {
        fives -= 3;
      } else {
        return false;
      }
    }
  }
  return true;
}

// Test cases
if (!lemonadeChangeBrute([5, 5, 5, 10, 20]) || !lemonadeChangeOptimal([5, 5, 5, 10, 20])) throw new Error("Expected true");
if (lemonadeChangeOptimal([5, 5, 10, 10, 20])) throw new Error("Expected false");
console.log("Lemonade Change passed!");
