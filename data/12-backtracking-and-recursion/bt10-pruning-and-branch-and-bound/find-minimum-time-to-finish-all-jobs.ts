/**
 * Pattern: Pruning and branch-and-bound
 * Problem: Find Minimum Time to Finish All Jobs (LeetCode 1723)
 *
 * Given an integer array jobs where jobs[i] is the amount of time it takes to complete the i-th job,
 * and an integer k representing workers. Each job is assigned to exactly one worker.
 * Return the minimum possible maximum working time of any assignment.
 */

// Brute Force: Recursive assignment of each job to worker 0..k-1
// Time: O(K^N), Space: O(K + N)
export function minimumTimeRequiredBrute(jobs: number[], k: number): number {
  const workloads = new Array(k).fill(0);
  let minMaxTime = Infinity;

  function dfs(jobIdx: number): void {
    if (jobIdx === jobs.length) {
      minMaxTime = Math.min(minMaxTime, Math.max(...workloads));
      return;
    }

    for (let w = 0; w < k; w++) {
      workloads[w] += jobs[jobIdx];
      dfs(jobIdx + 1);
      workloads[w] -= jobs[jobIdx];
    }
  }

  dfs(0);
  return minMaxTime;
}

// Optimal: Branch-and-bound with descending sort + workload >= currentBest pruning + symmetry breaking
// Time: O(K^N with heavy branch pruning), Space: O(K + N)
export function minimumTimeRequiredOptimal(jobs: number[], k: number): number {
  jobs.sort((a, b) => b - a); // Sort descending: assign large jobs first
  const workloads = new Array(k).fill(0);
  let best = Infinity;

  function dfs(jobIdx: number, currentMax: number): void {
    if (currentMax >= best) return; // Branch-and-bound pruning

    if (jobIdx === jobs.length) {
      best = Math.min(best, currentMax);
      return;
    }

    for (let w = 0; w < k; w++) {
      // Workload bound pruning
      if (workloads[w] + jobs[jobIdx] >= best) continue;

      workloads[w] += jobs[jobIdx];
      dfs(jobIdx + 1, Math.max(currentMax, workloads[w]));
      workloads[w] -= jobs[jobIdx];

      // Symmetry breaking: if this worker currently has 0 workload,
      // all subsequent workers also have 0 workload, so trying them is identical
      if (workloads[w] === 0) break;
    }
  }

  dfs(0, 0);
  return best;
}

// Test cases
const jobs = [3, 2, 3];
const k = 3;
const ans1 = minimumTimeRequiredBrute(jobs, k);
const ans2 = minimumTimeRequiredOptimal(jobs, k);
if (ans1 !== 3 || ans2 !== 3) throw new Error("Expected 3");

const jobs2 = [1, 2, 4, 7, 8];
if (minimumTimeRequiredOptimal(jobs2, 2) !== 11) throw new Error("Expected 11 for jobs2");
console.log("Find Minimum Time to Finish All Jobs passed!");
