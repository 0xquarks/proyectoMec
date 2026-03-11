import { getAllSpareParts } from '../database/database.js';

const PartsType = {
    1: 'ACEITES',
    2: 'FILTROS',
    3: 'ELECTRONICOS',
    4: 'FRENOS',
};

export function getSpareParts(req, res) {
	const parts = getAllSpareParts();

	const groupedParts = parts.reduce((acc, part) => {
		const categoryName = PartsType[part.type_id] || 'OTROS';

		if (!acc[categoryName]) {
			acc[categoryName] = [];
		}

		acc[categoryName].push(part);

		return acc;
	}, {});

	res.json(groupedParts);
}
