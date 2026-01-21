const { REST, Routes, SlashCommandBuilder } = require('discord.js');

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
].map(command => command.toJSON());

// Use TOKEN from environment variable
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');
    // Replace with your bot’s client ID
    await rest.put(
      Routes.applicationCommands('1463631765984772250'),
      { body: commands },
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();
