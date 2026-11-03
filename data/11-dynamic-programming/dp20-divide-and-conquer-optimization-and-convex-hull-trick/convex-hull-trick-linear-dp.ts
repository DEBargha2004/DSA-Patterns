/**
 * Problem: Convex Hull Trick Linear DP (CHT)
 * Difficulty: Hard
 * Pattern: DP20 - Divide-and-conquer optimization and convex hull trick
 *
 * Find min value of m * x + c across dynamic linear functions in O(log n) query time.
 */

export interface Line {
  m: number; // slope
  c: number; // y-intercept
}

// --- Optimal Approach (Upper / Lower Convex Hull Envelope) ---
// Slope decreasing insertion for minimum envelope
// Time Complexity: Insert: O(1) amortized, Query: O(log n)
// Space Complexity: O(n)
export class ConvexHullTrick {
  private lines: Line[] = [];

  // True if line2 is obsolete between line1 and line3
  private isObsolete(l1: Line, l2: Line, l3: Line): boolean {
    return (l3.c - l1.c) * (l1.m - l2.m) <= (l2.c - l1.c) * (l1.m - l3.m);
  }

  addLine(m: number, c: number): void {
    const newLine: Line = { m, c };
    while (this.lines.length >= 2 && this.isObsolete(this.lines[this.lines.length - 2], this.lines[this.lines.length - 1], newLine)) {
      this.lines.pop();
    }
    this.lines.push(newLine);
  }

  query(x: number): number {
    let low = 0, high = this.lines.length - 1;
    let minVal = Infinity;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const val = this.lines[mid].m * x + this.lines[mid].c;
      minVal = Math.min(minVal, val);

      if (mid + 1 < this.lines.length) {
        const nextVal = this.lines[mid + 1].m * x + this.lines[mid + 1].c;
        if (nextVal < val) low = mid + 1;
        else high = mid - 1;
      } else {
        high = mid - 1;
      }
    }

    return minVal;
  }
}

// --- Test Verification ---
const cht = new ConvexHullTrick();
cht.addLine(4, 0);
cht.addLine(2, 2);
cht.addLine(0, 5);
console.assert(cht.query(1) === 4, "Test 1 failed (min at x=1: 4*1=4, 2*1+2=4, 5)");
console.assert(cht.query(3) === 5, "Test 2 failed (min at x=3: 0*3+5=5 < 2*3+2=8)");
