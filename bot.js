const { Client, GatewayIntentBits } = require('discord.js');
const { isPrime, parseNumber, generatePrimeResponse } = require('./utils/primeUtils');
require('dotenv').config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Channel name to monitor (case-insensitive)
const PRIME_CHANNEL_NAME = 'prime-numbers-only';

// When the client is ready, run this code
client.once('ready', () => {
    console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
    console.log(`🔍 Monitoring channel: "${PRIME_CHANNEL_NAME}"`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
    // Ignore messages from bots (including this bot)
    if (message.author.bot) return;
    
    // Check if message is in the "Prime numbers only" channel
    if (message.channel.name.toLowerCase() !== PRIME_CHANNEL_NAME.toLowerCase()) {
        return;
    }
    
    console.log(`📝 Message in ${message.channel.name}: "${message.content}"`);
    
    // Try to parse the message as a number
    const number = parseNumber(message.content);
    
    if (number === null) {
        // Not a valid number, let the user know
        // try {
        //     await message.reply("🤔 That doesn't look like a valid positive integer! Please send only positive whole numbers.");
        // } catch (error) {
        //     console.error('Error sending reply:', error);
        // }
        return;
    }
    
    // Check if the number is prime
    const primeResult = isPrime(number);
    const response = generatePrimeResponse(number, primeResult);
    
    console.log(`🧮 ${number} is ${primeResult ? 'prime' : 'not prime'}`);
    
    // Send the response
    try {
        await message.reply(response);
    } catch (error) {
        console.error('Error sending prime check result:', error);
    }
});

// Error handling
client.on('error', (error) => {
    console.error('Discord client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

// Login to Discord
client.login(process.env.DISCORD_BOT_TOKEN).catch((error) => {
    console.error('Failed to login:', error);
    process.exit(1);
});
