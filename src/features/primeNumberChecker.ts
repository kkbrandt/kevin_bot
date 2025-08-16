import { Message } from 'discord.js';
import { isPrime, parseNumber, generatePrimeResponse } from '../utils/primeUtils';

const PRIME_CHANNEL_NAME = 'prime-numbers-only';

/**
 * Process a Discord message and determine if we should reply
 * @param message - The Discord message to process
 * @param targetChannelName - The name of the channel to monitor (case-insensitive)
 * @returns Object indicating whether to reply and what to reply with
 */
export function handlePrimeMessage(
    message: Message, 
): string | null {
    // Check if message is in the target channel
    if (message.channel.type !== 0 || message.channel.name !== PRIME_CHANNEL_NAME) {
        return null;
    }
    
    // Try to parse the message as a number
    const number = parseNumber(message.content);
    
    if (number === null) {
        console.log(`Message is not a valid number.`);
        return null;
    }
    
    // Check if the number is prime using tiered approach
    try {
        const primeResult = isPrime(number);
        const response = generatePrimeResponse(number, primeResult);
        
        console.log(`🧮 ${number} is ${primeResult.isPrime ? 'prime' : 'not prime'}! (Method: ${primeResult.method})`);
        
        return response;
    } catch (error) {
        console.log(`🚫 Error processing number ${number}: ${error}`);
        return "Something went wrong. Is the number too big?";
    }
}
