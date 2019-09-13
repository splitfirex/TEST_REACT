import * as React from "react";
import "./topbar.css";
import {IconButton} from "office-ui-fabric-react";
import {FontSizes} from "@uifabric/fluent-theme";

interface Props {
}

interface State {
    isOpen?: boolean;
    displayClock: boolean;
    clock: { hour: string; date: string };
    playerControl: { pause: boolean };
    exercisePanel?: { title?: string, progress: number }
}

export default class TopbarComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            displayClock: true,
            isOpen: true,
            playerControl: {pause: false},
            clock: {hour: "12:02:01", date: "12/09/2020"}
        };
    }

    _styleClass() {
        return "topbarWrapper " + (!this.state.isOpen && "collapsed");
    }

    _toggleIcon() {
        return !this.state.isOpen ? "DoubleChevronDown" : "DoubleChevronUp";
    }

    handleClick() {


        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div className={this._styleClass()}>
                <div className="topbar">
                    {this.state.displayClock && <PlayerControl {...this.state.playerControl} />}
                    {this.state.displayClock && <ExercisePanel {...this.state.exercisePanel} />}
                    {this.state.displayClock && <Clock {...this.state.clock} />}
                </div>
            </div>
        );
    }
}

class Clock extends React.Component<{ hour: string; date: string }, {}> {
    render() {
        return (
            <div className="clockWrapper">
                <div className="clock">
                    <div className="clockSeparation">
                        <div className="hour" style={{fontSize: FontSizes.size28}}>
                            {this.props.hour}
                        </div>
                    </div>
                    <div className="date" style={{fontSize: FontSizes.size10}}>
                        {this.props.date}
                    </div>
                </div>
            </div>
        );
    }
}

class ExercisePanel extends React.Component<{}, {}> {
    render() {
        return <div className="exercisePanelWrapper">
            <div className="exercisePanel">
            </div>
        </div>
    }
}


class PlayerControl extends React.Component<{ pause: boolean }, { pause: boolean }> {
    constructor(props: { pause: boolean }) {
        super(props);
        this.state = {
            pause: props.pause
        };
    }

    playClick() {
        // @ts-ignore
        document.getElementById("EST05E_CV1_1").setAttribute("xlink:href", "#seccionOcupada");
        this.setState({pause: !this.state.pause});
    }

    buttonName() {
        console.log(this.state.pause);
        return this.state.pause ? "Pause" : "Play";
    }

    render() {
        return (
            <div className="playerControlWrapper">
                <div className="playercontrol">
                    <IconButton
                        style={{border: "1px solid darkgrey"}}
                        iconProps={{
                            iconName: "Rewind",
                            styles: {
                                root: {
                                    fontSize: FontSizes.size12
                                }
                            }
                        }}
                    />
                    <IconButton
                        onClick={() => this.playClick()}
                        style={{
                            width: "50px",
                            height: "50px",
                            padding: "0px",
                            border: "1px solid darkgrey"
                        }}
                        iconProps={{
                            iconName: this.buttonName(),
                            styles: {
                                root: {
                                    fontSize: FontSizes.size24
                                }
                            }
                        }}
                    />
                    <IconButton
                        style={{border: "1px solid darkgrey"}}
                        iconProps={{
                            iconName: "FastForward",
                            styles: {
                                root: {
                                    fontSize: FontSizes.size12
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
}
