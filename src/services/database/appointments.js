import { pool } from "../../db.js";

export const createAppointmentDB = async (appointment) => {
	const [result] = await pool.query(
		`INSERT INTO appointments (
			customer_name,
			phone, 
			email, 
			brand, 
			model, 
			vehicle_year, 
			license_plate, 
			mileage, 
			service_id, 
			comment, 
			token
		) 
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
		[
			appointment.customer_name,
			appointment.phone,
			appointment.email,
			appointment.brand,
			appointment.model,
			appointment.year,
			appointment.license_plate,
			appointment.mileage,
			appointment.service_id,
			appointment.comment,
			appointment.token
		]
	);

	return result;
}

export const deleteAppointmentDB = async (id) => {
	const [result] = await pool.query(
		`UPDATE appointments SET status='X' WHERE id=?`,
		[id]
	);

	return result;
}

/*
	REJECTED -> R,
	ACCEPTED -> A,
	PENDING -> P
*/
export const updateAppointmentStatus = async (id, status) => {
	const [result] = await pool.query(
		"UPDATE appointments SET appointment_status = ?, token_used = 1 WHERE id = ? AND appointment_status = 'P'",
		[status, id]
	);

	return result;
}

export const getAppointmentStatus = async (id) => {
	const [rows] = await pool.query(
		`SELECT appointment_status 
		 FROM appointments 
		 WHERE id = ?`,
		[id]
	);

	return rows[0];
}

export const getAppointmentByTokenDB = async (token) => {
	const [rows] = await pool.query(
		'SELECT * FROM appointments WHERE token = ? AND token_used = 0',
		[token]
	);

	return rows;
}

export const getAppointmentsDB = async () => {
	const [rows] = await pool.query(`
		SELECT 
			a.id, 
			a.customer_name, 
			a.phone, 
			a.email,
			a.brand,
			a.model, 
			a.vehicle_year, 
			a.license_plate, 
			a.mileage, 
			s.name AS service, 
			a.comment,
			a.appointment_status,
			a.appointment_date,
a.token
		FROM appointments a 
		JOIN services s ON a.service_id = s.id
		WHERE a.status != 'X' 
		ORDER BY a.id;
	`);

	return rows;
}
