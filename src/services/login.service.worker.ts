const soap = require("soap");
import {ILoginInput, ILoginOutput, IservicioLoginPortSoap} from "../wsdl/SCGALoginServiceService/servicioLoginPort";

const url = 'http://localhost:9080/sct/loginWS?wsdl';
const soapClient = soap.createClientAsync(url);

const ctx: Worker = self as any;

ctx.onmessage = (ev: MessageEvent) => {
    if (ev.data.method = "Login")
        Login(ev.data.method, ev.data.payload);
}

function Login(method: string, args: ILoginInput) {
    soapClient.then((client: IservicioLoginPortSoap) => {
        return client.Login(args, (err: any, result: ILoginOutput) => {
            if (err != null)
                ctx.postMessage({method: method, payload: {error: "Error iniciando sesion"}})
            else
                ctx.postMessage({method: method, payload: {result: result}})

        });
    });
}

export default null as any;