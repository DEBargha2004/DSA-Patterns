/**
 * Pattern: Design-oriented DSA
 * Problem: Insert Delete GetRandom O(1) (LeetCode 380)
 *
 * Implement RandomizedSet with O(1) average time insert, remove, and getRandom.
 */

// Brute Force: Array with indexOf search for deletion
// Time: Insert O(1), Remove O(N), GetRandom O(1); Space: O(N)
export class RandomizedSetBrute {
  private list: number[] = [];

  insert(val: number): boolean {
    if (this.list.includes(val)) return false;
    this.list.push(val);
    return true;
  }

  remove(val: number): boolean {
    const idx = this.list.indexOf(val);
    if (idx === -1) return false;
    this.list.splice(idx, 1);
    return true;
  }

  getRandom(): number {
    const rand = Math.floor(Math.random() * this.list.length);
    return this.list[rand];
  }
}

// Optimal: Dynamic Array + Hash Map (Swap with last element for O(1) removal)
// Time: Insert O(1), Remove O(1), GetRandom O(1); Space: O(N)
export class RandomizedSetOptimal {
  private list: number[] = [];
  private map = new Map<number, number>(); // val -> index in list

  insert(val: number): boolean {
    if (this.map.has(val)) return false;
    this.map.set(val, this.list.length);
    this.list.push(val);
    return true;
  }

  remove(val: number): boolean {
    if (!this.map.has(val)) return false;
    const idx = this.map.get(val)!;
    const lastVal = this.list[this.list.length - 1];

    // Swap with last
    this.list[idx] = lastVal;
    this.map.set(lastVal, idx);

    // Pop last
    this.list.pop();
    this.map.delete(val);
    return true;
  }

  getRandom(): number {
    const rand = Math.floor(Math.random() * this.list.length);
    return this.list[rand];
  }
}

// Test cases
const rs = new RandomizedSetOptimal();
if (!rs.insert(1)) throw new Error("Insert 1 failed");
if (rs.remove(2)) throw new Error("Remove non-existent should be false");
if (!rs.insert(2)) throw new Error("Insert 2 failed");
const r = rs.getRandom();
if (r !== 1 && r !== 2) throw new Error("Invalid random item");
if (!rs.remove(1)) throw new Error("Remove 1 failed");
if (rs.getRandom() !== 2) throw new Error("Expected only 2 left");
console.log("Insert Delete GetRandom O(1) passed!");
