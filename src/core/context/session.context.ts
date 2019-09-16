import {MetaappContext} from "./metaapp.context";
import LoginSvc from "../services/login.service";
import {ERROR, SUCCESS} from "./constants";

export interface ISessionContext {
    attributes: any,
    rolesUsuario: any
}

const _CONTEXT: string = "C_SESSION";
export const C_SESSION = {
    INIT_INSTANCE:
        {method: "initializeInstance", context: _CONTEXT},
    GET:
        {method: "getContext", context: _CONTEXT},
    UPDATE_TABS:
        {method: "updateWindowsState", context: _CONTEXT},
    TRY_LOGIN:
        {method: "tryLogin", context: _CONTEXT}
}

class _SessionContext {

    private static instance: _SessionContext;

    public static getInstance(): _SessionContext {
        if (_SessionContext.instance === null) _SessionContext.instance = new _SessionContext();
        return _SessionContext.instance;
    }


    public process(_notify: Function, _metaContext: MetaappContext, data: any) {
        if (data.c.context !== _CONTEXT) return;
        eval("this." + data.c.method)(_notify, _metaContext, data);

    }


    private getContext(_notify: Function, _metaContext: MetaappContext, data: any) {
        _notify({c: C_SESSION.GET, status: SUCCESS, payload: _metaContext.session});
    }

    private tryLogin(_notify: Function, _metaContext: MetaappContext, data: any) {
        LoginSvc().Login({
            nombreUsuario: data.payload.username,
            contrasenha: data.payload.password,
            idSalaFormacion: 1,
            nombrePuesto: "1234"
        }).then((result: any) => {
            console.log("tryLogin: OK");

            _notify({c: C_SESSION.TRY_LOGIN, status: SUCCESS, payload: _metaContext.session});
        }).catch((err: any) => {
            console.log("tryLogin: KO");
            let mensajeError = "No es posible contactar con el servidor, contacte con su administrador";
            if (err!.response!.statusCode === 500)
                mensajeError = "Usuario y/ contraseña incorrectos";

            _notify({c: C_SESSION.TRY_LOGIN, status: ERROR, payload: mensajeError});
        });
    }

    private updateWindowsState(_notify: Function, _metaContext: MetaappContext, data: any) {

    }

}

const SessionContext = new _SessionContext();

export default SessionContext;



