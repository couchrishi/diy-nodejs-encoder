
var redis = require("redis");
var client = redis.createClient({
    port      : 6379,               // replace with your port
    host      : '127.0.0.1',        // replace with your hostanme or IP address
}
);

videoID = 'abcd';

client.on("connect", function() {
    console.log("You are now connected");
  });


  //client.hmset("status", { source: "src1", preset: "h.264", create: new Date().toUTCString(), status: '0', displayStatus: 'completed', progress:'100%'});

  client.hgetall('*', function(err, object) {
    console.log(object);
  });

 client.keys(pattern='*',function(err, object) {
    console.log(object);
  });
