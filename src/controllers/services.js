import { createServiceDB, deleteServiceDB, getServiceByIdDB, getServicesDB, updateServiceDB } from '../services/database/services.js'

export const updateService = async (req, res) => {
	try {
		const name = req.body.name;

		const result = await updateServiceDB({
			name: name,
			id: req.params.id
		});
			
		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Service not found'
			})
		}

		return res.status(204).json({
			success: true
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		});
	}
}

export const createService = async (req, res) => {
	try {
		const { name } = req.body;
		const imagePath = 'images/services/' + req.file.filename;
	
		const service = {
			name: name,
			image: imagePath	
		};

		const result = await createServiceDB(service);

		return res.status(201).json({
			message: "Servicio creado",
			id: result.insertId 
		});
	} catch (err) {
		console.log(err);

		if (err.code === "ER_DUP_ENTRY") {
			return res.status(409).json({
				message: "Servicio ya existe"
			});
		}

		return res.status(500).json({
			message: 'Something goes wrong'
		});
	}
}

export const getServices = async (req, res) => {
	try {
		const services = await getServicesDB();
	
		if (services.length === 0) {
			return res.status(200).json({});
		}

		return res.json(services);
	} catch(err) {
		return res.status(500).json({
			error: 'Something goes wrong'
		})
	}
}

export const delService = async (req, res) => {
	try {
		const result = await deleteServiceDB(req.params.id);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Service not found'
			})
		}

		res.status(200).json({ success: true })
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}

export const getService = async (req, res) => {
	try {
		const id = req.params.id;
		const service = await getServiceByIdDB(id);
		return res.json(service)
	} catch(err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}
