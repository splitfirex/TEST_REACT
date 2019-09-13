import {ILoginInput} from "../../wsdl/SCGALoginServiceService/servicioLoginPort";

const soap = require("soap");

const url = 'http://localhost:9080/sct/loginWS?wsdl';
const soapClient = soap.createClientAsync(url);

export function Login(args: ILoginInput) {
    return soapClient.then((client: any) => {
        return client.LoginAsync(args);
    });
}