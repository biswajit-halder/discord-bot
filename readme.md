# discord-bot

A powerful Discord bot for server moderation, announcements, and role management using reactions.

## Features

- **Kick/Ban Users**: Remove users from the server with moderation commands.
- **Announcements**: Send important updates in a designated channel.
- **Role Management via Reactions**: Users can add or remove roles by reacting to messages.

## Requirements

- Node.js (v16+)
- Discord.js (latest version)
- A Discord bot token
- Required permissions for the bot (Manage Roles, Ban Members, Kick Members, Send Messages, Add Reactions, etc.)

## Installation

1. Clone this repository:
   ```sh
   git clone https://github.com/biswajit-halder/discord-bot.git
   cd discord-bot
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your bot token:
   ```env
   DISCORDJS_BOT_TOKEN=your-bot-token
   WEBHOOK_ID=your-webhook-id
   WEBHOOK_TOKEN=your-webhook-token
   ```
4. Run the bot:
   ```sh
   node ./src/bot.js
   ```

## Commands

| Command               | Description              |
| --------------------- | ------------------------ |
| `$kick @user`         | Kicks the mentioned user |
| `$ban @user`          | Bans the mentioned user  |
| `$announce [message]` | Sends an announcement    |

## Role Management via Reactions

1. Users react to the message to receive or remove a role.

