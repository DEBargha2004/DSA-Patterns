/**
 * Problem: Discretize Intervals for Range Query (Canonical Coordinate Compression)
 * Difficulty: Medium
 * Pattern: A20 - Coordinate compression
 *
 * Given a collection of intervals with coordinates up to 10^9, compress the coordinate space
 * to [0, k] and compute the coverage of each compressed point.
 */

export interface Interval {
  start: number;
  end: number;
}

// --- 1. Naive / Direct Approach (Memory limit exceeded if coordinates are up to 10^9) ---
// Time Complexity: O(n * R) where R is max coordinate
// Space Complexity: O(R)
export function intervalCoverageNaive(intervals: Interval[]): Map<number, number> {
  const coverage = new Map<number, number>();
  for (const { start, end } of intervals) {
    for (let x = start; x <= end; x++) {
      coverage.set(x, (coverage.get(x) ?? 0) + 1);
    }
  }
  return coverage;
}

// --- 2. Optimal Approach (Discretization / Coordinate Compression) ---
// Time Complexity: O(n log n)
// Space Complexity: O(n)
// Compresses coordinates from [10^9] to a compact index array of size 2*n.
export function compressCoordinates(intervals: Interval[]): {
  compressedCoords: number[];
  coordToIdx: Map<number, number>;
} {
  const coordSet = new Set<number>();
  for (const { start, end } of intervals) {
    coordSet.add(start);
    coordSet.add(end);
  }

  const compressedCoords = Array.from(coordSet).sort((a, b) => a - b);
  const coordToIdx = new Map<number, number>();
  for (let i = 0; i < compressedCoords.length; i++) {
    coordToIdx.set(compressedCoords[i], i);
  }

  return { compressedCoords, coordToIdx };
}

// --- Test Verification ---
const testIntervals: Interval[] = [
  { start: 1000000000, end: 1000000005 },
  { start: 1000000002, end: 1000000010 }
];
const { compressedCoords, coordToIdx } = compressCoordinates(testIntervals);
console.assert(compressedCoords.length === 4, "Coordinate compression failed");
console.assert(coordToIdx.get(1000000000) === 0, "Mapping failed");
