// index.js
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config(); // read TOKEN from environment
const express = require('express');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Keep-alive server for Render
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(3000, () => console.log('Keep-alive server running on port 3000'));

// Handle interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'cost') {
    const qty = interaction.options.getInteger('quantity');
    const basePrice = interaction.options.getNumber('baseprice');
    const country = interaction.options.getString('country');

    if (qty == null || basePrice == null || country == null) {
      return interaction.reply({
        content: "❌ Please make sure you enter quantity, base price, and country.",
        ephemeral: true
      });
    }

    const items = basePrice * qty;

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

// Log in using environment variable
client.login(process.env.TOKEN);
