import { Message } from 'discord.js';
import { isPrime, parseNumber, generatePrimeResponse } from '../utils/primeUtils.js';

const PRIME_CHANNEL_NAME = 'prime_numbers_only';

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
    if (message.channel.type !== 0) { // Not a guild text channel
        return null;
    }
    console.log("New message in channel: ", message.channel.name);
    if (message.channel.name !== PRIME_CHANNEL_NAME) {
        return null;
    }
    
    console.log(`📝 Message content: "${message.content}"`);
    
    // Try to parse the message as a number
    const number = parseNumber(message.content);
    
    if (number === null) {
        console.log(`${message.content} is not a valid number!`);
        return null;
    }
    
    // Check if the number is prime
    const primeResult = isPrime(number);
    const response = generatePrimeResponse(number, primeResult);
    
    console.log(`🧮 ${number} is ${primeResult ? 'prime' : 'not prime'}!`);
    
    return response;
}
