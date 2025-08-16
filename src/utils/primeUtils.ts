import { checkPrimeSync } from 'crypto';

const MAX_DIGITS_FOR_SMALL_PRIME = 6;
const MAX_DIGITS_FOR_LARGE_PRIME = 10000;

/**
 * Result of a prime check operation
 */
export interface PrimeCheckResult {
    isPrime: boolean;
    divisor?: number | bigint;  // If composite, the divisor found
    confidence?: number;        // For probabilistic tests (0-100)
    method: 'deterministic' | 'probabilistic';
}

/**
 * Enhanced prime checking with tiered approach
 * @param num - The number to check (number or bigint)
 * @returns Detailed result of the prime check
 */
export function isPrime(num: number | bigint): PrimeCheckResult {
    // Convert to BigInt for consistent handling
    const bigNum = typeof num === 'bigint' ? num : BigInt(num);
    
    // Handle edge cases
    if (bigNum < 2n) return { isPrime: false, method: 'deterministic' };
    if (bigNum === 2n) return { isPrime: true, method: 'deterministic' };
    if (bigNum % 2n === 0n) return { isPrime: false, divisor: 2, method: 'deterministic' };
    
    // Reject very large numbers
    const numStr = bigNum.toString();
    if (numStr.length > MAX_DIGITS_FOR_LARGE_PRIME) {
        throw new Error('Number too large for processing');
    }
    
    // Tier 1: Small/Medium numbers - Deterministic with divisor finding
    if (numStr.length <= MAX_DIGITS_FOR_SMALL_PRIME) {
        return checkSmallPrime(bigNum);
    }
    
    // Tier 2: Large numbers - Use crypto.checkPrimeSync with Miller-Rabin
    return checkLargePrime(bigNum);
}

/**
 * Deterministic prime check for small/medium numbers with divisor finding
 */
function checkSmallPrime(num: bigint): PrimeCheckResult {
    // Quick check for small primes (expanded list for better coverage)
    const smallPrimes = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n];
    
    for (const prime of smallPrimes) {
        if (num === prime) return { isPrime: true, method: 'deterministic' };
        if (num % prime === 0n) return { isPrime: false, divisor: Number(prime), method: 'deterministic' };
    }
    
    // Check remaining odd divisors up to sqrt(num)
    const sqrt = BigInt(Math.floor(Math.sqrt(Number(num))));
    for (let i = 101n; i <= sqrt; i += 2n) {
        if (num % i === 0n) {
            return { isPrime: false, divisor: Number(i), method: 'deterministic' };
        }
    }
    
    return { isPrime: true, method: 'deterministic' };
}

/**
 * Probabilistic prime check for large numbers using crypto.checkPrimeSync
 */
function checkLargePrime(num: bigint): PrimeCheckResult {
    try {
        // Use crypto.checkPrimeSync with multiple rounds for high confidence
        // Default is usually around 64 rounds, giving extremely high confidence
        const isProbablyPrime = checkPrimeSync(num, { checks: 64 });
        
        // Calculate confidence percentage
        // With 64 rounds of Miller-Rabin, the probability of error is roughly (1/4)^64
        // which is astronomically small (less than 2^-128)
        const confidence = isProbablyPrime ? 99.999999999999 : 100; // Essentially certain
        
        return {
            isPrime: isProbablyPrime,
            confidence,
            method: 'probabilistic'
        };
    } catch (error) {
        // Fallback to deterministic check if crypto fails
        console.warn('Crypto prime check failed, falling back to deterministic:', error);
        return checkSmallPrime(num);
    }
}

/**
 * Parse a message to extract a number, supporting very large numbers
 * @param message - The message to parse
 * @returns The parsed BigInt or null if not a valid number
 */
export function parseNumber(message: string): bigint | null {
    // remove all whitespace, commas, and periods from text
    const trimmed = message.replace(/[\s,.]/g, '');
    
    // Check if it's a valid number (integer only for prime checking)
    if (!/^-?\d+$/.test(trimmed)) {
        return null;
    }
    
    try {
        const num = BigInt(trimmed);
        
        // For prime checking, we only care about positive integers
        if (num < 0n) {
            return null;
        }
        
        return num;
    } catch (error) {
        // BigInt parsing failed
        return null;
    }
}

/**
 * Generate a response message for a prime check
 * @param num - The number that was checked
 * @param result - The result of the prime check
 * @returns The response message
 */
export function generatePrimeResponse(num: bigint, result: PrimeCheckResult): string {
    if (result.isPrime) {
        let response = `✅ ${num} is a prime number! 🎉`;
        
        if (result.method === 'probabilistic' && result.confidence) {
            response += ` (${result.confidence.toFixed(12)}% confident)`;
        }
        
        return response;
    } else {
        let response = `❌ ${num} is not a prime number`;
        
        if (result.divisor) {
            response += `, it is divisible by ${result.divisor}`;
        }
        
        response += '.';
        return response;
    }
}
