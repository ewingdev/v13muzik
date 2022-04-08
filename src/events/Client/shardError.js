module.exports = {
  name: "shardError",
  run: async (client, error, id) => {
  client.logger.log(`Shard #${id} Hata aldı`, "error");
  }
};