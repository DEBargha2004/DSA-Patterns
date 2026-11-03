/**
 * Pattern: Computational geometry
 * Problem: Max Points on a Line (LeetCode 149)
 *
 * Given an array of points where points[i] = [x_i, y_i], return the maximum number
 * of points that lie on the same straight line.
 */

// Optimal: Slope Hashing with Reduced GCD Fractions
// Time: O(N^2), Space: O(N)
export function maxPoints(points: number[][]): number {
  const n = points.length;
  if (n <= 2) return n;

  function gcd(a: number, b: number): number {
    while (b !== 0) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  let maxCount = 0;

  for (let i = 0; i < n; i++) {
    const slopeMap = new Map<string, number>();
    let duplicates = 1;
    let localMax = 0;

    for (let j = i + 1; j < n; j++) {
      let dx = points[j][0] - points[i][0];
      let dy = points[j][1] - points[i][1];

      if (dx === 0 && dy === 0) {
        duplicates++;
        continue;
      }

      const g = gcd(dx, dy);
      dx = Math.floor(dx / g);
      dy = Math.floor(dy / g);

      // Standardize sign
      if (dx < 0 || (dx === 0 && dy < 0)) {
        dx = -dx;
        dy = -dy;
      }

      const slope = `${dy}/${dx}`;
      slopeMap.set(slope, (slopeMap.get(slope) || 0) + 1);
      localMax = Math.max(localMax, slopeMap.get(slope)!);
    }

    maxCount = Math.max(maxCount, localMax + duplicates);
  }

  return maxCount;
}

// Test cases
const linePoints = [[1,1],[2,2],[3,3]];
if (maxPoints(linePoints) !== 3) throw new Error("Expected 3 points on line");
const linePoints2 = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]];
if (maxPoints(linePoints2) !== 4) throw new Error("Expected 4 points on line");
console.log("Max Points on a Line passed!");
