import Pause from './pause.entities.js';

class PauseController {
  constructor(pauseService) {
    this.pauseService = pauseService;
  }

  addPauseToSession = async (req, res) => {
    const { userId, sessionId } = req.params;
    const { heure_debut, heure_fin } = req.body;
    this.pauseService.addPauseToSession(userId, sessionId, new Pause(heure_debut, heure_fin))
      .then(pause => res.status(201).send(pause.toJSON()))
      .catch(err => res.status(400).send(err.message));
  };

  updatePause = async (req, res) => {
    const { userId, sessionId, pauseId } = req.params;
    const { heure_debut, heure_fin } = req.body;
    this.pauseService.updatePause(userId, sessionId, pauseId, new Pause(heure_debut, heure_fin, pauseId))
      .then(pause => res.status(200).send(pause.toJSON()))
      .catch(err => res.status(404).send(err.message));
  };

  deletePause = async (req, res) => {
    const { userId, sessionId, pauseId } = req.params;
    this.pauseService.deletePause(userId, sessionId, pauseId)
      .then(() => res.status(204).send())
      .catch(err => res.status(404).send(err.message));
  };
}

export default PauseController;
