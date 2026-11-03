/**
 * Pattern: Interval scheduling
 * Problem: Minimum Number of Arrows to Burst Balloons (LeetCode 452)
 *
 * Given array points where points[i] = [x_start, x_end], return the minimum number
 * of arrows that must be shot to burst all balloons.
 */

// Brute Force: Sort by start time, compute intersections dynamically
// Time: O(N log N), Space: O(N)
export function findMinArrowShotsBrute(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[0] - b[0]);

  let arrows = 1;
  let [currStart, currEnd] = points[0];

  for (let i = 1; i < points.length; i++) {
    const [start, end] = points[i];
    if (start <= currEnd) {
      currStart = Math.max(currStart, start);
      currEnd = Math.min(currEnd, end);
    } else {
      arrows++;
      currStart = start;
      currEnd = end;
    }
  }

  return arrows;
}

// Optimal: Greedy sort by End Coordinate
// Shoot arrow at the end coordinate of the earliest-finishing balloon.
// Time: O(N log N), Space: O(1) auxiliary
export function findMinArrowShotsOptimal(points: number[][]): number {
  if (points.length === 0) return 0;
  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPos = points[0][1];

  for (let i = 1; i < points.length; i++) {
    if (points[i][0] > arrowPos) {
      arrows++;
      arrowPos = points[i][1];
    }
  }

  return arrows;
}

// Test cases
const balloons = [[10, 16], [2, 8], [1, 6], [7, 12]];
if (findMinArrowShotsBrute(balloons) !== 2 || findMinArrowShotsOptimal(balloons) !== 2) {
  throw new Error("Expected 2 arrows");
}
console.log("Minimum Number of Arrows to Burst Balloons passed!");
