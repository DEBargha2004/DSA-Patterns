/**
 * Problem: Furthest Building You Can Reach (LeetCode 1642)
 * Difficulty: Medium
 * Pattern: HP5 - Priority-based greedy processing
 *
 * Find furthest building reachable using bricks and ladders.
 */

// --- Optimal Approach (Min-Heap of Ladder Climbs) ---
// Save ladders for largest climbs; pay smallest climbs with bricks.
// Time Complexity: O(n log(ladders))
// Space Complexity: O(ladders)
export function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
  const ladderClimbs: number[] = [];

  const pushClimb = (climb: number) => {
    ladderClimbs.push(climb);
    ladderClimbs.sort((a, b) => a - b);
  };

  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];
    if (diff > 0) {
      pushClimb(diff);
      if (ladderClimbs.length > ladders) {
        bricks -= ladderClimbs.shift()!;
        if (bricks < 0) {
          return i;
        }
      }
    }
  }

  return heights.length - 1;
}

// --- Test Verification ---
console.assert(furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1) === 4, "Test 1 failed");
console.assert(furthestBuilding([4, 12, 2, 7, 3, 18, 20, 3, 19], 10, 2) === 7, "Test 2 failed");
console.assert(furthestBuilding([14, 3, 19, 3], 17, 0) === 3, "Test 3 failed");
