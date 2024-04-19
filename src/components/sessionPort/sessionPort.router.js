import express from 'express';

class SessionPortRouter {
  constructor(sessionPortController) {
    this.sessionPortController = sessionPortController;
  }

  getRouter() {
    const router = express.Router({ mergeParams: true });  // Enable params merging for nested routes
    router.route('/:userId/sessions')
      .post(this.sessionPortController.addSessionToUser)
      .get(this.sessionPortController.getSessionById);
    
    router.route('/:userId/sessions/:sessionId')
      .put(this.sessionPortController.updateSession)
      .delete(this.sessionPortController.deleteSession);
      router.post('/:userId/endSession/:sessionId', this.sessionPortController.endSession);
      
      return router;
  }
}

export default SessionPortRouter;
