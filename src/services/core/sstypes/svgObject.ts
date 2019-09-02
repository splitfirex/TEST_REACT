export default class svgObject {
    protected id: string;
    protected attr: Map<string, any>;

    constructor(id: string) {
        this.id = id;
        this.attr = new Map();
        this.attr.set("id", id);
    }

    updateAttr(key: string, value: any) {
        this.attr.set(key, value);
    }

    draw() {

    }

}