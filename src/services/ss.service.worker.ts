import {Client} from '@stomp/stompjs';
// @ts-ignore
import svgFactory from "./core/sstypes/svgFactory.tsx";
import svgObject from "./core/sstypes/svgObject";
import fastXML from "fast-xml-parser";

const ctx: any = self as any;

'use strict'

let SubsystemContext: any = {};
let Subsystem: Map<string, svgObject> = new Map();
let workers: any = {};

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];

    port.onmessage = (evt: MessageEvent) => {
        if (evt.data.method = "addService") {
            workers[evt.data.payload.service] = evt.ports[0];
            workers.EjercicioService.onmessage = worldXML;
            workers.EjercicioService.postMessage({method: "getXMLMundo", payload: {}});
        }
    }

    const worldXML = (evt: MessageEvent) => {
        var options = {
            attributeNamePrefix : "@_",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "#text",
            ignoreAttributes : true,
            ignoreNameSpace : false,
            allowBooleanAttributes : false,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            localeRange: "", //To support non english character in tag/attribute values.
            parseTrueNumberOnly: false
        };
        let xml = fastXML.parse(evt.data.payload!.result,options);
        console.log(xml);
    }

    const client = new Client({
        brokerURL: "ws://localhost:8743/websocket-test/websocket",
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000
    });

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
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
    };

    client.activate();


}


export default null as any;