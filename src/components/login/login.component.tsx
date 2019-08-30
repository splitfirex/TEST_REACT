import * as React from "react";
import {PrimaryButton, Spinner, TextField} from "office-ui-fabric-react";
import {Stack, IStackProps} from 'office-ui-fabric-react/lib/Stack';
import {LoginService} from "../../services/workers";
import {ILoginInput} from "../../wsdl/SCGALoginServiceService/servicioLoginPort";
import {Redirect} from "react-router";
import {useEffect, useState} from "react";
import "./login.css";

const LoginComponent: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [loginTrying, setLoginTrying] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        LoginService.onmessage = (evt: any) => {
            if (evt.data.method == "Login") {
                if (evt.data.payload.error) {
                    setErrorMessage(evt.data.payload.error)
                } else if (evt.data.payload.result.login.rolesUsuario.length > 0) {
                    setLogged(true);
                }
            }
            setLoginTrying(false);
            console.log(evt);
        }
    });

    const handleSubmit = (evt: any) => {
        setLoginTrying(true);
        setErrorMessage(null);

        let args: ILoginInput = {
            nombreUsuario: username,
            contrasenha: password,
            idSalaFormacion: 1,
            nombrePuesto: "1234"
        }
        LoginService.postMessage({method: "Login", payload: args});
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
                    <Stack {...columnProps}>
                        <TextField label="Usuario" value={username}
                                   onChange={e => setUsername(e.currentTarget.value)}/>
                        <TextField type='password' label="Contraseña" value={password}
                                   onChange={e => setPassword(e.currentTarget.value)}/>
                        {!loginTrying &&
                        <PrimaryButton text="Iniciar sesion" allowDisabledFocus onClick={e => handleSubmit(e)}/>}
                        {loginTrying && <div>
                            <Spinner label="Iniciando sesion..."/>
                        </div>}
                        {errorMessage}
                    </Stack>
                </Stack>
            </div>
        </div>
    );
}

export default LoginComponent;
/*
export default class LoginComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            LoginService: LoginService,
            loginTrying: false,
            password: "",
            username: "",
            logged: false
        }
        this.state.LoginService.onmessage = this._messageFromService.bind(this);
    }

    _messageFromService(value: any) {
        console.log(value)
        if (value.data != {}) {
            this.setState({loginTrying: false, logged: true});
        } else {
            this.setState({loginTrying: false});
        }

    }

    _updateUsername(evt: any) {
        this.setState({
            username: evt.target.value
        });
    }

    _updatePassword(evt: any) {
        this.setState({
            password: evt.target.value
        });
    }


    render() {


        if (!this.state.logged) {
            return <Redirect push to="/"/>;
        }

        return
    }

}*/