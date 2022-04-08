module.exports = {
  name: "shardResume",
  run: async (client, id, replayedEvents) => {
  client.logger.log(`Shard #${id} Durduruldu`, "log");
  }
};
