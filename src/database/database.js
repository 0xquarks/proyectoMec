import path from 'path';
import Database from 'better-sqlite3';

import * as config from '../config.js';

const db = new Database(path.join(config.ROOT_DIR, 'database', config.DB_NAME));

export function getAllSpareParts() {
	const stmt = db.prepare(`
		SELECT
			t.name AS type,
			p.name,
			p.description,
			p.brand,
			p.image
		FROM spareParts p
		JOIN sparePartsType t
		ON p.idType = t.idSparePartsType
		WHERE p.estado = 'A'
		ORDER BY t.name, p.name;
	`);

	return stmt.all();
}

export function getAllServices() {
	const stmt = db.prepare(`	
		SELECT 
			s.name,
			s.image
		FROM service s
		WHERE s.estado = 'A'
		ORDER BY s.name;
	`);

	return stmt.all();
}
