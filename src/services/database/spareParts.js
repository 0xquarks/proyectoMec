import { pool } from '../../db.js';

export const createSparePartTypeDB = async (type_name) => {
	const [result] = await pool.query(
		'INSERT INTO spare_parts_type (name) VALUES (?)', [type_name]
	);

	return result;
}

export const getSparePartsTypesDB = async () => {
	const [rows] = await pool.query(
		`SELECT * FROM spare_parts_types s WHERE s.status='A' ORDER BY s.id`
	);

	return rows;
}

export const getSparePartTypeDB = async (id) => {
	const [row] = await pool.query(
		`SELECT * FROM spare_parts_types s WHERE s.status='A' AND s.id=?`,
		[id]
	)

	return row;
}

export const createSparePartDB = async (sparePart) => {
	const [result] = await pool.query(`
		INSERT INTO spare_parts
		(type_id,name,image,description,brand_name)
		VALUES
		(?, ?, ?, ?, ?);
	`, [sparePart.type, sparePart.name, sparePart.image, sparePart.description, sparePart.brand]);

	return result;
}

export const getSparePartsDB = async () => {
	const [rows] = await pool.query(`
		SELECT 
			p.id,
			p.type_id,
			p.name,
			p.description,
			p.brand_name,
			p.image
		FROM spare_parts p 
		WHERE p.status='A'
		ORDER BY p.id;
	`);

	return rows;
}

export const getSparePartsWithTypeDB = async () => {
	const [rows] = await pool.query(`
		SELECT 
			p.id,
			p.name,
			p.description,
			p.brand_name,
			t.name AS type
		FROM spare_parts p 
		JOIN spare_parts_types t ON p.type_id = t.id
		WHERE p.status='A'
		ORDER BY p.id;	
	`);

	return rows;
}

export const updateSparePartDB = async (data) => {
	const [result] = await pool.query('UPDATE spare_parts SET name', []);

	return result;
}

export const deleteSparePartDB = async (id) => {
	const [result] = await pool.query("UPDATE spare_parts SET status = 'X' WHERE id = ?", id);

	return result;
}
