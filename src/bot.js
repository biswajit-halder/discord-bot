require('dotenv').config();

const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const PREFIX = "$";

client.on(Events.ClientReady, () => {
    console.log(`${client.user.tag} has logged in`)
});