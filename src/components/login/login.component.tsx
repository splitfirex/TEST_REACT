import * as React from "react";
import {useEffect} from "react";
import {Label, PrimaryButton, Spinner, TextField} from "office-ui-fabric-react";
import {IStackProps, Stack} from 'office-ui-fabric-react/lib/Stack';
import {Redirect} from "react-router";
import LoginController from "./login.controller"

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
    const [usertoken, setUsertoken] = React.useState<string>("");
    const [loginTrying, setLoginTrying] = React.useState<boolean>(false);
    const [hasError, setHasError] = React.useState<string>("");

    useEffect(() => {
        if(LoginController.init()){
            setLogged(true);
        };
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
            LoginController.tryLogin(tryLogin.username.value, tryLogin.password.value)
                .then(() => setLogged(true))
                .catch((e: any) => {
                    setHasError(e);
                    setLoginTrying(false);
                });
        }
    }
    const columnProps: Partial<IStackProps> = {
        tokens: {childrenGap: 15},
        styles: {root: {width: 300}}
    };

    return (
        <div className="loginWrapper">
            {logged && <Redirect push to={"/mainframe?usertoken=" + usertoken}/>}
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
                            {loginTrying && !hasError && <div>
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