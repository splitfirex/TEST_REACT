import * as ls from "local-storage";
import LoginSvc from "../../core/services/login.service";
import {ISessionContext} from "../../core/context/session.context";

class LoginController {

    public init() : ISessionContext | undefined{
        return ls.get<ISessionContext>("session");
    }

    public tryLogin( username: string, password: string) {
        return LoginSvc().Login({
            nombreUsuario: username,
            contrasenha: password,
            idSalaFormacion: 1,
            nombrePuesto: "1234"
        }).then((result: any) => {
            console.log("tryLogin: OK");
            ls.set("session", result[0].login);
            return true;
        }).catch((err: any) => {
            console.log("tryLogin: KO");
            let mensajeError = "No es posible contactar con el servidor, contacte con su administrador";
            if (err!.response!.statusCode === 500)
                mensajeError = "Usuario y/ contraseña incorrectos";
            throw mensajeError;
        });
    }

}

const controller = new LoginController();

export default controller;