import * as React from "react";
import {useEffect} from "react";
import {getLibMundo, getSVGMundo, getXMLMundo} from "../../../core/services/ejercicio.service";
import "./tabManager.css"
import {Spinner, SpinnerSize} from "office-ui-fabric-react";


const TabManagerComponent: React.FC = () => {

    let [htmlWorld, setHtmlWorld] = React.useState<any>();

    useEffect(() => {
        console.log("PASE");
        window.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        })
        document.getElementById("svgLocation")!.onmousedown = function (e: any) {
            e.preventDefault();
            e.stopPropagation();
            if (e && (e.which === 2 || e.button === 4)) {
                console.log("middleClick")
            }
            console.log(e.target!.getAttribute("tipoelemento"))
        }


        Promise.all([getXMLMundo({}), getSVGMundo({
            arg0: {
                CP: true,
                nombreFichero: "EST08C.svg"
            }
        }), getLibMundo(true)])
            .then((result: any) => {
                    let ssvg = document.createRange().createContextualFragment(result[1])
                    ssvg.firstElementChild!.insertAdjacentHTML('afterbegin', result[2]);
                    setHtmlWorld(ssvg.firstElementChild!.outerHTML);
                }
            )


    }, [])

    return <div className="tabManagerWrapper">
        <div className="tabManager ">
            <div key="svgLocation" id="svgLocation" className="container--ph"
                 dangerouslySetInnerHTML={{__html: htmlWorld}}/>
            {!htmlWorld &&  <div>
                <Spinner size={SpinnerSize.large} label="Cargando mundo virtual..."/>
            </div>}
        </div>
    </div>
}

export default TabManagerComponent;