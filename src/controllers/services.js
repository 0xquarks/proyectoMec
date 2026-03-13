import { findServiceById } from '../services/services/services.js';

import { pool } from '../db.js';

export const getService = async (req, res) => {
	const service = await findServiceById(req.params.id);	
	if (!service) {
		return res.status(404).json({
			message: 'Service not found'	
		});
	}

	res.json(service);
}

export const getServices = async (req, res) => {
	try {
		const [rows] = await pool.query(`SELECT s.id, s.name, s.image FROM services s WHERE s.status = 'A' ORDER BY s.id;`)
		res.json(rows);
	} catch (err) {
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}

export const deleteService = async (req, res) => {
	const [result] = await pool.query(`UPDATE services SET status = 'D' WHERE id = ?;`, [req.params.id]);

	if (result.affectedRows <= 0) {
		return res.status(404).json({
			message: 'Service not found'
		})
	}

	res.sendStatus(204);
}

export const updateService = async (req, res) => {
	const {id} = req.params;

	const [result] = await pool.query('UPDATE services SET name = IFNULL(?, name), test = IFNULL(?,test) WHERE id = ?;', []);

	if (result.affectedRows === 0) {
		return res.status(404).json({
			message: 'Service not found'
		})
	}
}

export const createService = async (req, res) => {
	
}
