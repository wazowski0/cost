client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "cost") return;

  const quantity = interaction.options.getInteger("quantity");
  const basePrice = interaction.options.getNumber("baseprice");
  const country = interaction.options.getString("country");

  // Item cost
  const itemsTotal = quantity * basePrice;

  // Shipping
  let shipping;
  if (country === "UK") {
    shipping = (5 * quantity) + 7;
  } else {
    shipping = (7.5 * quantity) + 12;
  }

  // Bulk discount
  if (quantity > 5) {
    shipping *= 0.8; // 20% off shipping
  }

  const total = itemsTotal + shipping;

  await interaction.reply({
    content:
      `🧾 **Cost Breakdown**\n` +
      `Items: £${itemsTotal.toFixed(2)}\n` +
      `Shipping: £${shipping.toFixed(2)}${quantity > 5 ? " (20% bulk discount applied)" : ""}\n` +
      `**Total: £${total.toFixed(2)}**`
  });
});
