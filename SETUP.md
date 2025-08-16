# Setup Instructions

> **Note:** KevinBot is automatically deployed when the main branch is modified. If you need to deploy KevinBot somewhere else, refer to the instructions below.

## Setup Instructions

### 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section in the left sidebar
4. Click "Add Bot"
5. Copy the bot token (you'll need this later)

### 2. Set Bot Permissions

In the Discord Developer Portal:
1. Go to the "Bot" section
2. Under "Privileged Gateway Intents", enable:
   - Message Content Intent
3. Go to the "OAuth2" > "URL Generator" section
4. Select scopes: `bot`
5. Select bot permissions:
   - Send Messages
   - Read Message History
   - Use Slash Commands
6. Copy the generated URL and use it to invite the bot to your server

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Discord bot token:
   ```
   DISCORD_BOT_TOKEN=your_actual_bot_token_here
   ```

### 5. Run the Bot

For development (with auto-restart):
```bash
npm run dev
```

For production:
```bash
npm start
```

## 🚀 Cloud Deployment (Railway)

The easiest way to host this bot 24/7 is using Railway with automatic GitHub deployments.

### Deploy to Railway

1. **Push to GitHub** (if you haven't already):
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Sign up/login with your GitHub account
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `kevin_bot` repository
   - Railway will automatically detect it's a Node.js app

3. **Set Environment Variables**:
   - In your Railway project dashboard, go to "Variables"
   - Add: `DISCORD_BOT_TOKEN` = `your_actual_bot_token`
   - The bot will automatically restart with the new token

4. **Automatic Deployments**:
   - Railway automatically deploys when you push to `main` branch
   - No additional setup needed!

### Alternative: Deploy to Heroku

If you prefer Heroku:

1. Install Heroku CLI and login
2. Create a Heroku app:
   ```bash
   heroku create your-bot-name
   ```
3. Set the environment variable:
   ```bash
   heroku config:set DISCORD_BOT_TOKEN=your_actual_bot_token
   ```
4. Deploy:
   ```bash
   git push heroku main
   ```

### Deployment Features

- ✅ **Zero-config deployment** - Just connect your GitHub repo
- ✅ **Automatic deployments** - Updates when you push to main
- ✅ **24/7 uptime** - Your bot stays online
- ✅ **Free tier available** - Railway/Heroku offer free hosting
- ✅ **Environment variables** - Secure token storage
- ✅ **Automatic restarts** - Bot restarts if it crashes

## Troubleshooting

- **Bot doesn't respond**: Make sure the channel is named exactly "Prime numbers only"
- **Permission errors**: Ensure the bot has "Send Messages" and "Read Message History" permissions
- **Bot offline**: Check that your bot token is correct in the `.env` file


