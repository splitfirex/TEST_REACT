const soap = require("soap");

const url = 'http://localhost:9080/sct/ejerciciosWS?WSDL';
const soapClient = soap.createClientAsync(url);

const ctx: any = self as any;

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    port.onmessage = (ev: MessageEvent) => {
        console.log("ejercicio_worker ok");
        if (ev.data.method = "getXMLMundo")
            getXMLMundo(port, ev.data.method, ev.data.payload);
    }
}

function getXMLMundo(port: any, method: string, args: any) {
    soapClient.then((client: any) => {
        return client.getXMLMundo(args, (err: any, result: any, rawResponse: any, soapHeader: any, rawRequest: any) => {
            var match = rawResponse.replace(/<!--[\s\S]*?-->/, '').match(/<Mundo>.*<\/Mundo>/i);
            if (match)
                port.postMessage({method: method, payload: {result: match[0]}});
        }, {forceMTOM: true});
    });
}

export default null as any;