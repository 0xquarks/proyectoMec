import { createSparePartDB, deleteSparePartDB, getSparePartsDB, getSparePartsTypesDB, getSparePartsWithTypeDB} from '../services/database/spareParts.js';

const PartsType = {
    1: 'ACEITES',
    2: 'FILTROS',
    3: 'ELECTRONICOS',
    4: 'FRENOS',
};

export const getSparePartsTypes = async (req, res) => {
	try {
		const rows = await getSparePartsTypesDB();

		return res.status(200).json(rows);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		});
	}
}

export const delSparePart = async (req, res) => {
	try {
		const result = await deleteSparePartDB(req.params.id);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Spare Part not found'
			});
		}

		return res.status(200).json({
			success: true
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		});
	}
}

export const updateSparePart = async (req, res) => {
	try {
		console.log(req.body);	
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		});
	}
}

export const createSparePart = async (req, res) => {
	try {
		const imagePath = 'images/spare-parts/' + req.file.filename;

		const sparePart = {
			name: req.body.name,
			type: req.body.type,
			image: imagePath,
			description: req.body.description,
			brand: req.body.brand
		}

		const result = await createSparePartDB(sparePart);

		return res.status(201).json({
			message: "Servicio creado",
			id: result.insertId 
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}

export const getSpareParts = async (req, res) => {
	try {
		const rows = await getSparePartsWithTypeDB();

		return res.json(rows);
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
