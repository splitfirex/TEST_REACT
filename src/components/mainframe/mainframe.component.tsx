import * as React from "react";
import {useEffect, useState} from "react";
import {Redirect} from 'react-router';
import {TopbarContainer} from "./topbar/topbar.container";
import {TabManagerContainer} from "./tabManager/tabManager.container";
import "./mainframe.css"
import uuid from "uuid";
import {ISessionContext} from "../../core/context/session.context";
import {BottombarContainer} from "./bottombar/bottombar.container";
import * as ls from "local-storage";

export interface MainframeComponentProps {
    u_token: string,
    w_token: string
}

export interface WindowDom {
    [key: string]: {
        available: [string],
        loaded: []
    }
}

const MainframeComponent: React.FC = () => {
    const [contextId, setContextId] = useState(() => {
        let w_uuid = uuid.v4();
        let context: WindowDom = ls.get<WindowDom>("windows");
        if (!context) context = {};
        context[w_uuid] = {available: ["_apps"], loaded: []}
        ls.set<WindowDom>("windows", context);
        return w_uuid;
    });
    const [session, setSession] = React.useState<ISessionContext>(() => {
        console.log(contextId);
        return ls.get<ISessionContext>("session")
    });

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            let context: WindowDom = ls.get<WindowDom>("windows");
            if (!context) context = {};
            delete context[contextId];
            ls.set<WindowDom>("windows", context);
        });
    })

    return (
        <>
            {!session && < Redirect push to="/login"/>}
            {session && <div className="mainframeWrapper">
                <div className="mainframe">
                    <TopbarContainer/>
                    <TabManagerContainer/>
                    <BottombarContainer/>
                </div>
            </div>}
        </>);

}

export default MainframeComponent;