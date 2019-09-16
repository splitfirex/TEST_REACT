import * as React from "react";
import {Redirect} from 'react-router';
import {TopbarContainer} from "./topbar/topbar.container";
import {TabManagerContainer} from "./tabManager/tabManager.container";
import "./mainframe.css"
import { VideographicContainer } from './videographic/videographic.container';

interface Props {

}

interface State {
    logged: boolean
}

export default class TopbarComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            logged: true
        }
    }

    render() {
        if (!this.state.logged) {
            return <Redirect push to="/login"/>;
        }
        return <div className="mainframeWrapper">
            <div className="mainframe">
                <TopbarContainer/>
                <TabManagerContainer/>
            </div>
        </div>;
    }
}