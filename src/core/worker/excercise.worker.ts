const ctx: any = self as any;

'use strict'

const connections: any = [];


ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    connections.push(port);

    port.onmessage = (evt: MessageEvent) => {
        console.log(evt);
    }
}

function notify(data: any) {
    console.log(connections);
    connections.forEach(function (connection: any) {
        connection.postMessage(data);
    });
}

export default null as any;