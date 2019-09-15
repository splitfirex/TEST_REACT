import * as React from "react";
import {useEffect} from "react";
import {Label, PrimaryButton, Spinner, TextField} from "office-ui-fabric-react";
import {IStackProps, Stack} from 'office-ui-fabric-react/lib/Stack';
import {Redirect} from "react-router";
import {MainService} from "../../core/worker/workers";
import {C_SESSION} from "../../core/context/sessionContext.service";
import {ERROR, SUCCESS} from "../../core/context/constants";
import {compare} from "../../core/utils/ObjectUtils"

import "./login.css";


interface IUser {
    username: { value: string, error?: string },
    password: { value: string, error?: string }
}

const LoginComponent: React.FC = () => {
    const [tryLogin, setTryLogin] = React.useState<IUser>({
        username: {value: "", error: ""},
        password: {value: "", error: ""}
    })
    const [logged, setLogged] = React.useState<boolean>(false);
    const [loginTrying, setLoginTrying] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<string>("");

    useEffect(() => {
        MainService.port.addEventListener("message", function (evt: MessageEvent) {
            console.log("pase");
            if (compare(evt.data.c, C_SESSION.TRY_LOGIN)) {
                if (evt.data.status === SUCCESS)
                    setLogged(true);
                if (evt.data.status === ERROR) {
                    setLoginTrying(false);
                    setHasError(evt.data.payload);

                }
            }
        }, false);
    }, []);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        let tLog = true;
        setHasError("");
        if (tryLogin.password.value.trim() === "") {
            setTryLogin({...tryLogin, password: {value: "", error: "Debe incluir la contraseña"}})
            tLog = false;
        }
        if (tryLogin.username.value.trim() === "") {
            setTryLogin({
                ...tryLogin,
                username: {value: tryLogin.username.value, error: "Debe incluir el nombre de usuario"}
            })
            tLog = false;
        }

        if (tLog) {
            setLoginTrying(true);
            let sessionData = {
                username: tryLogin.username.value,
                password: tryLogin.password.value
            }
            MainService.port.postMessage({
                c: C_SESSION.TRY_LOGIN, payload: sessionData
            })
        }
    }
    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
        styles: {root: {width: 300}}
    };

    return (
        <div className="loginWrapper">
            {logged && <Redirect push to="/mainframe"/>}
            <div className="login">
                <Stack horizontal tokens={{childrenGap: 50}} styles={{root: {padding: 20}}}>
                    <form onSubmit={e => handleSubmit(e)}>
                        <Stack {...columnProps}>

                            <TextField label="Usuario" value={tryLogin!.username.value}
                                       errorMessage={tryLogin!.username.error}
                                       onChange={e => setTryLogin({
                                           ...tryLogin!,
                                           username: {value: e.currentTarget.value}
                                       })}/>
                            <TextField type='password' label="Contraseña" value={tryLogin!.password.value}
                                       errorMessage={tryLogin!.password.error}
                                       onChange={e => setTryLogin({
                                           ...tryLogin!,
                                           password: {value: e.currentTarget.value}
                                       })}/>
                            {!loginTrying &&
                            <PrimaryButton type="submit" text="Iniciar sesion" allowDisabledFocus
                                           onClick={e => handleSubmit(e)}/>}
                            {loginTrying && <div>
                                <Spinner label="Iniciando sesion..."/>
                            </div>}
                            {hasError && <Label style={{color: "red", textAlign: "center"}}>{hasError}</Label>}

                        </Stack>
                    </form>
                </Stack>
            </div>
        </div>
    );
}

export default LoginComponent;