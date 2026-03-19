import { deleteServiceDB, getServiceByIdDB, getServicesDB } from '../services/database/services.js'

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
