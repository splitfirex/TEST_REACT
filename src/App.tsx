import React from 'react';
import './App.css';
import {initializeIcons} from '@uifabric/icons';
import {loadTheme} from 'office-ui-fabric-react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import {LoginContainer} from "./components/login/login.container";
import {MainframeContainer} from "./components/mainframe/mainframe.container";
import {ContextSelectorContainer} from "./components/mainframe/contextSelector/contextSelector.container";

loadTheme({
    palette: {
        themePrimary: '#245424',
        themeLighterAlt: '#f2f8f2',
        themeLighter: '#cfe4cf',
        themeLight: '#a9cca9',
        themeTertiary: '#649964',
        themeSecondary: '#346934',
        themeDarkAlt: '#204c20',
        themeDark: '#1b401b',
        themeDarker: '#142f14',
        neutralLighterAlt: '#f8f8f8',
        neutralLighter: '#f4f4f4',
        neutralLight: '#eaeaea',
        neutralQuaternaryAlt: '#dadada',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c8c8',
        neutralTertiary: '#bab8b7',
        neutralSecondary: '#a3a2a0',
        neutralPrimaryAlt: '#8d8b8a',
        neutralPrimary: '#323130',
        neutralDark: '#605e5d',
        black: '#494847',
        white: '#ffffff',
    }
});

initializeIcons();

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Route exact path="/" component={LoginContainer}/>
                <Route exact path="/mainframe" component={MainframeContainer}/>
                <Route exact path="/contextSelector" component={ContextSelectorContainer}/>
            </div>
        </Router>
    );
}

export default App;
