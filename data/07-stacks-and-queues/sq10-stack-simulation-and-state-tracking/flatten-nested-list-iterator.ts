/**
 * Problem: Flatten Nested List Iterator (LeetCode 341)
 * Difficulty: Medium
 * Pattern: SQ10 - Stack simulation and state tracking
 *
 * Iterator to flatten a nested list of integers.
 */

export interface NestedInteger {
  isInteger(): boolean;
  getInteger(): number | null;
  getList(): NestedInteger[];
}

export class NestedIterator {
  private stack: NestedInteger[];

  constructor(nestedList: NestedInteger[]) {
    this.stack = [...nestedList].reverse();
  }

  hasNext(): boolean {
    while (this.stack.length > 0) {
      const top = this.stack[this.stack.length - 1];
      if (top.isInteger()) {
        return true;
      }
      this.stack.pop();
      const list = top.getList();
      for (let i = list.length - 1; i >= 0; i--) {
        this.stack.push(list[i]);
      }
    }
    return false;
  }

  next(): number {
    return this.stack.pop()!.getInteger()!;
  }
}

// Helper class for testing
class MockNestedInt implements NestedInteger {
  private val: number | null;
  private list: NestedInteger[];
  constructor(val: number | null, list: NestedInteger[] = []) {
    this.val = val;
    this.list = list;
  }
  isInteger(): boolean { return this.val !== null; }
  getInteger(): number | null { return this.val; }
  getList(): NestedInteger[] { return this.list; }
}

const mockInput: NestedInteger[] = [
  new MockNestedInt(null, [new MockNestedInt(1), new MockNestedInt(1)]),
  new MockNestedInt(2),
  new MockNestedInt(null, [new MockNestedInt(1), new MockNestedInt(1)])
];
const iter = new NestedIterator(mockInput);
const res: number[] = [];
while (iter.hasNext()) {
  res.push(iter.next());
}
console.assert(JSON.stringify(res) === JSON.stringify([1, 1, 2, 1, 1]), "Iterator test failed");
