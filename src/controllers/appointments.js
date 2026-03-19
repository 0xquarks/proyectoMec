import crypto from 'node:crypto';

import { pool } from '../db.js';
import { getServiceByIdDB } from '../services/database/services.js';
import { sendMail } from '../services/mail/mailer.js';
import { createAppointmentDB, getAppointmentByTokenDB, getAppointmentsDB, updateAppointmentStatus } from '../services/database/appointments.js';

export const createAppointment = async (req, res) => {
	try {
		if (!req.body.customerName || !req.body.licensePlate) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields: customer name and license plate"
			});
		}
	
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
	        comment:       req.body.comment || null
	    };
	
		const token = crypto.randomBytes(32).toString('hex');

		const result = createAppointmentDB(appointmentData);
			
		console.log(result);
		console.log(result.insertId);

		const appointmentId = result.insertId;
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
			id: appointmentId
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
		const token = req.query.token;

		const rows =getAppointmentByTokenDB(token);

		if (rows.length === 0) {
			return res.status(400).send("Invalid or already used token");
		}

		const appointmentId = rows[0].id;

		const resUpdate = updateAppointmentStatus(appointmentId, 'A');

		const appointment = rows[0];
		const service = await getServiceByIdDB(appointment.service_id);

		await sendMail({
			from: '"Taller Mecanico" <taller@example.com>',
			to: appointment.email,
			subject: `Tu cita para ${service.name} ha sido aceptada.`,
			text: `Hola ${appointment.customer_name}, tu cita ha sido aceptada.`,
			html: `
				<h3>Tu cita ha sido aceptada</h3>
				<p>Servicio: ${service.name}</p>
		        <p>Cliente: ${appointment.customer_name}</p>
				<p>Comentarios: ${appointment.comment ?? "Sin comentarios"}</p>
		        <p>¡Gracias por confiar en nosotros!</p>
			`
		});

		res.redirect("/?appointment=accepted");
	} catch (err) {
		return res.status(500).json({
			message: "Server error"
		})
	}
}

export const rejectAppointment = async (req, res) => {
	try {
		const token = req.query.token;

		const rows = await getAppointmentByTokenDB(token);

		

		if (rows.length === 0) {
			return res.status(400).send("Invalid or already used token");
		}

		const appointmentId = rows[0].id;

		const resUpdate = await updateAppointmentStatus(appointmentId, 'R');
		
		const appointment = rows[0];
		const service = await getServiceByIdDB(appointment.service_id);

		await sendMail({
		    from: '"Taller Mecánico" <taller@example.com>',
 			to: appointment.email,
 			subject: `Tu cita para ${service.name} ha sido rechazada`,
 			text: `Hola ${appointment.customer_name}, tu cita ha sido rechazada por el taller.`,
 			html: `
				<h3>Cita Rechazada</h3>
 			    <p>Servicio: ${service.name}</p>
 			    <p>Cliente: ${appointment.customer_name}</p>
 			    <p>Comentarios: ${appointment.comment ?? "Sin comentarios"}</p>
 			    <p>Lo sentimos, el taller ha decidido rechazar la cita.</p>
 			`
		});
		res.redirect("/?appointment=rejected");
	} catch (err) {
		return res.status(500).json({
			message: "Server error"
		})
	}
}

export const getAppointments = async (req, res) => {
	try {
		const rows = await getAppointmentsDB(); 
		res.json(rows);
	} catch (err) {
		console.error(err);
		return res.status(404).json({
			message: 'Something goes wrong'
		});
	}
}
