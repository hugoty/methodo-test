// sessionPort.module.js
import SessionPortController from './sessionPort.controller.js';
import SessionPortService from './sessionPort.service.js';
import SessionPortRouter from './sessionPort.router.js';
import SessionPortRepository from "./sessionPort.repository.js";


const sessionPortRepository = new SessionPortRepository();
const sessionPortService = new SessionPortService(sessionPortRepository);
const sessionPortController = new SessionPortController(sessionPortService);
const sessionPortRouter = new SessionPortRouter(sessionPortController);

export default {
  service: sessionPortService,
  controller: sessionPortController,
  router: sessionPortRouter.getRouter(),
  repository: sessionPortRepository
};
