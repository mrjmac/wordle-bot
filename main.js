const Discord = require('discord.js');
const config = require('./config.json')
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = 'Wordle ';
const fs = require('fs');
const map1 = new Map();
const map2 = new Map();
const map3 = new Map();
 
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
            map2.set(message.author.username, parseInt(map2.get(message.author.username)) + 1);
        }
        else
        {
            map1.set(message.author.username, args.charAt(4));
            map2.set(message.author.username, 1);
        }
        //message.channel.send(map1.get(message.author.username));
    }
    else if (message.channel.name == "wordle" && command[0] == 'scoreboard')
    {
        const iterator0 = map1.keys();
        for (let value of iterator0)
        {
            map3.set(value, Math.round((map1.get(value))/(map2.get(value)) * 100) / 100);
        }
        var config = "";
        var config = "From best to worst:\n";
        const mapSort1 = new Map([...map3.entries()].sort((a, b) => a[1] - b[1]));
        const iterator1 = mapSort1.keys();

        for (let value of iterator1)
        {
            config += "**" + value + "**: " + map3.get(value) + "\n";
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
    else if (message.channel.name == "mods" && command[0] == 'remove')
    {
        const list = args.split(' ');
        //message.channel.send("penis");
        for (const item of list)
        {
            map1.delete(item, 0);
            map2.delete(item, 0);
            //mapSort1.delete(item, 0);
        }
    }
})


client.login(config.token);