import { getAllServices } from '../database/database.js';

export function getServices(req, res) {
	const services = getAllServices();

	res.json(services);
} 
