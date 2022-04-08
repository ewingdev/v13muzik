module.exports = async (client, node, error) => {

	client.logger.log(`Node "${node.options.identifier}" beklenmedik hata aldım: ${error.message}.`, "error");

}