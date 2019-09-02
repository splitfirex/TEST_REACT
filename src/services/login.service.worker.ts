const soap = require("soap");
import {ILoginInput, ILoginOutput, IservicioLoginPortSoap} from "../wsdl/SCGALoginServiceService/servicioLoginPort";

const url = 'http://localhost:9080/sct/loginWS?wsdl';
const soapClient = soap.createClientAsync(url);

const ctx: any = self as any;

ctx.onconnect = (ev: MessageEvent) => {
    let port = ev.ports[0];
    console.log("shared ok");
    port.onmessage = (ev: MessageEvent) => {
        console.log("mensaje ok");
        if (ev.data.method = "Login")
            Login(port, ev.data.method, ev.data.payload);
    }
}

function Login(port: any, method: string, args: ILoginInput) {
    soapClient.then((client: IservicioLoginPortSoap) => {
        return client.Login(args, (err: any, result: ILoginOutput) => {
            if (err != null)
                port.postMessage({method: method, payload: {error: "Error iniciando sesion"}})
            else
                port.postMessage({method: method, payload: {result: result}})
        });
    });
}

export default null as any;