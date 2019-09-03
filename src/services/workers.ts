import LoginServiceWorker from "./login.service.worker"
import EjercicioServiceWorker from "./ejercicio.service.worker"
import TickServiceWorker from "./tick.service.worker"
import SubSystemServiceWorker from "./ss.service.worker"

export const EjercicioService = new EjercicioServiceWorker();
export const LoginService = new LoginServiceWorker();
export const TickService = new TickServiceWorker();
export const SubSystemService = new SubSystemServiceWorker();

SubSystemService.port.postMessage({
    method: "addService",
    payload: {service: "EjercicioService"}
}, [EjercicioService.port]);
