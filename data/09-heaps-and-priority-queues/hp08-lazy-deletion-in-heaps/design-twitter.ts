/**
 * Problem: Design Twitter (LeetCode 355)
 * Difficulty: Medium
 * Pattern: HP8 - Lazy deletion in heaps
 *
 * Design a simplified Twitter with postTweet, getNewsFeed, follow, and unfollow.
 */

// --- Optimal Approach (User Follow Sets + K-Way Merge / Heap Feed Retrieval) ---
// Time Complexity: postTweet: O(1), follow/unfollow: O(1), getNewsFeed: O(F log F)
// Space Complexity: O(U + T)
export class Twitter {
  private timestamp = 0;
  private userTweets = new Map<number, [time: number, id: number][]>();
  private userFollows = new Map<number, Set<number>>();

  postTweet(userId: number, tweetId: number): void {
    if (!this.userTweets.has(userId)) this.userTweets.set(userId, []);
    this.userTweets.get(userId)!.push([this.timestamp++, tweetId]);
  }

  getNewsFeed(userId: number): number[] {
    const following = new Set(this.userFollows.get(userId) ?? []);
    following.add(userId);

    const candidates: [time: number, id: number][] = [];
    for (const fid of following) {
      const tweets = this.userTweets.get(fid) ?? [];
      // Grab up to 10 latest tweets from each followee
      for (let i = Math.max(0, tweets.length - 10); i < tweets.length; i++) {
        candidates.push(tweets[i]);
      }
    }

    candidates.sort((a, b) => b[0] - a[0]);
    return candidates.slice(0, 10).map((t) => t[1]);
  }

  follow(followerId: number, followeeId: number): void {
    if (!this.userFollows.has(followerId)) this.userFollows.set(followerId, new Set());
    this.userFollows.get(followerId)!.add(followeeId);
  }

  unfollow(followerId: number, followeeId: number): void {
    this.userFollows.get(followerId)?.delete(followeeId);
  }
}

// --- Test Verification ---
const twitter = new Twitter();
twitter.postTweet(1, 5);
console.assert(JSON.stringify(twitter.getNewsFeed(1)) === JSON.stringify([5]), "Test 1 failed");
twitter.follow(1, 2);
twitter.postTweet(2, 6);
console.assert(JSON.stringify(twitter.getNewsFeed(1)) === JSON.stringify([6, 5]), "Test 2 failed");
twitter.unfollow(1, 2);
console.assert(JSON.stringify(twitter.getNewsFeed(1)) === JSON.stringify([5]), "Test 3 failed");
