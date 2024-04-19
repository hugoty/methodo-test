class SessionPortService {
    constructor(sessionPortRepository) {
        this.sessionPortRepository = sessionPortRepository;
    }

    async addSession(userId, session) {
        // Récupérer toutes les sessions des dernières 24 heures pour cet utilisateur
        const sessions = await this.sessionPortRepository.getSessionById(userId);

        // Calculer l'heure de fin en tenant compte des sessions précédentes
        session.endTime = await this.calculateEndPortTime(session.startTime, sessions);

        // Enregistrer la nouvelle session
        return await this.sessionPortRepository.addSession(userId, session);
    }

    async calculateEndPortTime(startTime, sessions) {
        const totalDuration = 15 * 60 * 60 * 1000; // 15 heures en millisecondes
        let accumulatedTime = 0;

        // Accumuler la durée totale des sessions précédentes
        for (const s of sessions) {
            accumulatedTime += s.endTime - s.startTime;
        }

        // Calculer la durée restante pour atteindre 15 heures
        let remainingTime = totalDuration - accumulatedTime;
        if (remainingTime < 0) {
            throw new Error('Total port duration in last 24 hours exceeds 15 hours');
        }

        // L'heure de fin est le début de la session actuelle plus le temps restant
        return new Date(startTime.getTime() + remainingTime);
    }

    async getSessionById(userId, sessionId) {
        const session = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }
        return session;
    }

    async endSession(userId, sessionId) {
        // Récupérer la session par son ID
        const session = await this.sessionPortRepository.getSessionById(userId, sessionId);
        if (!session) {
            throw new Error('Session not found');
        }

        // Vérifier si l'heure de fin est déjà définie
        if (session.endTime && session.endTime <= new Date()) {
            throw new Error('Session already ended');
        }

        // Mettre à jour l'heure de fin à l'heure actuelle
        session.endTime = new Date();

        // Enregistrer la session mise à jour
        return await this.sessionPortRepository.updateSession(userId, sessionId, session);
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
