/**
 * Problem: Online Stock Span (LeetCode 901)
 * Difficulty: Medium
 * Pattern: SQ3 - Monotonic increasing stack
 *
 * Design an algorithm that collects daily price quotes and returns the span of that stock's price for the current day.
 */

// --- Optimal Approach (Monotonic Stack with Span Aggregation) ---
// Time Complexity: O(1) amortized per next call
// Space Complexity: O(n)
export class StockSpanner {
  private stack: [price: number, span: number][] = [];

  next(price: number): number {
    let span = 1;
    while (this.stack.length > 0 && this.stack[this.stack.length - 1][0] <= price) {
      span += this.stack.pop()![1];
    }
    this.stack.push([price, span]);
    return span;
  }
}

// --- Test Verification ---
const spanner = new StockSpanner();
console.assert(spanner.next(100) === 1, "Test 1 failed");
console.assert(spanner.next(80) === 1, "Test 2 failed");
console.assert(spanner.next(60) === 1, "Test 3 failed");
console.assert(spanner.next(70) === 2, "Test 4 failed");
console.assert(spanner.next(60) === 1, "Test 5 failed");
console.assert(spanner.next(75) === 4, "Test 6 failed");
console.assert(spanner.next(85) === 6, "Test 7 failed");
