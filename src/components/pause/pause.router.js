import express from 'express';

class PauseRouter {
  constructor(pauseController) {
    this.pauseController = pauseController;
  }

  getRouter() {
    const router = express.Router({ mergeParams: true });  // Enable params merging for nested routes
    router.route('/:userId/sessions/:sessionId/pauses')
      .post(this.pauseController.addPauseToSession);

    router.route('/:userId/sessions/:sessionId/pauses/:pauseId')
      .put(this.pauseController.updatePause)
      .delete(this.pauseController.deletePause);

    return router;
  }
}

export default PauseRouter;
