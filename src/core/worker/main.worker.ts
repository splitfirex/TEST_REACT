import {MetaappContext} from "../context/metaapp.context";
import SessionContext from "../context/session.context";
import worldContext from "../context/world.context.service";

const ctx: any = self as any;

'use strict'

const context: MetaappContext = {};
const connections: any = [];

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    connections.push(port);

    port.onmessage = (evt: MessageEvent) => {
        SessionContext.process( notify, context, evt.data);
        worldContext.call(ctx, notify, context, evt.data);
    }
}

function notify(data: any) {
    console.log(connections);
    connections.forEach(function (connection: any) {
        connection.postMessage(data);
    });
}

export default null as any;