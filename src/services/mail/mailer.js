import nodemailer from 'nodemailer';

import {
	MAIL_HOST,
	MAIL_PORT
} from '../../config.js';

let transporter = null;

export const initMailServer = async () => {
	transporter = nodemailer.createTransport({
		pool: true,
		host: MAIL_HOST,
		port: MAIL_PORT,
		secure: false 
	});

	try {
		await transporter.verify();
		console.log("Mail server ready");
	} catch (err) {
		console.warn("Mail disabled:", err.message);
		transporter = null;
	}
};

export const sendMail = async (options) => {
	if (!transporter) {
		console.warn("Skiping email: mail server unavailable");
		return;
	}

	try {
		return await transporter.sendMail(options);
	} catch (err) {
		console.log(err);
	}
}

export const sendAppointmentEmail = async ({ appointment, service, status }) => {
	const isAccepted = status === "accepted";

	const subject = isAccepted
		? `Tu cita para ${service.name} ha sido aceptada`
		: `Tu cita para ${service.name} ha sido rechazada`;

	const text = isAccepted
		? `Hola ${appointment.customer_name}, tu cita ha sido aceptada.`
		: `Hola ${appointment.customer_name}, tu cita ha sido rechazada por el taller.`;

	const html = isAccepted
		? `
			<h3>Tu cita ha sido aceptada</h3>
			<p>Servicio: ${service.name}</p>
			<p>Cliente: ${appointment.customer_name}</p>
			<p>Comentarios: ${appointment.comment ?? "Sin comentarios"}</p>
			<p>¡Gracias por confiar en nosotros!</p>
		  `
		: `
			<h3>Cita Rechazada</h3>
			<p>Servicio: ${service.name}</p>
			<p>Cliente: ${appointment.customer_name}</p>
			<p>Comentarios: ${appointment.comment ?? "Sin comentarios"}</p>
			<p>Lo sentimos, el taller ha decidido rechazar la cita.</p>
		  `;

	await sendMail({
		from: '"Taller Mecánico" <taller@example.com>',
		to: appointment.email,
		subject,
		text,
		html
	});
}
