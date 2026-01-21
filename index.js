const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");

const app = express();
app.get("/", (req, res) => res.send("Bot is awake"));
app.listen(3000, () => console.log("Keep-alive server running"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => console.log("Bot online"));

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "cost") {
    const qty = interaction.options.getInteger("quantity");
    const base = interaction.options.getNumber("baseprice");
    const country = interaction.options.getString("country");

    // If user forgot an input, guide them
    if (!qty) return interaction.reply("❌ Please enter the **quantity** next time.");
    if (!base) return interaction.reply("❌ Please enter the **base price** next time.");
    if (!country) return interaction.reply("❌ Please select the **country** next time.");

    // Calculate items
    const items = qty * base;

    // Calculate shipping
    let shipping;
    if (country === "UK") shipping = (5 * qty) + 7;
    else shipping = (7.5 * qty) + 12;

    // Bulk discount if quantity > 5
    if (qty > 5) shipping *= 0.8;

    const total = items + shipping;

    await interaction.reply({
      content: `🧾 **Cost Breakdown**\n
- Items: £${items.toFixed(2)}
- Shipping: £${shipping.toFixed(2)}
- Total: £${total.toFixed(2)}

💡 Next time, just enter your quantity, base price, and select the country in the command options.`,
      ephemeral: false
    });
  }
});

client.login(process.env.MTQ2MzYzMTc2NTk4NDc3MjI1MA.G6dCpS.Gdg21Fo0elwstbH0kX8Pth_yQbAsV9hd8sEkGc);
