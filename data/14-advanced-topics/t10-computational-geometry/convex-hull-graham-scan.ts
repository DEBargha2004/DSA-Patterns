/**
 * Pattern: Computational geometry
 * Problem: 2D Convex Hull via Andrew's Monotone Chain / Graham Scan
 */

type Point = [number, number];

// Cross product of OA and OB vectors (returns > 0 for counter-clockwise, < 0 for clockwise, 0 for collinear)
function crossProduct(o: Point, a: Point, b: Point): number {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
}

// Optimal: Andrew's Monotone Chain Algorithm
// Time: O(N log N), Space: O(N)
export function convexHull(points: Point[]): Point[] {
  const n = points.length;
  if (n <= 2) return points;

  // Sort lexicographically by x then y
  points.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);

  const lower: Point[] = [];
  for (const p of points) {
    while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  const upper: Point[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const p = points[i];
    while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  // Remove duplicate endpoints
  lower.pop();
  upper.pop();
  return lower.concat(upper);
}

// Test cases
const chPoints: Point[] = [[0, 3], [2, 2], [1, 1], [2, 1], [3, 0], [0, 0], [3, 3]];
const hull = convexHull(chPoints);
if (hull.length !== 4) throw new Error(`Expected 4 hull points, got ${hull.length}`);
console.log("Convex Hull Graham Scan passed!");
