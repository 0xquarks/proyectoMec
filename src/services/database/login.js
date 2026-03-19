import { pool } from '../../db.js';

export const getUsers = async () => {
	const [rows] = await pool.query(
		`SELECT * FROM users WHERE status='A'`,
	);

	return rows;
};
