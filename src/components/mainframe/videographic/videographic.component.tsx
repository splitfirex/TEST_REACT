import * as React from "react";
import { useEffect } from "react";
import EjercicioSvc from "../../../core/services/ejercicio.service";
import "./videographic.css";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

const VideographicComponent: React.FC = () => {
  let [htmlWorld, setHtmlWorld] = React.useState<any>();

  useEffect(() => {
    console.log("PASE");
    window.addEventListener("contextmenu", function(e) {
      e.preventDefault();
    });
    document.getElementById("svgLocation")!.onmousedown = function(e: any) {
      e.preventDefault();
      e.stopPropagation();
      if (e && (e.which === 2 || e.button === 4)) {
        console.log("middleClick");
      }
      console.log(e.target!.getAttribute("tipoelemento"));
    };

    Promise.all([
      EjercicioSvc().getXMLMundo({}),
      EjercicioSvc().getSVGMundo({
        arg0: {
          CP: true,
          nombreFichero: "EST08C.svg"
        }
      }),
      EjercicioSvc().getLibMundo(true)
    ]).then((result: any) => {
        if(result[1] == null || result[2] == null) return;
        console.log(result[2]);
      let ssvg = document.createRange().createContextualFragment(result[1]);
      ssvg.firstElementChild!.insertAdjacentHTML("afterbegin", result[2]);
      setHtmlWorld(ssvg.firstElementChild!.outerHTML);
    });
  }, []);

  return (
    <div className="videographicWrapper">
      <div className="videographic ">
        <div
          key="svgLocation"
          id="svgLocation"
          className="container--ph"
          dangerouslySetInnerHTML={{ __html: htmlWorld }}
        />
        {!htmlWorld && (
          <div>
            <Spinner
              size={SpinnerSize.large}
              label="Cargando mundo virtual..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideographicComponent;
