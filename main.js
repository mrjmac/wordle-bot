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
    if((!message.content.startsWith(prefix) && !message.content.startsWith(prefix.toLowerCase) && !message.content.startsWith(prefix.toUpperCase)) || message.author.bot) return;

    const args = message.content.slice(prefix.length);
    const command = args.split(" ");
    //console.log(command[0]);
    //console.log(args);

    if(message.channel.name == "wordle" && args.substring(0, 5).match(".*\\d\\d\\d \\d*."))
    {
        if (map1.get(message.author.username) != null){
            map1.set(message.author.username, parseInt(args.charAt(4)) + parseInt(map1.get(message.author.username)));
        }
        else
        {
            map1.set(message.author.username, args.charAt(4));
        }
        //message.channel.send(map1.get(message.author.username));
    }
    else if (message.channel.name == "wordle" && command[0] == 'scoreboard')
    {
        var config = "";
        if (map1.keys() != null)
        {
            const iterator1 = map1.keys();

            for (let value of iterator1)
            {
                config += value + " " + map1.get(value) + "\n";
            }
        }
        else 
        {
            config = "Empty";
        }
        

        message.channel.send(config);
    }
    else if (message.channel.name == "wordle" && command[0] == 'help')
    {
        message.channel.send(
            "Commands:\n" +
            "Wordle help - lists all commands\n" +
            "Wordle scoreboard - lists scoreboard, compounds daily\n"
        );
    }
})


client.login(config.token);