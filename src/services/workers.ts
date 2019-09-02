import LoginServiceWorker from "./login.service.worker"
import TickServiceWorker from "./tick.service.worker"
import SubSystemServiceWorker from "./ss.service.worker"

export const LoginService = new LoginServiceWorker();
export const TickService = new TickServiceWorker();
export const SubSystemService = new SubSystemServiceWorker();