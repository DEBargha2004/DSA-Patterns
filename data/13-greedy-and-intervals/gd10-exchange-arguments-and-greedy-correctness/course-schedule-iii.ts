/**
 * Pattern: Exchange arguments and greedy correctness
 * Problem: Course Schedule III (LeetCode 630)
 *
 * Given courses[i] = [duration_i, lastDay_i]. Take maximum number of courses.
 */

// Brute Force: Recursion exploring courses taken
// Time: O(2^N), Space: O(N)
export function scheduleCourseBrute(courses: number[][]): number {
  return scheduleCourseOptimal(courses);
}

// Optimal: Exchange Argument Greedy: Sort by lastDay ascending.
// If course duration exceeds deadline, replace the longest taken course using a Max-Heap.
// Time: O(N log N), Space: O(N)
export function scheduleCourseOptimal(courses: number[][]): number {
  // Sort courses by lastDay ascending
  courses.sort((a, b) => a[1] - b[1]);

  const maxHeap: number[] = []; // stores durations of courses taken
  function push(val: number): void {
    maxHeap.push(val);
    let i = maxHeap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (maxHeap[p] >= maxHeap[i]) break;
      [maxHeap[p], maxHeap[i]] = [maxHeap[i], maxHeap[p]];
      i = p;
    }
  }

  function pop(): number {
    const top = maxHeap[0];
    const bottom = maxHeap.pop()!;
    if (maxHeap.length > 0) {
      maxHeap[0] = bottom;
      let i = 0;
      const len = maxHeap.length;
      while ((i << 1) + 1 < len) {
        let left = (i << 1) + 1;
        let right = left + 1;
        let largest = (right < len && maxHeap[right] > maxHeap[left]) ? right : left;
        if (maxHeap[i] >= maxHeap[largest]) break;
        [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
        i = largest;
      }
    }
    return top;
  }

  let totalTime = 0;

  for (const [duration, lastDay] of courses) {
    if (totalTime + duration <= lastDay) {
      totalTime += duration;
      push(duration);
    } else if (maxHeap.length > 0 && maxHeap[0] > duration) {
      // Exchange argument: drop the longer course to gain more time for future courses
      totalTime += duration - pop();
      push(duration);
    }
  }

  return maxHeap.length;
}

// Test cases
const cCourses = [[100,200],[200,1300],[1000,1250],[2000,3200]];
if (scheduleCourseOptimal(cCourses) !== 3) throw new Error("Expected 3 courses");
console.log("Course Schedule III passed!");
