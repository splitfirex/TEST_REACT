export default class svgObject {
    protected id: string;
    protected attr: Map<string, any>;
    protected currentSVG : any;

    constructor(id: string, currentSVG : any) {
        this.id = id;
        this.attr = new Map();
        this.currentSVG = currentSVG;
        this.attr.set("id", id);
    }

    updateAttr(key: string, value: any) {
        this.attr.set(key, value);
    }

    draw() {

    }

}