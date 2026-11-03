/**
 * Pattern: Sorting by a greedy criterion
 * Problem: Queue Reconstruction by Height (LeetCode 406)
 *
 * You are given people where people[i] = [h_i, k_i]. Reconstruct the queue such that
 * people in front have height >= h_i exactly k_i times.
 */

// Brute Force: Find empty spots from left to right counting available slots
// Time: O(N^2), Space: O(N)
export function reconstructQueueBrute(people: number[][]): number[][] {
  people.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);
  const n = people.length;
  const result: (number[] | null)[] = new Array(n).fill(null);

  for (const person of people) {
    let spaces = person[1];
    for (let i = 0; i < n; i++) {
      if (result[i] === null) {
        if (spaces === 0) {
          result[i] = person;
          break;
        }
        spaces--;
      }
    }
  }

  return result as number[][];
}

// Optimal: Greedy Criterion Sort: Height descending, then k ascending. Insert at index k.
// Invariant: Taller people already inserted will satisfy the k constraint when smaller people are inserted.
// Time: O(N^2), Space: O(N)
export function reconstructQueueOptimal(people: number[][]): number[][] {
  people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

  const queue: number[][] = [];
  for (const person of people) {
    queue.splice(person[1], 0, person);
  }

  return queue;
}

// Test cases
const people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]];
const rq1 = reconstructQueueBrute(people);
const rq2 = reconstructQueueOptimal(people);
if (JSON.stringify(rq1) !== JSON.stringify(rq2) || rq2[0][0] !== 5) {
  throw new Error("Mismatch in queue reconstruction");
}
console.log("Queue Reconstruction by Height passed!");
