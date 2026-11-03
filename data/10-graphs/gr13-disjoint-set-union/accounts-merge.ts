/**
 * Problem: Accounts Merge (LeetCode 721)
 * Difficulty: Medium
 * Pattern: GR13 - Disjoint Set Union
 *
 * Merge accounts belonging to the same person using common emails.
 */

// --- Optimal Approach (DSU on Email Addresses) ---
// Time Complexity: O(N log N)
// Space Complexity: O(N)
export function accountsMerge(accounts: string[][]): string[][] {
  const parent = new Map<string, string>();
  const emailToName = new Map<string, string>();

  function find(email: string): string {
    if (!parent.has(email)) parent.set(email, email);
    if (parent.get(email) !== email) {
      parent.set(email, find(parent.get(email)!));
    }
    return parent.get(email)!;
  }

  function union(e1: string, e2: string): void {
    const root1 = find(e1);
    const root2 = find(e2);
    if (root1 !== root2) {
      parent.set(root1, root2);
    }
  }

  // 1. Union emails within each account
  for (const account of accounts) {
    const name = account[0];
    const firstEmail = account[1];
    for (let i = 1; i < account.length; i++) {
      emailToName.set(account[i], name);
      union(firstEmail, account[i]);
    }
  }

  // 2. Group emails by root
  const groups = new Map<string, string[]>();
  for (const email of emailToName.keys()) {
    const root = find(email);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root)!.push(email);
  }

  // 3. Format result
  const result: string[][] = [];
  for (const [root, emails] of groups.entries()) {
    emails.sort();
    result.push([emailToName.get(root)!, ...emails]);
  }

  return result;
}

// --- Test Verification ---
const acc = [
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["Mary", "mary@mail.com"],
  ["John", "johnnybravo@mail.com"]
];
const merged = accountsMerge(acc);
console.assert(merged.length === 3, "Test 1 failed");
