/**
 * Pattern: Interval scheduling
 * Problem: Video Stitching (LeetCode 1024)
 *
 * Given a series of video clips clips[i] = [start_i, end_i] and total duration time,
 * return minimum clips needed to cover [0, time], or -1 if impossible.
 */

// Brute Force: Dynamic Programming DP[t] = min clips to cover [0, t]
// Time: O(N * time + time^2), Space: O(time)
export function videoStitchingDP(clips: number[][], time: number): number {
  const dp = new Array(time + 1).fill(Infinity);
  dp[0] = 0;

  for (let t = 1; t <= time; t++) {
    for (const [start, end] of clips) {
      if (start <= t - 1 && t <= end) {
        dp[t] = Math.min(dp[t], dp[start] + 1);
      }
    }
  }

  return dp[time] === Infinity ? -1 : dp[time];
}

// Optimal: Greedy Maximum Reach Extension (Jump Game II variation on Intervals)
// Time: O(N log N) or O(N + time), Space: O(time) max reach array
export function videoStitchingOptimal(clips: number[][], time: number): number {
  const maxReach = new Array(time + 1).fill(0);
  for (const [start, end] of clips) {
    if (start < time) {
      maxReach[start] = Math.max(maxReach[start], end);
    }
  }

  let clipsCount = 0;
  let currentEnd = 0;
  let nextEnd = 0;

  for (let i = 0; i < time; i++) {
    nextEnd = Math.max(nextEnd, maxReach[i]);
    if (i === currentEnd) {
      if (nextEnd <= i) return -1; // Cannot advance
      clipsCount++;
      currentEnd = nextEnd;
      if (currentEnd >= time) return clipsCount;
    }
  }

  return currentEnd >= time ? clipsCount : -1;
}

// Test cases
const clips = [[0,2],[4,6],[8,10],[1,9],[1,5],[5,9]];
const vs1 = videoStitchingDP(clips, 10);
const vs2 = videoStitchingOptimal(clips, 10);
if (vs1 !== 3 || vs2 !== 3) throw new Error("Expected 3 clips");
console.log("Video Stitching passed!");
