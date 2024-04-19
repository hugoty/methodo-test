class SessionPortService {
    constructor(sessionPortRepository) {
        this.sessionPortRepository = sessionPortRepository;
    }

    async addSession(userId, session) {
        return await this.sessionPortRepository.addSession(userId, session);
    }

    async getSessionById(userId, sessionId) {
        const session = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }

    async updateSession(userId, sessionId, session) {
        return await this.sessionPortRepository.updateSession(userId, sessionId, session);
    }

    async deleteSession(userId, sessionId) {
        const deletedCount = await this.sessionPortRepository.deleteSession(userId, sessionId);
        if (deletedCount === 0) {
            throw new Error('Session not found or already deleted');
        }
        return { message: "Session deleted successfully" };
    }
}

export default SessionPortService;
