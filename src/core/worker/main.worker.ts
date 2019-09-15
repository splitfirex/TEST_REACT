import {MetaappContext} from "../context/metaappContext";
import {SessionContextService} from "../context/sessionContext.service";
import worldContext from "../context/worldContext.service";

const ctx: any = self as any;

'use strict'

const context: MetaappContext = {};
const connections: any = [];

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    connections.push(port);

    port.onmessage = (evt: MessageEvent) => {
        SessionContextService.process.call(ctx, notify, context, evt.data);
        worldContext.call(ctx, notify, context, evt.data);
    }
}

function notify(data: any) {
    connections.forEach(function (connection: any) {
        connection.postMessage(data);
    });
}

export default null as any;