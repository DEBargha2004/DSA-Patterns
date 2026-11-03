/**
 * Pattern: Range-query structures
 * Problem: Segment Tree Range Sum and Point Update
 */

// Brute Force: Array slice reduce
// Time: Update O(1), Query O(N), Space: O(N)
export class SegmentTreeBrute {
  private arr: number[];
  constructor(arr: number[]) { this.arr = [...arr]; }
  update(i: number, v: number): void { this.arr[i] = v; }
  query(l: number, r: number): number {
    let s = 0;
    for (let i = l; i <= r; i++) s += this.arr[i];
    return s;
  }
}

// Optimal: Array-based Segment Tree
// Time: Build O(N), Update O(log N), Query O(log N); Space: O(4N)
export class SegmentTreeOptimal {
  private tree: number[];
  private n: number;

  constructor(arr: number[]) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this.build(arr, 1, 0, this.n - 1);
  }

  private build(arr: number[], node: number, start: number, end: number): void {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = (start + end) >> 1;
    const left = node << 1;
    const right = left + 1;
    this.build(arr, left, start, mid);
    this.build(arr, right, mid + 1, end);
    this.tree[node] = this.tree[left] + this.tree[right];
  }

  update(index: number, val: number): void {
    this.updateNode(1, 0, this.n - 1, index, val);
  }

  private updateNode(node: number, start: number, end: number, idx: number, val: number): void {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = (start + end) >> 1;
    const left = node << 1;
    const right = left + 1;
    if (idx <= mid) this.updateNode(left, start, mid, idx, val);
    else this.updateNode(right, mid + 1, end, idx, val);
    this.tree[node] = this.tree[left] + this.tree[right];
  }

  query(l: number, r: number): number {
    return this.queryNode(1, 0, this.n - 1, l, r);
  }

  private queryNode(node: number, start: number, end: number, l: number, r: number): number {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];
    const mid = (start + end) >> 1;
    const left = node << 1;
    const right = left + 1;
    return this.queryNode(left, start, mid, l, r) + this.queryNode(right, mid + 1, end, l, r);
  }
}

// Test cases
const st = new SegmentTreeOptimal([1, 2, 3, 4, 5]);
if (st.query(1, 3) !== 9) throw new Error("Expected 9");
st.update(2, 10);
if (st.query(1, 3) !== 16) throw new Error("Expected 16");
console.log("Segment Tree Range Sum and Update passed!");
