/**
 * Pattern: Mathematical algorithms
 * Problem: Count Primes (LeetCode 204)
 *
 * Given an integer n, return the number of prime numbers strictly less than n.
 */

// Brute Force: Trial division up to sqrt(x) for each number
// Time: O(N * sqrt(N)), Space: O(1)
export function countPrimesTrial(n: number): number {
  if (n <= 2) return 0;

  function isPrime(x: number): boolean {
    for (let d = 2; d * d <= x; d++) {
      if (x % d === 0) return false;
    }
    return true;
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}

// Optimal: Sieve of Eratosthenes
// Time: O(N log log N), Space: O(N)
export function countPrimesOptimal(n: number): number {
  if (n <= 2) return 0;
  const isPrime = new Uint8Array(n).fill(1);
  isPrime[0] = 0;
  isPrime[1] = 0;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) count++;
  }
  return count;
}

// Test cases
if (countPrimesTrial(10) !== 4 || countPrimesOptimal(10) !== 4) throw new Error("Expected 4 primes < 10");
if (countPrimesOptimal(20) !== 8) throw new Error("Expected 8 primes < 20");
console.log("Count Primes Sieve passed!");
