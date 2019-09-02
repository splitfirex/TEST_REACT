const ctx: any = self as any;

let counter = 0;

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];


    console.log("shared ok");
    setInterval(function(){ port.postMessage(counter++) }, 3000);
}


export default null as any;