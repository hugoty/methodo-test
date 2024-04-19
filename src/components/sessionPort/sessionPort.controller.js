import SessionPort from './sessionPort.entities.js';

class SessionPortController {
  constructor(sessionPortService) {
    this.sessionPortService = sessionPortService;
  }

  addSessionToUser = async (req, res) => {
    const { userId } = req.params;
    const { heure_debut, heure_fin } = req.body;
    this.sessionPortService.addSessionToUser(userId, new SessionPort(heure_debut, heure_fin))
      .then(session => res.status(201).send(session.toJSON()))
      .catch(err => res.status(400).send(err.message));
  };

  updateSession = async (req, res) => {
    const { userId, sessionId } = req.params;
    const { heure_debut, heure_fin } = req.body;
    this.sessionPortService.updateSession(userId, sessionId, new SessionPort(heure_debut, heure_fin, [], sessionId))
      .then(session => res.status(200).send(session.toJSON()))
      .catch(err => res.status(404).send(err.message));
  };

  deleteSession = async (req, res) => {
    const { userId, sessionId } = req.params;
    this.sessionPortService.deleteSession(userId, sessionId)
      .then(() => res.status(204).send())
      .catch(err => res.status(404).send(err.message));
  };

  getSessionById = async (req, res) => {
    const { userId, sessionId } = req.params;
    this.sessionPortService.getSessionById(userId, sessionId)
      .then(session => res.status(200).send(session.toJSON()))
      .catch(err => res.status(404).send(err.message));
  };
}

export default SessionPortController;
