module.exports = {
  name: "shardDisconnect",
  run: async (client, event, id) => {
  client.logger.log(`Shard #${id} Bağlantı kesildi`, "warn");
  }
};
