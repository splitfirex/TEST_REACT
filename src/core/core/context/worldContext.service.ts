import {MetaappContext} from "./MetaappContext";

export interface worldContext {
    context: any
    svgs: [any]
    lib: string
}

export const C_WORLD = "C_WORLD";
export default function process(notify: Function, data: any, context: MetaappContext) {
    if (data.context != C_WORLD) return;
}