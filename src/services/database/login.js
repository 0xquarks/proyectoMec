import { pool } from '../../db.js';

export const getUsers = async () => {
	const [rows] = await pool.query(
		`SELECT * FROM users WHERE status='A'`,
	);

	return rows;
};

export const getUserById = async (id) => {
	const [rows] = await pool.query(
		"SELECT id, username, is_admin FROM users WHERE id = ?",
		[id]
	);

	return rows[0];
};
