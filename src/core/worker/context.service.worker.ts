import {MetaappContext} from "../core/context/MetaappContext";
import sessionContext from "../core/context/sessionContext.service";
import worldContext from "../core/context/worldContext.service";

const ctx: any = self as any;

'use strict'

const context: MetaappContext = {};
const connections: any = [];

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    connections.push(port);

    port.onmessage = (evt: MessageEvent) => {
        sessionContext.call(ctx, notify, context, evt.data);
        worldContext.call(ctx, notify, context, evt.data);
    }
}

function notify(data: any) {
    connections.forEach(function (connection: any) {
        connection.postMessage(data);
    });
}

export default null as any;