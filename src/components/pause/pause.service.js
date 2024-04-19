class PauseService {
    constructor(pauseRepository) {
        this.pauseRepository = pauseRepository;
    }

    async addPause(userId, sessionId, pause) {
        return await this.pauseRepository.addPause(userId, sessionId, pause);
    }

    async getPauseById(userId, sessionId, pauseId) {
        const pause = await this.pauseRepository.getPauseById(userId, sessionId, pauseId);
        if (!pause) {
            throw new Error('Pause not found');
        }
        return pause;
    }

    async updatePause(userId, sessionId, pauseId, pause) {
        return await this.pauseRepository.updatePause(userId, sessionId, pauseId, pause);
    }

    async deletePause(userId, sessionId, pauseId) {
        const deletedCount = await this.pauseRepository.deletePause(userId, sessionId, pauseId);
        if (deletedCount === 0) {
            throw new Error('Pause not found or already deleted');
        }
        return { message: "Pause deleted successfully" };
    }
}

export default PauseService;
