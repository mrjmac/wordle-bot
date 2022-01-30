const Discord = require('discord.js');
const config = require('./config.json')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = 'Wordle ';
const fs = require('fs');
const map1 = new Map();
 
client.once('ready', () =>{
    console.log('Wordlebot is online');
})

client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length);
    const command = args.split(" ");
    //console.log(command[0]);
    //console.log(args);

    if(message.channel.name == "wordle" && args.substring(0, 5).match(".*\\d\\d\\d \\d*."))
    {
        if (map1.get(message.author.username) != null){
            map1.set(message.author.username, args.charAt(4));
        }
        else
        {
            map1.set(message.author.username, args.charAt(4));
        }
        //message.channel.send(map1.get(message.author.username));
    }
    else if (message.channel.name == "wordle" && command[0] == 'setup')
    {
        //console.log(args);
        const list = args.split(' ');

        for (const item of list)
        {
            map1.set(item, 0);

        }
    }
    else if (message.channel.name == "wordle" && command[0] == 'add')
    {
        const list = args.substring(4).split(' ');
        for (const item of list)
        {
            map1.set(item, 0);

        }
    }
    else if(message.channel.name == "wordle" && command[0] == 'remove')
    {
        const list = args.split(' ');

        for (const item of list)
        {
            map1.delete(item, 0);

        }
    }
    else if (message.channel.name == "wordle" && command[0] == 'scoreboard')
    {
        var config = "";
        const iterator1 = map1.keys();

        for (let value of iterator1)
        {
            config += value + " " + map1.get(value) + "\n";
        }

        message.channel.send(config);
    }
})


client.login("OTM2ODM2NTM4NTM5NTczMjY4.YfS_BA.PuxHAdpfDWIyiprX4DHboTLPgmI");