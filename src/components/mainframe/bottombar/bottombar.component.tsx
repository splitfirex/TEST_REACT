import * as React from "react";
import "./bottombar.css"
import {Label} from "office-ui-fabric-react";
import * as ls from "local-storage";
import {ISessionContext} from "../../../core/context/session.context";

const BottombarComponent: React.FC = () => {

    const [session, setSession] = React.useState<ISessionContext>(() => {
        return ls.get<ISessionContext>("session");
    });

    return <div className="bottombarWrapper">
        <div className="bottombar">
            <Label>{session.attributes.nombreUsuario} ({session.attributes.idUsuario})</Label>
        </div>
    </div>

}

export default BottombarComponent;