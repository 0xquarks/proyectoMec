import { pool } from '../../db.js';

export const findServiceById = async (id) => {
	const [rows] = await pool.query(
		`SELECT * FROM services WHERE id = ? AND status='A'`,
		[id]
	);

	return rows[0] || null;
};
