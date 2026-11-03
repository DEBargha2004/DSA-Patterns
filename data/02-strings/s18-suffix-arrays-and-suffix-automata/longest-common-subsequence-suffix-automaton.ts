/**
 * Problem: Substring Match using Suffix Automaton (SAM)
 * Difficulty: Hard
 * Pattern: S18 - Suffix arrays and suffix automata
 *
 * Build a linear-size Suffix Automaton (SAM) to test if pattern is a substring in O(|pattern|) time.
 */

class SAMState {
  len: number = 0;
  link: number = -1;
  next: Map<string, number> = new Map();
}

export class SuffixAutomaton {
  private st: SAMState[] = [];
  private sz: number = 1;
  private last: number = 0;

  constructor(s: string) {
    this.st.push(new SAMState());
    for (const ch of s) {
      this.extend(ch);
    }
  }

  private extend(c: string): void {
    const cur = this.sz++;
    this.st.push(new SAMState());
    this.st[cur].len = this.st[this.last].len + 1;

    let p = this.last;
    while (p !== -1 && !this.st[p].next.has(c)) {
      this.st[p].next.set(c, cur);
      p = this.st[p].link;
    }

    if (p === -1) {
      this.st[cur].link = 0;
    } else {
      const q = this.st[p].next.get(c)!;
      if (this.st[p].len + 1 === this.st[q].len) {
        this.st[cur].link = q;
      } else {
        const clone = this.sz++;
        const cloneState = new SAMState();
        cloneState.len = this.st[p].len + 1;
        cloneState.next = new Map(this.st[q].next);
        cloneState.link = this.st[q].link;
        this.st.push(cloneState);

        while (p !== -1 && this.st[p].next.get(c) === q) {
          this.st[p].next.set(c, clone);
          p = this.st[p].link;
        }

        this.st[q].link = clone;
        this.st[cur].link = clone;
      }
    }

    this.last = cur;
  }

  isSubstring(pattern: string): boolean {
    let cur = 0;
    for (const ch of pattern) {
      if (!this.st[cur].next.has(ch)) return false;
      cur = this.st[cur].next.get(ch)!;
    }
    return true;
  }
}

// --- Test Verification ---
const sam = new SuffixAutomaton("abacaba");
console.assert(sam.isSubstring("acab") === true, "Test 1 failed");
console.assert(sam.isSubstring("baca") === true, "Test 2 failed");
console.assert(sam.isSubstring("xyz") === false, "Test 3 failed");
