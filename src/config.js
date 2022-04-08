require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "OTEwOTkwMTk3Mjg0NTY5MDg4.YZa3vA.bsbfzJsFhl5dwMMHInb8MiTiik8",  // your bot token
    prefix: process.env.PREFIX || "!", // bot prefix
    ownerID: process.env.OWNERID || "774591026940739585", //your discord id
    mongourl: process.env.MONGO_URI || "mongodb+srv://rootdatabase:Wz8pOCzQZfadf3Qa@cluster0.j6m1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", // MongoDb URL
    embedColor: process.env.COlOR || "#660099", // embed colour
    logs: process.env.LOGS || "934389431476047912", // channel id for guild create and delete logs

    nodes: [
    {
      host: process.env.NODE_HOST || "disbotlistlavalink.ml",
      identifer: process.env.NODE_ID || "local",
      port: parseInt(process.env.NODE_PORT || "443"),
      password: process.env.NODE_PASSWORD || "LAVA",
      secure: parseBoolean(process.env.NODE_SECURE || "true"),

    }
  ],

}

function parseBoolean(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}
