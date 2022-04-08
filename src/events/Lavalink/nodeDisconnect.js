module.exports = async (client, node, reason) => {

	client.logger.log(`Node "${node.options.identifier}" bağlantısı kesildi. Sebebi: ${reason}.`, "warn");

}