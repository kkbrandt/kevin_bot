/**
 * Check if a number is prime
 * @param num - The number to check
 * @returns True if the number is prime, false otherwise
 */
export function isPrime(num: number): boolean {
    // Handle edge cases
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check odd divisors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}

/**
 * Parse a message to extract a number
 * @param message - The message to parse
 * @returns The parsed number or null if not a valid number
 */
export function parseNumber(message: string): number | null {
    const trimmed = message.trim();
    
    // Check if it's a valid number (integer or float)
    if (!/^-?\d+(\.\d+)?$/.test(trimmed)) {
        return null;
    }
    
    const num = parseFloat(trimmed);
    
    // For prime checking, we only care about positive integers
    if (!Number.isInteger(num) || num < 0) {
        return null;
    }
    
    return num;
}

/**
 * Generate a response message for a prime check
 * @param num - The number that was checked
 * @param isPrimeResult - Whether the number is prime
 * @returns The response message
 */
export function generatePrimeResponse(num: number, isPrimeResult: boolean): string {
    if (isPrimeResult) {
        return `✅ ${num} is a prime number! 🎉`;
    } else {
        return `❌ ${num} is not a prime number.`;
    }
}
