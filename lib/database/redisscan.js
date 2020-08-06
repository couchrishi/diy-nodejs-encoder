

var redis = require('redis');
client = redis.createClient();
var flat = require('flat');


client.on("error", function (err) {
    console.log("Error " + err);
});
 
client.set("string key", "string val", redis.print);


details1 = {"location":"loc1", "source": "src1"}
details2 = {"location":"loc2", "source": "src2"}


/** 
client.hset("status", "videoId1", JSON.stringify({"location":"loc1", "source": "src2"}), redis.print);
client.hset("status", "videoId2", JSON.stringify({"location":"loc2", "source": "src2"}), redis.print);
client.hset("status", "videoId3", JSON.stringify({"location":"loc2", "source": "src2"}), redis.print);
*/

//client.hset("status", "videoId1", JSON.stringify(details1), redis.print);
//client.hset("status", "videoId2", JSON.stringify(details2), redis.print);

/**
client.hgetall("progress", function(err, object) {
    console.log(object);
});

*/
/**
client.hkeys("status", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);

    });
    client.quit(); 
    

});*/
