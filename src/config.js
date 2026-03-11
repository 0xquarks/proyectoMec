import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const ROOT_DIR = path.resolve(__dirname, '');
export const PUBLIC_DIR = path.resolve(__dirname, 'public');
export const DB_NAME = 'mechanic_db.sqlite';

// config nodemailer with Gmail

export const SERVICE = "Gmail";
export const HOST = "smtp.gmail.com";
export const SECURE = true;
export const USER_AUTH = "";
export const PASS_AUTH = "";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// config transport (SMTP)

export function testMail() {
	const transporter = nodemailer.createTransport({
		//service: "Gmail",
		host: "localhost",
		port: 1025,
		secure: false,
		auth: null
	})

	const msg = `Sender's Email: test, subject: test\n\n Mesage:\njoder hermano`;

	console.log("full", msg);

	const mailOptions = {
		from: "test@test.com",
		to: "rocio.rolfson75@ethereal.email",
		subject: "test",
		text: msg,
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.error("Error sending email: ", err);
		} else {
			console.log("Email sent: ", info.response);
		}
	});
}

