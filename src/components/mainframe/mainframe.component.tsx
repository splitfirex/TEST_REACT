import * as React from "react";
import {Redirect} from 'react-router';
import {TopbarContainer} from "./topbar/topbar.container";

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
            return <Redirect push to="/" />;
        }
        return <TopbarContainer/>;
    }
}