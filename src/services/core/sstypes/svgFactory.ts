import svgObject from "./svgObject";
import svgSeccion from "./svgSeccion";

export default class svgFactory {
    static getSVGObject(id: string, name: string): svgObject {
        switch (name) {
            case "Seccion":
                return new svgSeccion(id);
            default:
                return new svgObject(id);
        }
    }
}