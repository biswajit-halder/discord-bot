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

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        if (CMD_NAME === 'kick') {
            if (!message.member.permissions.has('KickMembers'))
                return message.reply('You do not have permission to use that command');

            if (args.length === 0) return message.reply("Please provide an ID");

            try {
                const member = await message.guild.members.fetch(args[0])
            } catch (error) {
                console.log(error)
            }
            
            if (member) {
                try {
                    const kickInfo = await member.kick();
                    message.channel.send(`Kicked ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}`)
                } catch (error) {
                    message.channel.send("I do not have permissions to kick this user :(")
                }
            } else {
                message.channel.send("That member was not found");
            }
        }
    }
});