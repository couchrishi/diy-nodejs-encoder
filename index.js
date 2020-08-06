
const process = require('process');
const log = require('./lib/log');
const config = require('./lib/config');
const encoderEngine = require('./lib/encoderEngine');
const {PubSub} = require('@google-cloud/pubsub');

const app = {
  isEncoding: false,
};

app.init = function init() {
  log.info('Started Workflow Encoder, waiting for encoding requests');
  app.processEncodingTasks();
};

app.processEncodingTasks = function processEncodingTasks() {

    const pubSubClient = new PubSub();
    function listenForMessages() {
      const subscription = pubSubClient.subscription('node-encoder-sub');
      console.log(`Waiting for messages...`);
  
      let messageCount = 0;
      const messageHandler = message => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;
        encoderEngine.startEncoder(message.data, (startErr) => {
            console.log(startErr);
            });
        message.ack();
        };
  
      subscription.on('message', messageHandler);
  
    }
    listenForMessages();

}

// Execute the function
app.init();

module.exports = app;