import { getSparePartsDB, getSparePartsWithTypeDB} from '../services/database/spareParts.js';

const PartsType = {
    1: 'ACEITES',
    2: 'FILTROS',
    3: 'ELECTRONICOS',
    4: 'FRENOS',
};

export const createSparePart = async (req, res) => {
}

export const getSpareParts = async (req, res) => {
	try {
		const rows = await getSparePartsWithTypeDB();

		res.json(rows);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}


export const getSparePartsGrouped = async (req, res) => {
	try {
		const rows = await getSparePartsDB();

		if (rows.length === 0) {
			return res.json({});
		}

		const groupedParts = rows.reduce((acc, part) => {
			const categoryName = PartsType[part.type_id] || 'OTROS';

			if (!acc[categoryName]) {
				acc[categoryName] = []
			}

			acc[categoryName].push(part);

			return acc;
		},{});

		res.json(groupedParts);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}
