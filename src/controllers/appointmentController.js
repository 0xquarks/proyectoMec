import { createAppointment } from "../database/database.js";

export function handleCreateAppointment(req, res) {
	if (!req.body.customerName || !req.body.licensePlate) {
		return res.status(400).json({
			success: false,
			message: "Missing required fields: customerName, licensePlate"
		});
	}

	try {
		const appointmentData = {
            customer_name: req.body.customerName,    
            phone:         req.body.phone, 
            email:         req.body.email,
            brand:         req.body.brand,
            model:         req.body.model,
            year:          parseInt(req.body.year),
            license_plate: req.body.licensePlate.toUpperCase(),
            mileage:       parseInt(req.body.mileage),
            service_id:    parseInt(req.body.service_type_id),
            comment:       req.body.coment || null
        };

		const result = createAppointment(appointmentData);
	
		return res.status(201).json({
			sucess: true,
			id: result.lastInsertRowid
		});
	} catch (err) {
		console.log("Error creating appointmet: " + err.message);
		return res.status(500).json({
			error: "Erro creating appointmen"
		});
	}
}
