import ExcersiceWorker from "./excercise.worker"
import MainWorker from "./main.worker"

export const ExcersiceSerive = new ExcersiceWorker();
export const MainService = new MainWorker();

ExcersiceSerive.port.start();
MainService.port.start();
