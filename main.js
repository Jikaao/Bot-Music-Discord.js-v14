//module-loading
const { Client, Collection, Events, REST, Routes } = require("discord.js");
const { Player } = require("discord-player");
const { readdirSync } = require("fs");
const glob = require("glob");
require("dotenv").config();

//create-client
const client = new Client({ intents: 3276799 });
client.developper = process.env.clientid;
client.panels = new Map();
client.checked = require("./utils/checked");
client.say = require("./utils/say");

//set-slashCommands
const rest = new REST({ version: "10" }).setToken(process.env.token);
const commandsFiles = readdirSync("./commands/slash").filter((f) =>
  f.endsWith(".js")
);
const commands = [];
for (const file of commandsFiles) {
  const command = require(`./commands/slash/${file}`);
  commands.push(command.data.toJSON());
}
(async () => {
  await rest.put(
    Routes.applicationCommands(process.env.clientid, "1058818532982407169"),
    { body: commands }
  );
  console.log("Commandes déployées avec succès.");
})();

//player-setting
const player = Player.singleton(client);
player.extractors.loadDefault();

//client&player/event-loading
const eventFiles = glob.sync("./events/**/*.js");
for (const file of eventFiles) {
  const event = require(`./${file}`);
  const [folder, type, eventname] = file.split("\\");
  if (type === "bot") {
    client.on(eventname.split(".")[0], event.bind(null, client));
  } else if (type == "player") {
    player.events.on(eventname.split(".")[0], event.bind(null, client));
  }
}

//login-discordbot
client.login(process.env.token);
