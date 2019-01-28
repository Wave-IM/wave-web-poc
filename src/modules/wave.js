import Paho from 'paho-mqtt'

export class WaveMQTTWrapper {

    constructor(connectionURL, clientID, topicsToSubscribe, onMessageArrivedCallback) {

        this.topicsToSubscribe = topicsToSubscribe
        this.client = new Paho.Client(connectionURL, clientID);
        this.onMessageArrivedCallback = onMessageArrivedCallback

        this.onConnect = this.onConnect.bind(this)
        this.onConnectionLost = this.onConnectionLost.bind(this)
        this.onMessageArrived = this.onMessageArrived.bind(this)
    }

    connect(username, password) {

        const options = {
            userName: username,
            password: password,
            onSuccess: this.onConnect,
            cleanSession: false,
            reconnect: true
        }

        try {
            this.client.connect(options);
        } catch (err) {
            console.log("An error occured : Failed to connect to broker")
            console.log(err)
        }

        this.client.onConnectionLost = this.onConnectionLost
        this.client.onMessageArrived = this.onMessageArrived
    }

    subscribe(topic) {
        try {
            this.client.subscribe(topic)
        } catch (err) {
            console.log("An error occured : Failed to subscribe to topic : " + topic)
            console.log(err)
        }
    }

    send(message, topic) {
        const messageObject = new Paho.Message(message);
        messageObject.destinationName = topic;
        messageObject.qos = 2

        try {
            this.client.send(messageObject);
        } catch (err) {
            console.log("An error occured : Failed to send message to topic : " + topic)
            console.log(err)
        }
    }

    onConnect() {
        console.log("Successfully connected as " + this.client.clientId + " !")
        this.topicsToSubscribe.forEach((topic) => {
            this.client.subscribe(topic, {qos: 2})
            console.log("Subscribed to topic : " + topic)
        })
    }

    onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("Lost Connection ! Error :" + responseObject.errorMessage);
        }
    }

    onMessageArrived(message) {
        console.log(message)
        this.onMessageArrivedCallback(message.payloadString, message.topic)
    }
}


export class WaveUtils {

    static getSenderIDFromTopic(topic) {
        return topic.split("/")[2]
    }

}