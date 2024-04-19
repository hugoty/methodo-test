import { getDb } from "../../mongo/db.js";
class PauseRepository {

    async getPauseById(userId, sessionId, pauseId) {
        const query = `
            SELECT * FROM pauses
            WHERE id = $1 AND session_id = $2 AND user_id = $3
        `;
        const values = [pauseId, sessionId, userId];
        const res = await db.query(query, values);
        return res.rows[0]; // assuming each pause has a unique ID
    }

    async addPause(userId, sessionId, pause) {
        const query = `
            INSERT INTO pauses (user_id, session_id, start_time, end_time)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [userId, sessionId, pause.start_time, pause.end_time];
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async updatePause(userId, sessionId, pauseId, pause) {
        const query = `
            UPDATE pauses
            SET start_time = $1, end_time = $2
            WHERE id = $3 AND session_id = $4 AND user_id = $5
            RETURNING *
        `;
        const values = [pause.start_time, pause.end_time, pauseId, sessionId, userId];
        const res = await db.query(query, values);
        return res.rows[0];
    }

    async deletePause(userId, sessionId, pauseId) {
        const query = `
            DELETE FROM pauses
            WHERE id = $1 AND session_id = $2 AND user_id = $3
        `;
        const values = [pauseId, sessionId, userId];
        const res = await db.query(query, values);
        return res.rowCount; // Number of rows deleted
    }
}

export default PauseRepository;
