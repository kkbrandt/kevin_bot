import { Client, GatewayIntentBits } from 'discord.js';
import { handlePrimeMessage } from './features/primeNumberChecker.js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// When the client is ready, run this code
client.once('ready', () => {
    if (!client.user) {
        console.error('❌ Client user is not available');
        return;
    }
    
    console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
});

// Listen for messages
client.on('messageCreate', async (message) => {
    try {
         // Ignore messages from bots
        if (message.author.bot) {
            return null;
        }
        console.log("New message received: ", message.content);
        
        // If the message is a number in the prime channel, get a response.
        const primeResponse = handlePrimeMessage(message);
        if (primeResponse) {
            await message.reply(primeResponse);
        }
    } catch (error) {
        console.error('Error handling message:', error);
        
        // Try to send a generic error message
        try {
            await message.reply('❌ Sorry, I encountered an error processing your message.');
        } catch (replyError) {
            console.error('Error sending error reply:', replyError);
        }
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
const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
    console.error('❌ DISCORD_BOT_TOKEN environment variable is not set');
    process.exit(1);
}

client.login(token).catch((error) => {
    console.error('Failed to login:', error);
    process.exit(1);
});
