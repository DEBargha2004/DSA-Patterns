/**
 * Pattern: Greedy assignment and pairing
 * Problem: Bag of Tokens (LeetCode 948)
 *
 * Given tokens and initial power.
 * Face up: spend tokens[i] power, gain 1 score.
 * Face down: spend 1 score, gain tokens[i] power.
 * Maximize your total score.
 */

// Brute Force: Recursion exploring all combinations of playing tokens
// Time: O(2^N), Space: O(N)
export function bagOfTokensScoreBrute(tokens: number[], power: number): number {
  tokens.sort((a, b) => a - b);

  function dfs(l: number, r: number, currPower: number, score: number): number {
    if (l > r) return score;

    let maxScore = score;
    // Play face up (spend smallest token for +1 score)
    if (currPower >= tokens[l]) {
      maxScore = Math.max(maxScore, dfs(l + 1, r, currPower - tokens[l], score + 1));
    }
    // Play face down (spend 1 score to gain largest token power)
    if (score > 0 && l < r) {
      maxScore = Math.max(maxScore, dfs(l, r - 1, currPower + tokens[r], score - 1));
    }

    return maxScore;
  }

  return dfs(0, tokens.length - 1, power, 0);
}

// Optimal: Two Pointers Greedy (Buy cheapest tokens with power, sell most expensive tokens for score)
// Time: O(N log N), Space: O(1) auxiliary
export function bagOfTokensScoreOptimal(tokens: number[], power: number): number {
  tokens.sort((a, b) => a - b);

  let left = 0;
  let right = tokens.length - 1;
  let score = 0;
  let maxScore = 0;

  while (left <= right) {
    if (power >= tokens[left]) {
      power -= tokens[left];
      score++;
      left++;
      maxScore = Math.max(maxScore, score);
    } else if (score > 0 && left < right) {
      power += tokens[right];
      score--;
      right--;
    } else {
      break;
    }
  }

  return maxScore;
}

// Test cases
const tokens = [100, 200, 300, 400];
if (bagOfTokensScoreBrute(tokens, 200) !== 2 || bagOfTokensScoreOptimal(tokens, 200) !== 2) {
  throw new Error("Expected max score 2");
}
console.log("Bag of Tokens passed!");
