require('dotenv').config();
const {PubSub} = require('@google-cloud/pubsub');


function main(subscriptionName = 'node-encoder-sub', timeout = 120) {
    // [START pubsub_subscriber_async_pull]
    // [START pubsub_quickstart_subscriber]
    /**
     * TODO(developer): Uncomment these variables before running the sample.
     */
    // const subscriptionName = 'YOUR_SUBSCRIPTION_NAME';
    // const timeout = 60;
  
    // Imports the Google Cloud client library
    const {PubSub} = require('@google-cloud/pubsub');
  
    // Creates a client; cache this for further use
    const pubSubClient = new PubSub();
  
    function listenForMessages() {
      // References an existing subscription
      const subscription = pubSubClient.subscription(subscriptionName);
      console.log(`Waiting for messages...`);
  
      // Create an event handler to handle messages
      let messageCount = 0;
      const messageHandler = message => {
        console.log(`Received message ${message.id}:`);
        console.log(`\tData: ${message.data}`);
        console.log(`\tAttributes: ${message.attributes}`);
        messageCount += 1;
  
        // "Ack" (acknowledge receipt of) the message
        message.ack();
      };
  
      // Listen for new messages until timeout is hit
      subscription.on('message', messageHandler);
  
      setTimeout(() => {
        subscription.removeListener('message', messageHandler);
        console.log(`${messageCount} message(s) received.`);
      }, timeout * 10000);
    }
  
    listenForMessages();
    // [END pubsub_subscriber_async_pull]
    // [END pubsub_quickstart_subscriber]
  }
  
  main();
