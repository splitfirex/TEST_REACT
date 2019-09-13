import {renderToString} from 'react-dom/server';
import svgObject from "./svgObject";
import svgSeccion from "./svgSeccion";
import Videografico from "../../../svg/EST05E.svg"
import ReactSVG from "react-svg";
import * as React from "react";

const svgFactory = (id: string, name: string) => {

    // @ts-ignore
    let SVGGeneral: string = renderToString(<ReactSVG src={Videografico}/>);

    switch (name) {
        case "Seccion":
            return new svgSeccion(id, SVGGeneral);
        default:
            return new svgObject(id, SVGGeneral);
    }
}

export default svgFactory