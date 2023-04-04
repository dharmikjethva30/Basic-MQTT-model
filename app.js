const mqtt = require('mqtt')
const dotenv = require('dotenv')

dotenv.config()


const options = {
    host: 'e0ca6ad287cf4ed4b9a511c1ce822c58.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'dharmikjethva30',
    password: '123456789'
}

const client = mqtt.connect(options)

// Publish variables
let pub_topic = 'ys/pub';
let message = 'Greetings from Dharmik';
let pub_options = {qos: 0, retain: false};


// Subscribe variables
let sub_topic = 'ys/pub';
let sub_options = {qos: 0};


// Publish
client.on('connect', async function () {
    console.log('Connection successful');
    client.subscribe(sub_topic, sub_options, function (err) {
        if (err) {
            console.log("An error occurred while subscribing")
        } else {
            console.log("Subscribed successfully to " + sub_topic.toString())
        }
    });

    while (client.connected) {
        client.publish(pub_topic, message, pub_options, function (err) {
            if (err) {
                console.log("An error occurred during publish")
            } else {
                console.log("Published successfully to " + pub_topic.toString())
            }
        });

        // Delay of 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
})

// Handle errors
client.on("error", function (error) {
    console.log("Error occurred: " + error);
});

// Notify reconnection
client.on("reconnect", function () {
    console.log("Reconnection starting");
});

// Notify offline status
client.on("offline", function () {
    console.log("Currently offline. Please check internet!");
});