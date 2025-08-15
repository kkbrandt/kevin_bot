/**
 * Check if a number is prime
 * @param {number} num - The number to check
 * @returns {boolean} - True if the number is prime, false otherwise
 */
function isPrime(num) {
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
 * @param {string} message - The message to parse
 * @returns {number|null} - The parsed number or null if not a valid number
 */
function parseNumber(message) {
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
 * @param {number} num - The number that was checked
 * @param {boolean} isPrimeResult - Whether the number is prime
 * @returns {string} - The response message
 */
function generatePrimeResponse(num, isPrimeResult) {
    if (isPrimeResult) {
        return `✅ ${num} is a prime number! 🎉`;
    } else {
        return `❌ ${num} is not a prime number.`;
    }
}

module.exports = {
    isPrime,
    parseNumber,
    generatePrimeResponse
};
