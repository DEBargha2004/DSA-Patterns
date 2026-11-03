/**
 * Pattern: Recursive enumeration
 * Problem: Binary Watch (LeetCode 401)
 *
 * A binary watch has 4 LEDs on the top (hours 0-11) and 6 LEDs on the bottom (minutes 0-59).
 * Given turnedOn, return all possible times the watch could represent.
 */

// Brute Force: Check all 12 * 60 = 720 possible times and count set bits
// Time: O(1) [720 iterations], Space: O(1)
export function readBinaryWatchBrute(turnedOn: number): string[] {
  function countBits(num: number): number {
    let count = 0;
    while (num > 0) {
      count += num & 1;
      num >>= 1;
    }
    return count;
  }

  const result: string[] = [];
  for (let h = 0; h < 12; h++) {
    for (let m = 0; m < 60; m++) {
      if (countBits(h) + countBits(m) === turnedOn) {
        result.push(`${h}:${m < 10 ? '0' : ''}${m}`);
      }
    }
  }
  return result;
}

// Optimal: Recursive backtracking over the 10 LED positions
// Time: O(C(10, turnedOn)), Space: O(turnedOn) stack
export function readBinaryWatchOptimal(turnedOn: number): string[] {
  if (turnedOn > 8) return [];
  const ledValues = [1, 2, 4, 8, 1, 2, 4, 8, 16, 32]; // first 4: hours, last 6: minutes
  const result: string[] = [];

  function backtrack(index: number, countLeft: number, hour: number, minute: number): void {
    if (hour > 11 || minute > 59) return;
    if (countLeft === 0) {
      result.push(`${hour}:${minute < 10 ? '0' : ''}${minute}`);
      return;
    }
    for (let i = index; i < 10; i++) {
      if (i < 4) {
        backtrack(i + 1, countLeft - 1, hour + ledValues[i], minute);
      } else {
        backtrack(i + 1, countLeft - 1, hour, minute + ledValues[i]);
      }
    }
  }

  backtrack(0, turnedOn, 0, 0);
  return result;
}

// Test cases
const bw1 = readBinaryWatchBrute(1).sort();
const bw2 = readBinaryWatchOptimal(1).sort();
if (JSON.stringify(bw1) !== JSON.stringify(bw2)) throw new Error("Mismatch in binary watch");
if (!bw2.includes("0:01") || !bw2.includes("8:00")) throw new Error("Expected times missing");
console.log("Binary Watch passed!");
