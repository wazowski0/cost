// Keep-alive server
const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.get("/", (req, res) => res.send("Bot is awake"));
app.listen(3000, () => console.log("Keep-alive server running"));

// Discord bot setup
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => console.log("Bot online"));

// Interaction (slash command) listener
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "cost") return;

  const qty = interaction.options.getInteger("quantity");
  const base = interaction.options.getNumber("baseprice");
  const country = interaction.options.getString("country");

  const items = qty * base;

  let shipping;
  if (country === "UK") shipping = (5 * qty) + 7;
  else shipping = (7.5 * qty) + 12;

  if (qty > 5) shipping *= 0.8;

  const total = items + shipping;

  await interaction.reply(
    `🧾 Cost Breakdown:\nItems: £${items.toFixed(2)}\nShipping: £${shipping.toFixed(2)}\nTotal: £${total.toFixed(2)}`
  );
});

// Login with your Discord bot token from environment variable
client.login(process.env.TOKEN);
