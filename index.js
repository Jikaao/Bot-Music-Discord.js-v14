const Discord = require("discord.js");
const dotenv = require("dotenv");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Player } = require("discord-player");
const { ActivityType } = require("discord.js")

dotenv.config();
const TOKEN = process.env.TOKEN;

const LOAD_SLASH = process.argv[2] == "load";

const CLIENT_ID = ""; //ID BOT
const GUILD_ID = ""; //ID SERVEUR

const { Client, Intents } = require('discord.js');

const botclient = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates,
        // ... d'autres intents
    ]
});

botclient.slashcommands = new Discord.Collection();
botclient.player = new Player(botclient, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

let commands = [];

const slashFiles = fs
  .readdirSync("./slash")
  .filter((file) => file.endsWith(".js"));
for (const file of slashFiles) {
  const slashcmd = require(`./slash/${file}`);
  botclient.slashcommands.set(slashcmd.data.name, slashcmd);
  if (LOAD_SLASH) commands.push(slashcmd.data.toJSON());
}

if (LOAD_SLASH) {
  const rest = new REST({ version: "9" }).setToken(
    "TOKEN" // ENTRER LE TOKEN ICI
  );
  console.log("Deploying slash commands");
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => {
      console.log("Successfully loaded");
      process.exit(0);
    })
    .catch((err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      }
    });
} else {
  botclient.on("ready", () => {
    botclient.user.setActivity(`Shiru tomber par terre`, { type: ActivityType.Watching, url: "https://discord.gg/FairyTailFR" });  //Watching/play/listeren/steaming
    botclient.user.setStatus("dnd"); //"dnd"/"online"/"offline"/"idle"
    console.log(`Logged in as ${botclient.user.tag}`);
  });
  botclient.on("interactionCreate", (interaction) => {
    async function handleCommand() {
      if (!interaction.isCommand()) return;

      const slashcmd = botclient.slashcommands.get(interaction.commandName);
      if (!slashcmd) interaction.reply("Commande slash non valide");

      await interaction.deferReply();
      await slashcmd.run({ client: botclient, interaction });
    }
    handleCommand();
  });

  botclient.login("TOKEN"); // ENTRER LE TOKEN ICI
}

