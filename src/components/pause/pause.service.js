class PauseService {
    constructor(pauseRepository) {
        this.pauseRepository = pauseRepository;
    }

    async addPause(userId, sessionId, pause) {
        const session = await this.pauseRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const existingPause = await this.pauseRepository.getPauseBySessionId(sessionId);
        if (existingPause) {
            throw new Error('Session already has a pause');
        }
        return await this.pauseRepository.addPause(userId, sessionId, pause);
    }

    async getPauseById(userId, sessionId, pauseId) {
        const user = await this.pauseRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const session = await this.pauseRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const pause = await this.pauseRepository.getPauseById(userId, sessionId, pauseId);
        if (!pause) {
            throw new Error('Pause not found');
        }
        return pause;
    }

    async updatePause(userId, sessionId, pauseId, pause) {
        const user = await this.pauseRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const session = await this.pauseRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const existingPause = await this.pauseRepository.getPauseById(userId, sessionId, pauseId);
        if (!existingPause) {
            throw new Error('Pause not found');
        }
        return await this.pauseRepository.updatePause(userId, sessionId, pauseId, pause);
    }

    async deletePause(userId, sessionId, pauseId) {
        const user = await this.pauseRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const session = await this.pauseRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        const existingPause = await this.pauseRepository.getPauseById(userId, sessionId, pauseId);
        if (!existingPause) {
            throw new Error('Pause not found');
        }
        const deletedCount = await this.pauseRepository.deletePause(userId, sessionId, pauseId);
        if (deletedCount === 0) {
            throw new Error('Pause not found or already deleted');
        }
        return { message: "Pause deleted successfully" };
    }
}

export default PauseService;
