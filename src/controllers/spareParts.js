import {pool} from '../db.js';

const PartsType = {
    1: 'ACEITES',
    2: 'FILTROS',
    3: 'ELECTRONICOS',
    4: 'FRENOS',
};

export const getSpareParts = async (req, res) => {
	const [rows] = await pool.query(`
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

	const groupedParts = rows.reduce((acc, part) => {
		const categoryName = PartsType[part.type_id] || 'OTROS';

		if (!acc[categoryName]) {
			acc[categoryName] = []
		}

		acc[categoryName].push(part);

		return acc;
	}, {});

	res.json(groupedParts);
}
