import TickServiceWorker from "../services/tick.service.worker"
import ContextServiceWorker from "./context.service.worker"

export const TickService = new TickServiceWorker();
export const ContextService = new ContextServiceWorker();

ContextService.port.start();
