import db from "../../mongo/db.js";  // Your SQL database connection module

class SessionPortRepository {
    async getSessionById(userId, sessionId) {
        const query = `
            SELECT * FROM session_ports
            WHERE id = $1 AND user_id = $2
        `;
        const values = [sessionId, userId];
        const res = await db.query(query, values);
        return res.rows[0]; // assuming each session has a unique ID
    }

    async addSession(userId, session) {
        const query = `
            INSERT INTO session_ports (user_id, start_time, end_time)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const values = [userId, session.start_time, session.end_time];
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async updateSession(userId, sessionId, session) {
        const query = `
            UPDATE session_ports
            SET start_time = $1, end_time = $2
            WHERE id = $3 AND user_id = $4
            RETURNING *
        `;
        const values = [session.start_time, session.end_time, sessionId, userId];
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async deleteSession(userId, sessionId) {
        const query = `
            DELETE FROM session_ports
            WHERE id = $1 AND user_id = $2
        `;
        const values = [sessionId, userId];
        const res = await db.query(query, values);
        return res.rowCount; // Number of rows deleted
    }
}

export default SessionPortRepository;
