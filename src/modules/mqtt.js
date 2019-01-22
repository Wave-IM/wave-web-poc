import mqtt from 'mqtt';

export function connect() {


// var wsoptions =
// {
//     host: "127.0.0.1",
//     port: 9001,
//     protocol: 'mqttv3.1',
//     protocolVersion: 13,
//     perMessageDeflate: true,
//     client_max_window_bits: true
// }

var options =
{
    // wsOptions: wsoptions,
    clientId: "1fa63f2f-0e2a-4d14-ab1b-2d3d020aa1d2", 
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    protocol: 'ws',
    hostname: "127.0.0.1",
    port: 9001,
    path: "/mqtt"
}


    const client  = mqtt.connect(options)
      
  client.on('connect', function () {

    console.log("success")
    // client.subscribe('blabla', function (err) {
    //     if (!err) {xx
    //       client.publish('blabla', 'Hello mqtt')
    //     }
    // })
  })

//   client.on('message', function (topic, message) {
//     // message is Buffer
//     console.log(topic)
//     console.log(message.toString())
//     client.end()
//   })

}
export function format(input) {
  

    //convert input to output
    console.log("hekki")
}
