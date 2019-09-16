import {sessionContext} from "./sessionContext.service";
import {worldContext} from "./worldContext.service";

export interface MetaappContext {
    session?: sessionContext,
    world?: worldContext
}

