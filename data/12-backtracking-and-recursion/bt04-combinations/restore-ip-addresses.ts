/**
 * Pattern: Combinations
 * Problem: Restore IP Addresses (LeetCode 93)
 *
 * Given a string s containing only digits, return all possible valid IPv4 addresses
 * that can be formed by inserting dots.
 */

// Brute Force: 3 Nested Loops for the 3 dot positions
// Time: O(1) [s length <= 12, max 12^3 iterations], Space: O(1)
export function restoreIpAddressesBrute(s: string): string[] {
  const n = s.length;
  if (n < 4 || n > 12) return [];
  const result: string[] = [];

  function isValid(seg: string): boolean {
    if (seg.length === 0 || seg.length > 3) return false;
    if (seg.length > 1 && seg[0] === '0') return false; // leading zero
    const val = parseInt(seg, 10);
    return val >= 0 && val <= 255;
  }

  for (let i = 1; i <= 3 && i < n; i++) {
    for (let j = i + 1; j <= i + 3 && j < n; j++) {
      for (let k = j + 1; k <= j + 3 && k < n; k++) {
        const s1 = s.slice(0, i);
        const s2 = s.slice(i, j);
        const s3 = s.slice(j, k);
        const s4 = s.slice(k);
        if (isValid(s1) && isValid(s2) && isValid(s3) && isValid(s4)) {
          result.push(`${s1}.${s2}.${s3}.${s4}`);
        }
      }
    }
  }
  return result;
}

// Optimal: Recursive Backtracking with Early Pruning
// Time: O(3^4) = O(1), Space: O(1) auxiliary recursion stack
export function restoreIpAddressesOptimal(s: string): string[] {
  const result: string[] = [];
  const segments: string[] = [];
  const n = s.length;

  function backtrack(start: number): void {
    if (segments.length === 4) {
      if (start === n) result.push(segments.join("."));
      return;
    }

    const remainingSegments = 4 - segments.length;
    const remainingChars = n - start;
    if (remainingChars < remainingSegments || remainingChars > remainingSegments * 3) {
      return; // Early prune
    }

    for (let len = 1; len <= 3 && start + len <= n; len++) {
      const seg = s.substring(start, start + len);
      if (len > 1 && seg[0] === '0') break; // Leading zero invalidates further extensions
      if (parseInt(seg, 10) > 255) break;

      segments.push(seg);
      backtrack(start + len);
      segments.pop();
    }
  }

  backtrack(0);
  return result;
}

// Test cases
const ip1 = restoreIpAddressesBrute("25525511135");
const ip2 = restoreIpAddressesOptimal("25525511135");
if (ip1.length !== 2 || ip2.length !== 2 || !ip2.includes("255.255.11.135")) {
  throw new Error("Mismatch in restore IP addresses");
}
console.log("Restore IP Addresses passed!");
