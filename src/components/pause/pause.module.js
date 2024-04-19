// pause.module.js
import PauseController from './pause.controller.js';
import PauseService from './pause.service.js';
import PauseRouter from './pause.router.js';
import PauseRepository from "./pause.repository.js";

const pauseRepository = new PauseRepository();
const pauseService = new PauseService(pauseRepository);
const pauseController = new PauseController(pauseService);
const pauseRouter = new PauseRouter(pauseController);

export default {
  service: pauseService,
  controller: pauseController,
  router: pauseRouter.getRouter(),
  repository: pauseRepository
};
