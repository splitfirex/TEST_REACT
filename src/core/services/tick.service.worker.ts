const ctx: any = self as any;

let counter = 0;
let started = false;

let connections: any = [];

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    connections.push(port);


    console.log("shared ok");
    if (!started) {
        setInterval(function () {
            send(counter++)
        }, 3000);
        started = true;
    }
}

function send(data: any) {
    connections.forEach(function (connection: any) {
        connection.postMessage(data);
    });
}

export default null as any;