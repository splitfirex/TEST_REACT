import {ISessionContext} from "./session.context";
import {worldContext} from "./world.context.service";

export interface MetaappContext {
    session?: ISessionContext,
    world?: worldContext
}

