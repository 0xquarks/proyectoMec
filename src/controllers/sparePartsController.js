import { getAllSpareParts } from '../database/database.js';

export function getSpareParts(req, res) {
	const parts = getAllSpareParts();

	res.json(parts);
}
