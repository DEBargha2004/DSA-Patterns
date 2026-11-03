/**
 * Pattern: Meeting rooms and resource allocation
 * Problem: Meeting Rooms III (LeetCode 2402)
 *
 * Given n rooms and meetings intervals, assign meetings to lowest available room number.
 * If no room is available, meeting is delayed until earliest room frees up.
 * Return the room that held the most meetings.
 */

// Brute Force: Array scan over all rooms finding available or earliest finishing room
// Time: O(M * N + M log M), Space: O(N)
export function mostBookedBrute(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]);

  const roomAvailability = new Array(n).fill(0); // timestamp when room becomes free
  const bookingCount = new Array(n).fill(0);

  for (const [start, end] of meetings) {
    const duration = end - start;
    let foundRoom = -1;
    let earliestTime = Infinity;
    let earliestRoom = -1;

    for (let r = 0; r < n; r++) {
      if (roomAvailability[r] <= start) {
        foundRoom = r;
        break;
      }
      if (roomAvailability[r] < earliestTime) {
        earliestTime = roomAvailability[r];
        earliestRoom = r;
      }
    }

    if (foundRoom !== -1) {
      roomAvailability[foundRoom] = end;
      bookingCount[foundRoom]++;
    } else {
      roomAvailability[earliestRoom] += duration;
      bookingCount[earliestRoom]++;
    }
  }

  let maxBookings = -1;
  let bestRoom = 0;
  for (let r = 0; r < n; r++) {
    if (bookingCount[r] > maxBookings) {
      maxBookings = bookingCount[r];
      bestRoom = r;
    }
  }

  return bestRoom;
}

// Optimal: Two Priority Queues (freeRooms MinHeap & busyRooms MinHeap)
// Time: O(M log N + M log M), Space: O(N)
export function mostBookedOptimal(n: number, meetings: number[][]): number {
  meetings.sort((a, b) => a[0] - b[0]);

  // For TS simplicity without huge custom PQ template, simulate using sorted arrays/heaps
  const freeRooms: number[] = [];
  for (let i = 0; i < n; i++) freeRooms.push(i);

  // busy: [freeTime, roomNumber]
  const busyRooms: [number, number][] = [];
  const bookingCount = new Array(n).fill(0);

  for (const [start, end] of meetings) {
    const duration = end - start;

    // Release finished rooms
    busyRooms.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
    while (busyRooms.length > 0 && busyRooms[0][0] <= start) {
      const [, room] = busyRooms.shift()!;
      freeRooms.push(room);
    }
    freeRooms.sort((a, b) => a - b);

    if (freeRooms.length > 0) {
      const room = freeRooms.shift()!;
      bookingCount[room]++;
      busyRooms.push([end, room]);
    } else {
      // Must wait for earliest room
      const [earliestFree, room] = busyRooms.shift()!;
      bookingCount[room]++;
      busyRooms.push([earliestFree + duration, room]);
    }
  }

  let maxBookings = -1;
  let bestRoom = 0;
  for (let r = 0; r < n; r++) {
    if (bookingCount[r] > maxBookings) {
      maxBookings = bookingCount[r];
      bestRoom = r;
    }
  }

  return bestRoom;
}

// Test cases
const meets = [[0,10],[1,5],[2,7],[3,4]];
const mb1 = mostBookedBrute(2, meets);
const mb2 = mostBookedOptimal(2, meets);
if (mb1 !== 0 || mb2 !== 0) throw new Error("Expected room 0");
console.log("Meeting Rooms III passed!");
