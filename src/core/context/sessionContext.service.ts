import {MetaappContext} from "./metaappContext";
import LoginSvc from "../services/login.service";
import {ERROR, SUCCESS} from "./constants";

export interface sessionContext {
    username: string,
    token: string,
    name: string,
    role: string
}

const _CONTEXT: string = "C_SESSION";
export const C_SESSION = {
    TRY_LOGIN:
        {method: "tryLogin", context: _CONTEXT}
}

export class SessionContextService{

    public static process(_notify: Function, _metaContext: MetaappContext, data: any) {
        if (data.c.context !== _CONTEXT) return;
        eval(data.c.method)(_notify, _metaContext, data);
    }

    private static tryLogin(_notify: Function, _metaContext: MetaappContext, data: any) {
        LoginSvc().Login({
            nombreUsuario: data.payload.username,
            contrasenha: data.payload.password,
            idSalaFormacion: 1,
            nombrePuesto: "1234"
        }).then((result: any) => {
            console.log("tryLogin: OK");
            _metaContext.session = {
                username: data.payload.username,
                token: "123344567",
                name: "Jorgito",
                role: result[0]
            }
            _notify({c: C_SESSION.TRY_LOGIN, status: SUCCESS, payload: _metaContext.session});
        }).catch((err: any) => {
            console.log("tryLogin: KO");
            let mensajeError = "No es posible contactar con el servidor, contacte con su administrador";
            if (err!.response!.statusCode === 500)
                mensajeError = "Usuario y/ contraseña incorrectos";
    
            _notify({c: C_SESSION.TRY_LOGIN, status: ERROR, payload: mensajeError});
        });
    }

}



