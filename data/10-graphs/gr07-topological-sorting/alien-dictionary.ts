/**
 * Problem: Alien Dictionary (LeetCode 269 analog)
 * Difficulty: Hard
 * Pattern: GR7 - Topological sorting
 *
 * Derive lexicographical order of characters in alien language given sorted words list.
 */

// --- Optimal Approach (Kahn's Topological Sort) ---
// Time Complexity: O(total characters + distinct letters)
// Space Complexity: O(distinct letters)
export function alienOrder(words: string[]): string {
  const adj = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const word of words) {
    for (const ch of word) {
      if (!adj.has(ch)) adj.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }
  }

  // Find edges from adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return ""; // invalid prefix order
    }

    const minLen = Math.min(w1.length, w2.length);
    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!adj.get(w1[j])!.has(w2[j])) {
          adj.get(w1[j])!.add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j])! + 1);
        }
        break;
      }
    }
  }

  const queue: string[] = [];
  for (const [ch, deg] of inDegree.entries()) {
    if (deg === 0) queue.push(ch);
  }

  let order = "";
  while (queue.length > 0) {
    const u = queue.shift()!;
    order += u;

    for (const v of adj.get(u)!) {
      inDegree.set(v, inDegree.get(v)! - 1);
      if (inDegree.get(v) === 0) {
        queue.push(v);
      }
    }
  }

  return order.length === inDegree.size ? order : "";
}

// --- Test Verification ---
console.assert(alienOrder(["wrt", "wrf", "er", "ett", "rftt"]) === "wertf", "Test 1 failed");
console.assert(alienOrder(["z", "x"]) === "zx", "Test 2 failed");
console.assert(alienOrder(["z", "x", "z"]) === "", "Test 3 failed (cycle)");
