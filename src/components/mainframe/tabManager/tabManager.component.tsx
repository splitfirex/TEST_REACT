import * as React from "react";
import {useEffect} from "react";
import Videografico from "../../../svg/EST05E.svg"
import ReactSVG from 'react-svg'


const TabManagerComponent: React.FC = () => {

    useEffect(() => {
        console.log("PASE");
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        })
        document.body.onmousedown = function (e) {
            console.log("PASSEE");
            e.preventDefault();
            e.stopPropagation();
            if (e && (e.which === 2 || e.button === 4)) {
                console.log(e)
            }
        }
    })

    return <div>

        <ReactSVG src={Videografico}/>

    </div>
}

export default TabManagerComponent;