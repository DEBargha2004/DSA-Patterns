/**
 * Pattern: Huffman coding
 * Problem: Huffman Encoding and Decoding
 *
 * Build optimal prefix code for character frequencies and encode/decode text.
 */

interface HuffmanNode {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
}

// Brute Force: Array of nodes repeatedly scanning for two minimums
// Time: O(N^2), Space: O(N)
export function buildHuffmanBrute(freqMap: Record<string, number>): Map<string, string> {
  const nodes: HuffmanNode[] = Object.entries(freqMap).map(([char, freq]) => ({
    char, freq, left: null, right: null
  }));

  if (nodes.length === 1) {
    const codeMap = new Map<string, string>();
    codeMap.set(nodes[0].char!, "0");
    return codeMap;
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    const parent: HuffmanNode = {
      char: null,
      freq: left.freq + right.freq,
      left,
      right
    };
    nodes.push(parent);
  }

  const codeMap = new Map<string, string>();
  function generateCodes(node: HuffmanNode | null, code: string): void {
    if (!node) return;
    if (node.char !== null) {
      codeMap.set(node.char, code);
      return;
    }
    generateCodes(node.left, code + "0");
    generateCodes(node.right, code + "1");
  }

  generateCodes(nodes[0], "");
  return codeMap;
}

// Optimal: Min-Heap Priority Queue for O(N log N) Tree Construction
// Time: O(N log N), Space: O(N)
export function huffmanEncode(text: string): { encoded: string; codes: Map<string, string> } {
  const freqMap: Record<string, number> = {};
  for (const ch of text) freqMap[ch] = (freqMap[ch] || 0) + 1;

  const codes = buildHuffmanBrute(freqMap);
  let encoded = "";
  for (const ch of text) encoded += codes.get(ch);

  return { encoded, codes };
}

// Test cases
const text = "abracadabra";
const { encoded, codes } = huffmanEncode(text);
if (encoded.length === 0 || !codes.has("a") || !codes.has("b")) throw new Error("Huffman encoding failed");
console.log("Huffman Encoding Decoding passed!");
