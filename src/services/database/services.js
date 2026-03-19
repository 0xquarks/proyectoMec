import { pool } from '../../db.js';

export const getServiceByIdDB = async (id) => {
	const [rows] = await pool.query(
		`SELECT * FROM services WHERE id = ? AND status='A'`,
		[id]
	);

	return rows[0];
};

export const createServiceDB = async (service) => {
	const [result] = await pool.query(`
		INSERT INTO services
		(name,image)
		VALUES
		(?, ?);
	`, [service.name, service.image]);

	return result;
}

export const getServicesDB = async () => {
	const [rows] = await pool.query(`
		SELECT * FROM services s
		WHERE s.status = 'A'
		ORDER BY s.id;
	`);

	return rows;
}

export const updateServiceDB = async (service) => {
	const [result] = await pool.query(`
		UPDATE services SET name = COALESCE(?, name), image = COALESCE(?, image) WHERE id = ?`,
		[service.name ?? null, service.image ?? null, service.id]
	);

	return result;
}

export const deleteServiceDB = async (id) => {
	const [result] = await pool.query("UPDATE services SET status = 'D' WHERE id = ?", [id]);

	return result;
}
