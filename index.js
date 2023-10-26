const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { Player } = require("discord-player");
const { ActivityType } = require("discord.js")
const { TOKEN, CLIENT_ID, GUILD_ID } = require('./config.json');

const botclient = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildVoiceStates,
        // ... d'autres intents
    ]
});
const LOAD_SLASH = process.argv[2] == "load";




botclient.slashcommands = new Discord.Collection();
botclient.player = new Player(botclient, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

botclient.player.on("error", (queue, error) => {
  console.error(`Error in queue "${queue.guild.name}":`, error);
  // Vous pouvez ajouter ici du code pour gérer les erreurs liées à la file d'attente
});

botclient.player.on("connectionError", (queue, error) => {
  console.error(`Connection error in queue "${queue.guild.name}":`, error);
  // Vous pouvez ajouter ici du code pour gérer les erreurs de connexion
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
  const rest = new REST({ version: "9" }).setToken(TOKEN);
  console.log("Commandes slash déployé");
  rest
    .put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    })
    .then(() => {
      console.log("Chargement terminé.");
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
    botclient.user.setPresence({
      activities: [{ name: `Shiru si tu lis ça, tu pues`, type: ActivityType.Custom }],
      status: 'dnd',
    });
    console.log(`${botclient.user.tag} en ligne !`);
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

  botclient.login(TOKEN); //bot Token
}

