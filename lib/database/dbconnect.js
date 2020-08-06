
var redis = require("redis");
const dbconnect = {};

dbconnect.createConn = function createConn () {
    var redis = require("redis");
    var client = redis.createClient({
        port        : process.env.REDISPORT ,               // replace with your port
        //port        : 6379,
        host      : process.env.REDISHOST ,        // replace with your hostanme or IP address
        //host        : '35.232.62.228'
    }
    );

    client.on("connect", function() {
        console.log("Redis Connection Successful");
      });
    return(client);
};

module.exports = dbconnect;