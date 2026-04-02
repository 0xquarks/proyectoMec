import crypto from 'node:crypto';

import { getServiceByIdDB } from '../services/database/services.js';
import { sendMail, sendAppointmentEmail } from '../services/mail/mailer.js';
import { createAppointmentDB, deleteAppointmentDB, getAppointmentByTokenDB, getAppointmentsDB, getAppointmentStatus, updateAppointmentStatus } from '../services/database/appointments.js';
import { throws } from 'node:assert';
import { allowedNodeEnvironmentFlags, send } from 'node:process';

export const createAppointment = async (req, res) => {
	try {
		if (!req.body.customerName || !req.body.licensePlate) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields: customer name and license plate"
			});
		}
	
		const token = crypto.randomBytes(32).toString('hex');
		
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
	        comment:       req.body.comment || null,
			token: token
	    };

		const result = await createAppointmentDB(appointmentData);
			
		const service = await getServiceByIdDB(appointmentData.service_id); 

		const options = {
			from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
			to:	'taller@test.com', 
			subject: "Solicitud de cita para el servicio: " + service.name, 
			text: "Comentarios: " + appointmentData.comment, // Plain-text version of the message
			html: `
				<h3>Nueva solicitud de cita</h3>
			
				<p>Servicio: ${service.name}</p>
				<p>Cliente: ${appointmentData.customer_name}</p>
				<p>Comentarios: ${appointmentData.comment ?? "Sin comentarios"}</p>
			
				<br>
			
				<a href="http://localhost:4000/api/appointments/accept?token=${token}" style="background:#28a745;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
					Aceptar
				</a>
			
				&nbsp;
			
				<a href="http://localhost:4000/api/appointments/reject?token=${token}" style="background:#dc3545;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
					Rechazar
				</a>
			`
		};

		const info = await sendMail(options);

		console.log("Message sent: ", info.messageId);

		return res.status(201).json({
			sucess: true,
			message: 'Cita creada',
			token: token
		});

	} catch (err) {
		console.log("Error creating appointmet: " + err);
		return res.status(500).json({
			error: "Error creating appointmen"
		});
	}
}

export const acceptAppointment = async (req, res) => {
	try {
		await processAppointment({
			token: req.query.token,
			status: 'A'
		})

		res.redirect("/?appointment=accepted");
	} catch (err) {
		return res.status(500).json({
			message: "Server error"
		})
	}
}

export const rejectAppointment = async (req, res) => {
	try {
		await processAppointment({
			token: req.query.token,
			status: 'R'
		});

		res.redirect("/?appointment=rejected");
	} catch (err) {
		return res.status(500).json({
			message: "Server error"
		})
	}
}

export const processAppointment = async ({ token, status }) => {
	const rows = await getAppointmentByTokenDB(token);

	if (rows.length === 0) {
		throw new Error('TOKEN_INVALID_OR_USED');
	}

	const appointment = rows[0];

	if (appointment.appointment_status !== 'P') {
		throw new Errro('ALREADY_PROCESSED');
	}

	await updateAppointmentStatus(appointment.id, status);

	const service = await getServiceByIdDB(appointment.service_id);

	const statusText = status === 'A' ? 'accepted' : 'rejected';

	await sendAppointmentEmail({
		appointment,
		service,
		status
	})

	return statusText;
}

export const getAppointments = async (req, res) => {
	try {
		const rows = await getAppointmentsDB(); 
		return res.json(rows);
	} catch (err) {
		console.error(err);
		return res.status(404).json({
			message: 'Something goes wrong'
		});
	}
}

export const updateAppointmentStatusByToken = async (req, res) => {
    try {
        const { token, status } = req.body;

		const statusText = await processAppointment({ token, status });

        return res.json({ 
            success: true, 
            message: `Cita ${statusText} con éxito` 
        });
    } catch (err) {
		console.error(err);
        return res.status(500).json({ error: "Error al actualizar estado" });
    }
}

export const delAppointment = async (req, res) => {
	try {
		const result = await deleteAppointmentDB(req.params.id);

		if (result.affectedRows === 0) {
			return res.status(404).json({
				message: 'Appointment not found'
			});
		}

		return res.status(200).json({
			sucess: true
		})
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'Something goes wrong'
		})
	}
}
