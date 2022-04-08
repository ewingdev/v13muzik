const { prefix } = require("../../config.js");

module.exports ={
name: "ready",
run: async (client) => {
    client.manager.init(client.user.id);
    client.logger.log(`${client.user.username} giriş yapıldı!`, "ready");
    client.logger.log(`Hazırım ${client.guilds.cache.size} sunucu, ve ${client.users.cache.size} üyeye hizmet veriyorum.`, "ready");

    //Game
    let statuses = ['/yardım | ewing.ga', `Prefixim ${prefix}`];
    setInterval(function() {
  		let status = statuses[Math.floor(Math.random()*statuses.length)];
  		client.user.setActivity(status, {type: "PLAYING"});
  	}, 10000)
 }
}
