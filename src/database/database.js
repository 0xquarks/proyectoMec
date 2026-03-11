import path from 'path';
import Database from 'better-sqlite3';

import * as config from '../config.js';

const db = new Database(path.join(config.ROOT_DIR, 'database', config.DB_NAME));

const insertAppointment = db.prepare(`
    INSERT INTO appointments (
        customer_name, phone, email, brand, model, 
        year, license_plate, mileage, service_id, comment
    ) VALUES (
        @customer_name, @phone, @email, @brand, @model, 
        @year, @license_plate, @mileage, @service_id, @comment
    )
`);

export async function createAppointment(data) {
	console.log(data);
	return insertAppointment.run(data);
}

export function getAllSpareParts() {
	const stmt = db.prepare(`
		SELECT
			p.type_id,
			p.name,
			p.description,
			p.brand_name,
			p.image
		FROM spare_parts p
		WHERE p.status = 'A'
		ORDER BY p.name;
	`);

	return stmt.all();
}

export function getAllServices() {
	const stmt = db.prepare(`	
		SELECT
			s.id,
			s.name,
			s.image
		FROM services s
		WHERE s.status = 'A'
		ORDER BY s.id;
	`);

	return stmt.all();
}
