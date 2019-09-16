import {Client} from "@stomp/stompjs";
import svgFactory from "../sstypes/svgFactory";
import svgObject from "../sstypes/svgObject";

const client = new Client({
    brokerURL: "ws://localhost:8743/websocket-test/websocket",
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
});

let SubsystemContext: any = {};
let Subsystem: Map<string, svgObject> = new Map();

client.onConnect = function (frame) {
    // Do something, all subscribes must be done is this callback
    // This is needed because this will be executed after a (re)connect
    client.subscribe('/listeners/receive/updates', function (message: any) {
        let parsedMessages = JSON.parse(message.body);
        Object.keys(parsedMessages).forEach(function (element) {
            let key = element.split("#SPLITTER#")[0];
            let attr = element.split("#SPLITTER#")[1];
            let value = parsedMessages[element].value;
            let clazz = parsedMessages[element].clase;
            if (SubsystemContext[key] === undefined) {
                SubsystemContext[key] = {[attr]: value, clazz: clazz}
                Subsystem.set(key, svgFactory(key, clazz));
                Subsystem.get(key)!.updateAttr(attr, value);
            } else {
                SubsystemContext[key][attr] = value;
                Subsystem.get(key)!.updateAttr(attr, value);
            }


        });
        console.log(parsedMessages);
    });
    client.subscribe('/listeners/receive/creates', function (message: any) {
        let parsedMessages = JSON.parse(message.body);
        Object.keys(parsedMessages).forEach(function (element) {
            let key = element.split("#SPLITTER#")[0];
            let attr = element.split("#SPLITTER#")[1];
            let value = parsedMessages[element].value;
            let clazz = parsedMessages[element].clase;
            if (SubsystemContext[key] === undefined) {
                SubsystemContext[key] = {[attr]: value, clazz: clazz}
                Subsystem.set(key, svgFactory(key, clazz));
                Subsystem.get(key)!.updateAttr(attr, value);
            } else {
                SubsystemContext[key][attr] = value;
                Subsystem.get(key)!.updateAttr(attr, value);
            }
        });
        console.log(parsedMessages);
    });

    client.publish({
        destination: "/app/connect", body: JSON.stringify({
            'uuid': "8dc53df5-703e-49b3-8670-b1c468f47f1f",
            'cClass': null,
            'content': 'da'
        })
    });
}


client.onStompError = function (frame) {
    console.log('Broker reported error: ' + frame.headers['message']);
    console.log('Additional details: ' + frame.body);
};

client.activate();