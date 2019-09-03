import * as React from "react";
import ReactSVG from "react-svg";
import Videografico from "../../svg/EST05E.svg";
import {renderToString} from "react-dom/server";


const WorkerSVG: React.FC = () => {

    const renderString = () => {
        return renderToString(<ReactSVG src={Videografico}/>)
    }

    return <div></div>
}