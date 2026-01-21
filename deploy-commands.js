const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config(); // ensures TOKEN is read from environment

const commands = [
  new SlashCommandBuilder()
    .setName('cost')
    .setDescription('Calculate cost of items including shipping')
    .addIntegerOption(option =>
      option.setName('quantity')
        .setDescription('Number of items')
        .setRequired(true))
    .addNumberOption(option =>
      option.setName('baseprice')
        .setDescription('Price of one item in £')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('country')
        .setDescription('Select the country')
        .setRequired(true)
        .addChoices(
          { name: 'UK', value: 'UK' },
          { name: 'Other', value: 'Other' }
        ))
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.MTQ2MzYzMTc2NTk4NDc3MjI1MA.GudD-M.o4pkedNmZBuW8FPN0v9X8jGEXYGjVfu6vsL650);

(async () => {
  try {
    console.log('Registering slash commands...');
    await rest.put(
      Routes.applicationCommands('1463631765984772250'), // Replace with your bot's Client ID
      { body: commands }
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();
