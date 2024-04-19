class SessionPortService {
    constructor(sessionPortRepository) {
        this.sessionPortRepository = sessionPortRepository;
    }

    async addSession(userId, session) {
        const user = await this.sessionPortRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const existingSession = await this.sessionPortRepository.getSessionByUserId(userId);
        if (existingSession) {
            throw new Error('User already has a session');
        }
        return await this.sessionPortRepository.addSession(userId, session);
    }

    async getSessionById(userId, sessionId) {
        const user = await this.sessionPortRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const session = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }

    async updateSession(userId, sessionId, session) {
        const user = await this.sessionPortRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const existingSession = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!existingSession) {
            throw new Error('Session not found');
        }
        return await this.sessionPortRepository.updateSession(userId, sessionId, session);
    }

    async deleteSession(userId, sessionId) {
        const user = await this.sessionPortRepository.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const existingSession = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!existingSession) {
            throw new Error('Session not found');
        }
        const deletedCount = await this.sessionPortRepository.deleteSession(userId, sessionId);
        if (deletedCount === 0) {
            throw new Error('Session not found or already deleted');
        }
        return { message: "Session deleted successfully" };
    }
}

export default SessionPortService;
