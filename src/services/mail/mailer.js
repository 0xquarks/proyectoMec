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
