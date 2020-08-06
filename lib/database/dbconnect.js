
var redis = require("redis");
const dbconnect = {};

dbconnect.createConn = function createConn () {
    var redis = require("redis");
    var client = redis.createClient({
        port        : process.env.REDISPORT ,               // replace with your port
        host        : process.env.REDISHOST ,        // replace with your hostanme or IP address
    }
    );

    client.on("connect", function() {
        console.log("Redis Connection Successful");
      });
    return(client);
};

module.exports = dbconnect;