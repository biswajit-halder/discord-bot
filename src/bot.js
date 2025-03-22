require('dotenv').config();

const { Client, Events, GatewayIntentBits, Partials, WebhookClient } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const webhookclient = new WebhookClient({
    id: process.env.WEBHOOK_ID,
    token: process.env.WEBHOOK_TOKEN
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
        } else if (CMD_NAME === 'ban') {
            if (!message.member.permissions.has('BanMembers'))
                return message.reply('You do not have permission to use that command');

            if (args.length === 0) return message.reply("Please provide an ID");

            try {
                const user = await message.guild.members.ban(args[0]);
                message.channel.send(`Banned user successfully!`)
            } catch (error) {
                message.channel.send("I do not have permissions to ban this user :(")
            }
        } else if (CMD_NAME === 'announce') {
            const msg = args.join(" ");
            console.log(msg);
            webhookclient.send(msg);
        }
    }
});

client.on(Events.MessageReactionAdd, (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '1351994839771643905') {
        switch (name) {
            case '🍎'://apple
                member.roles.add('1351982596564848822');
                break;
            case '🍌'://banana
                member.roles.add('1351982696384958555');
                break;
            case '🍑'://peach
                member.roles.add('1351982784045912064');
                break;
        }
    }
});

client.on(Events.MessageReactionRemove, (reaction, user) => {
    const { name } = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id);
    if (reaction.message.id === '1351994839771643905') {
        switch (name) {
            case '🍎'://apple
                member.roles.remove('1351982596564848822');
                break;
            case '🍌'://banana
                member.roles.remove('1351982696384958555');
                break;
            case '🍑'://peach
                member.roles.remove('1351982784045912064');
                break;
        }
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);